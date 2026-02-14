import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { checkAnswer, calculateTotalScore } from '@/utils/scoring-system'
import { getRandomQuestions, shuffleQuestions } from '@/utils/question-generator'
import { useQuestionStore } from './question.store'

// 生成唯一ID
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export const usePracticeStore = defineStore('practice', () => {
  // ============ 狀態 ============
  const currentSession = ref(null)
  const sessionHistory = ref([])
  const wrongQuestions = ref(new Map())
  const isLoading = ref(false)
  const error = ref(null)

  // ============ Getters ============
  const currentQuestion = computed(() => {
    if (!currentSession.value) return null
    const idx = currentSession.value.currentQuestionIndex
    return currentSession.value.questions[idx] || null
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
      const questionStore = useQuestionStore()
      
      // 確保題目已加載
      await questionStore.loadQuestions(subjectId)
      
      // 獲取隨機題目
      let questions = questionStore.getRandomQuestions(subjectId, questionCount, topicId)
      
      if (!questions || questions.length === 0) {
        throw new Error('題目數量不足')
      }

      // 打亂題目順序
      questions = shuffleQuestions(questions)

      // 創建會話
      currentSession.value = {
        id: generateSessionId(),
        subjectId,
        mode,
        topicId,
        questions,
        currentQuestionIndex: 0,
        userAnswers: new Map(),
        startTime: new Date().toISOString(),
        completed: false
      }

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

    const question = currentSession.value.questions.find(q => q.id === questionId)
    if (!question) {
      throw new Error('題目不存在')
    }

    // 檢查答案
    const result = checkAnswer(question, userAnswer)

    // 記錄用戶答案
    currentSession.value.userAnswers.set(questionId, {
      userAnswer,
      result
    })

    // 如果錯誤，記錄到錯題本
    if (!result.isCorrect) {
      const existing = wrongQuestions.value.get(questionId) || { count: 0, lastWrong: null }
      wrongQuestions.value.set(questionId, {
        count: existing.count + 1,
        lastWrong: new Date().toISOString(),
        question
      })
      
      // 保存到本地存儲
      saveWrongQuestions()
    }

    return result
  }

  /**
   * 下一題
   */
  function nextQuestion() {
    if (!hasNextQuestion.value) return false
    currentSession.value.currentQuestionIndex++
    return true
  }

  /**
   * 上一題
   */
  function previousQuestion() {
    if (currentSession.value.currentQuestionIndex <= 0) return false
    currentSession.value.currentQuestionIndex--
    return true
  }

  /**
   * 跳轉到指定題目
   */
  function goToQuestion(index) {
    if (index < 0 || index >= currentSession.value.questions.length) return false
    currentSession.value.currentQuestionIndex = index
    return true
  }

  /**
   * 結束練習會話
   */
  async function endPracticeSession() {
    if (!currentSession.value) {
      throw new Error('沒有進行中的練習會話')
    }

    // 計算結果
    const results = []
    currentSession.value.userAnswers.forEach((answerData, questionId) => {
      results.push(answerData.result)
    })

    // 處理未回答的題目（視為錯誤）
    const answeredCount = results.length
    const totalQuestions = currentSession.value.questions.length
    for (let i = answeredCount; i < totalQuestions; i++) {
      results.push({ isCorrect: false, score: 0 })
    }

    const totalScore = calculateTotalScore(results)

    // 構建最終結果
    const finalResult = {
      sessionId: currentSession.value.id,
      subjectId: currentSession.value.subjectId,
      mode: currentSession.value.mode,
      totalQuestions,
      correctAnswers: totalScore.correctAnswers,
      score: totalScore.score,
      wrongAnswers: totalScore.wrongAnswers,
      timeSpent: new Date() - new Date(currentSession.value.startTime),
      wrongQuestionIds: Array.from(wrongQuestions.value.keys()).slice(-totalScore.wrongAnswers),
      completedAt: new Date().toISOString()
    }

    // 保存到歷史記錄
    sessionHistory.value.unshift(finalResult)
    saveSessionHistory()

    // 清理當前會話
    currentSession.value.completed = true
    currentSession.value = null

    return finalResult
  }

  /**
   * 獲取錯題列表
   */
  function getWrongQuestions(subjectId = null, limit = 20) {
    const questions = []
    wrongQuestions.value.forEach((data, questionId) => {
      if (!subjectId || data.question.subjectId === subjectId) {
        questions.push({
          id: questionId,
          ...data
        })
      }
    })
    
    // 按錯誤次數排序
    questions.sort((a, b) => b.count - a.count)
    
    return questions.slice(0, limit)
  }

  /**
   * 標記錯題為已掌握
   */
  function markQuestionMastered(questionId) {
    wrongQuestions.value.delete(questionId)
    saveWrongQuestions()
  }

  /**
   * 清除所有錯題
   */
  function clearWrongQuestions() {
    wrongQuestions.value.clear()
    saveWrongQuestions()
  }

  /**
   * 獲取練習歷史
   */
  function getPracticeHistory(subjectId = null, limit = 10) {
    let history = sessionHistory.value
    if (subjectId) {
      history = history.filter(h => h.subjectId === subjectId)
    }
    return history.slice(0, limit)
  }

  // ============ 本地存儲 ============
  
  function saveSessionHistory() {
    try {
      const data = sessionHistory.value.map(h => ({
        ...h,
        userAnswers: undefined,
        questions: undefined
      }))
      localStorage.setItem('practice_history', JSON.stringify(data))
    } catch (e) {
      console.error('保存練習歷史失敗:', e)
    }
  }

  function loadSessionHistory() {
    try {
      const data = localStorage.getItem('practice_history')
      if (data) {
        sessionHistory.value = JSON.parse(data)
      }
    } catch (e) {
      console.error('載入練習歷史失敗:', e)
    }
  }

  function saveWrongQuestions() {
    try {
      const data = {}
      wrongQuestions.value.forEach((value, key) => {
        data[key] = {
          count: value.count,
          lastWrong: value.lastWrong,
          question: {
            id: value.question.id,
            subjectId: value.question.subjectId,
            topicId: value.question.topicId,
            type: value.question.type,
            question: value.question.question,
            options: value.question.options,
            answer: value.question.answer,
            explanation: value.question.explanation,
            difficulty: value.question.difficulty
          }
        }
      })
      localStorage.setItem('wrong_questions', JSON.stringify(data))
    } catch (e) {
      console.error('保存錯題失敗:', e)
    }
  }

  function loadWrongQuestions() {
    try {
      const data = localStorage.getItem('wrong_questions')
      if (data) {
        const parsed = JSON.parse(data)
        wrongQuestions.value = new Map(Object.entries(parsed).map(([k, v]) => [Number(k), v]))
      }
    } catch (e) {
      console.error('載入錯題失敗:', e)
    }
  }

  // 初始化時載入數據
  function init() {
    loadSessionHistory()
    loadWrongQuestions()
  }

  // ============ 初始化 ============
  init()

  return {
    // 狀態
    currentSession,
    sessionHistory,
    wrongQuestions,
    isLoading,
    error,
    
    // Getters
    currentQuestion,
    progress,
    hasNextQuestion,
    
    // Actions
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
