import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { checkAnswer, calculateTotalScore } from '@/utils/scoring-system'
import { getRandomQuestions, shuffleQuestions } from '@/utils/question-generator'
import { useQuestionStore } from './question.store'

// Helper: Safe LocalStorage
const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (e) {
      console.warn(`[PracticeStore] Failed to load ${key}:`, e)
      return null
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        console.error('[PracticeStore] Storage full! Cannot save data.', e)
        // TODO: Implement cleanup strategy (e.g. remove oldest history)
        throw new Error('儲存空間已滿，您的進度可能無法保存。請清理瀏覽器快取。')
      }
      console.warn(`[PracticeStore] Failed to save ${key}:`, e)
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn(`[PracticeStore] Failed to remove ${key}:`, e)
    }
  }
}

// 生成唯一ID
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export const usePracticeStore = defineStore('practice', () => {
  const questionStore = useQuestionStore()

  // ============ 狀態 ============
  const currentSession = ref(null)
  const sessionHistory = ref([])
  const wrongQuestions = ref(new Map()) // Key: questionId, Value: { count, lastWrong, subjectId }
  const isLoading = ref(false)
  const error = ref(null)

  // ============ Getters ============
  
  // 動態還原題目物件 (Hydration)
  const hydratedCurrentQuestion = computed(() => {
    if (!currentSession.value) return null
    const qData = currentSession.value.questions[currentSession.value.currentQuestionIndex]
    // session questions 現在只存 { id, ...metadata }，或者如果是舊資料可能存了完整物件
    // 我們優先從 questionStore 抓最新資料
    const fullQuestion = questionStore.getQuestionById(qData.id) || qData
    return fullQuestion
  })

  const progress = computed(() => {
    if (!currentSession.value) return 0
    const total = currentSession.value.questions.length
    const current = currentSession.value.currentQuestionIndex
    return Math.round((current / total) * 100)
  })

  const hasNextQuestion = computed(() => {
    if (!currentSession.value) return false
    return currentSession.value.currentQuestionIndex < currentSession.value.questions.length - 1
  })

  // ============ Actions ============
  
  /**
   * 開始新的練習會話
   */
  async function startPracticeSession({ subjectId, mode, topicId = null, questionCount = 10 }) {
    isLoading.value = true
    error.value = null

    try {
      // 確保題目已加載
      await questionStore.loadQuestions(subjectId)
      
      // 獲取隨機題目
      let questions = questionStore.getRandomQuestions(subjectId, questionCount, topicId)
      
      if (!questions || questions.length === 0) {
        throw new Error('題目數量不足')
      }

      // 打亂題目順序
      questions = shuffleQuestions(questions)

      // 正規化：只存 ID 以節省空間，但為了前端方便，這裡暫時保留引用
      // 重點是儲存到 localStorage 時要 stripped down
      const sessionQuestions = questions.map(q => ({ id: q.id, subjectId: q.subjectId }))

      // 創建會話
      currentSession.value = {
        id: generateSessionId(),
        subjectId,
        mode,
        topicId,
        questions: sessionQuestions,
        currentQuestionIndex: 0,
        userAnswers: {}, // Map 不能直接 JSON.stringify，改用 Object
        startTime: new Date().toISOString(),
        completed: false
      }
      
      saveActiveSession()
      return currentSession.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 提交答案
   */
  async function submitAnswer(questionId, userAnswer) {
    if (!currentSession.value) {
      throw new Error('沒有進行中的練習會話')
    }

    // 考試模式下，我們只記錄答案，不評分
    if (currentSession.value.mode === 'exam') {
        // 更新用戶答案
        currentSession.value.userAnswers[questionId] = {
            userAnswer,
            result: null // 尚未評分
        }
        saveActiveSession()
        return { isCorrect: null } // 不回傳結果
    }

    // --- 以下為練習模式 (Practice Mode) ---

    // 從 Store 獲取完整題目資訊來檢查答案
    const question = questionStore.getQuestionById(questionId)
    if (!question) {
      throw new Error('題目不存在')
    }

    // 檢查答案
    const result = checkAnswer(question, userAnswer)

    // 記錄用戶答案
    currentSession.value.userAnswers[questionId] = {
      userAnswer,
      result
    }

    // 如果錯誤，記錄到錯題本 (正規化儲存)
    if (!result.isCorrect) {
      const existing = wrongQuestions.value.get(questionId) || { count: 0, lastWrong: null }
      wrongQuestions.value.set(questionId, {
        id: questionId,
        subjectId: question.subjectId,
        count: existing.count + 1,
        lastWrong: new Date().toISOString()
      })
      saveWrongQuestions()
    }
    
    saveActiveSession()
    return result
  }

  function nextQuestion() {
    if (!hasNextQuestion.value) return false
    currentSession.value.currentQuestionIndex++
    saveActiveSession()
    return true
  }

  function previousQuestion() {
    if (currentSession.value.currentQuestionIndex <= 0) return false
    currentSession.value.currentQuestionIndex--
    saveActiveSession()
    return true
  }

  function goToQuestion(index) {
    if (index < 0 || index >= currentSession.value.questions.length) return false
    currentSession.value.currentQuestionIndex = index
    saveActiveSession()
    return true
  }

  async function endPracticeSession() {
    if (!currentSession.value) return

    const isExamMode = currentSession.value.mode === 'exam'
    const results = []
    const userAnswers = currentSession.value.userAnswers
    
    // 如果是考試模式，現在才進行評分
    if (isExamMode) {
        // 遍歷所有題目進行評分
        currentSession.value.questions.forEach(qMeta => {
            const questionId = qMeta.id
            const answerData = userAnswers[questionId]
            
            // 獲取完整題目
            const fullQuestion = questionStore.getQuestionById(questionId)
            if (!fullQuestion) {
                // Should not happen if loaded correctly
                results.push({ isCorrect: false, score: 0 })
                return
            }

            let result
            if (answerData && answerData.userAnswer !== undefined && answerData.userAnswer !== null) {
                result = checkAnswer(fullQuestion, answerData.userAnswer)
                
                // 記錄錯題
                if (!result.isCorrect) {
                    const existing = wrongQuestions.value.get(questionId) || { count: 0, lastWrong: null }
                    wrongQuestions.value.set(questionId, {
                        id: questionId,
                        subjectId: fullQuestion.subjectId,
                        count: existing.count + 1,
                        lastWrong: new Date().toISOString()
                    })
                }
            } else {
                // 未作答
                result = { isCorrect: false, score: 0, unAnswered: true }
            }
            results.push(result)
        })
        
        // 考試模式下，一次性保存錯題
        saveWrongQuestions()
    } else {
        // 練習模式：直接收集已評分的結果
        Object.keys(userAnswers).forEach(qid => {
            results.push(userAnswers[qid].result)
        })
        // 處理練習模式未回答（邏輯保持不變）
        const answeredCount = results.length
        const totalQuestions = currentSession.value.questions.length
        for (let i = answeredCount; i < totalQuestions; i++) {
            results.push({ isCorrect: false, score: 0 })
        }
    }

    const totalScore = calculateTotalScore(results)
    
    const finalResult = {
      sessionId: currentSession.value.id,
      subjectId: currentSession.value.subjectId,
      mode: currentSession.value.mode,
      totalQuestions: currentSession.value.questions.length,
      correctAnswers: totalScore.correctAnswers,
      score: totalScore.score,
      wrongAnswers: totalScore.wrongAnswers,
      timeSpent: new Date() - new Date(currentSession.value.startTime),
      wrongQuestionIds: Array.from(wrongQuestions.value.keys()).slice(-totalScore.wrongAnswers), // 這裡只是示意，實際可能不準確
      completedAt: new Date().toISOString()
    }

    sessionHistory.value.unshift(finalResult)
    saveSessionHistory()

    // 清理
    currentSession.value = null
    storage.remove('active_session')

    return finalResult
  }

  /**
   * 獲取錯題列表 (Hydrated)
   */
  function getWrongQuestions(subjectId = null, limit = 20) {
    const questions = []
    
    // 確保題庫已加載 (如果尚未加載可能取不到資料，這是一個潛在的非同步問題)
    // 在UI層調用此方法前，應確保 loadQuestions 已執行
    
    wrongQuestions.value.forEach((data, questionId) => {
      if (!subjectId || data.subjectId === subjectId) {
        const fullQuestion = questionStore.getQuestionById(questionId)
        if (fullQuestion) {
             questions.push({
                ...fullQuestion,
                ...data // merge metadata (count, lastWrong)
             })
        }
      }
    })
    
    questions.sort((a, b) => b.count - a.count)
    return questions.slice(0, limit)
  }

  function markQuestionMastered(questionId) {
    wrongQuestions.value.delete(questionId)
    saveWrongQuestions()
  }

  function clearWrongQuestions() {
    wrongQuestions.value.clear()
    saveWrongQuestions()
  }
  
  function getPracticeHistory(subjectId = null, limit = 10) {
    let history = sessionHistory.value
    if (subjectId) {
      history = history.filter(h => h.subjectId === subjectId)
    }
    return history.slice(0, limit)
  }

  // ============ Persistence Logic ============
  
  function saveActiveSession() {
      if (currentSession.value) {
          storage.set('active_session', currentSession.value)
      }
  }

  function saveSessionHistory() {
      // 歷史記錄不需要存完整題目，只存統計
      storage.set('practice_history', sessionHistory.value)
  }

  function saveWrongQuestions() {
      // Map 轉 Object 儲存，且只存 metadata
      const data = {}
      wrongQuestions.value.forEach((val, key) => {
          data[key] = val
      })
      storage.set('wrong_questions', data)
  }

  // ============ Init ============
  function init() {
    // 1. Load History
    const history = storage.get('practice_history')
    if (history) sessionHistory.value = history

    // 2. Load Wrong Questions
    const wrong = storage.get('wrong_questions')
    if (wrong) {
        // Object -> Map
        wrongQuestions.value = new Map(Object.entries(wrong).map(([k, v]) => [Number(k), v]))
    }

    // 3. Restore Active Session
    const active = storage.get('active_session')
    if (active) {
        // 恢復時需要確認是否過期？暫時不檢查
        currentSession.value = active
    }
  }

  // 自動執行初始化
  init()

  return {
    currentSession,
    sessionHistory,
    wrongQuestions,
    isLoading,
    error,
    
    // Exposed Getters
    currentQuestion: hydratedCurrentQuestion, // Use the hydrated version
    progress,
    hasNextQuestion,
    
    startPracticeSession,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    endPracticeSession,
    getWrongQuestions,
    markQuestionMastered,
    clearWrongQuestions,
    getPracticeHistory
  }
})
