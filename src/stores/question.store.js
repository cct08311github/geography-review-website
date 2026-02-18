import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllSubjects } from '@/data/subjects'
import { mockQuestionService } from '@/services/mock-question.service'

// 導入真實題庫數據
import { geographyQuizzes } from '@/data/quizzes'
import { expandedGeographyQuizzes } from '@/data/expanded-geography-quizzes'
import { capQuestions } from '@/data/cap' // 導入會考題庫

export const useQuestionStore = defineStore('question', () => {
  // ============ 狀態 ============
  const questionBank = ref(new Map())
  const subjectQuestions = ref({}) // Subject ID -> Array of Questions
  const isLoading = ref(false)
  const error = ref(null)

  // ============ Getters ============
  const getSubjectQuestionCount = computed(() => {
    return (subjectId) => {
      return subjectQuestions.value[subjectId]?.length || 0
    }
  })

  // ============ Actions ============
  
  /**
   * 加載科目題目 (Lazy Load)
   */
  async function loadQuestions(rawSubjectId) {
    const subjectId = Number(rawSubjectId)
    
    // 檢查快取：如果已經加載過該科目，直接返回
    if (subjectQuestions.value[subjectId] && subjectQuestions.value[subjectId].length > 0) {
      return subjectQuestions.value[subjectId]
    }

    isLoading.value = true
    error.value = null

    try {
      let questions = []

      // 根據科目加載對應題庫
      switch (subjectId) {
        case 1: // 國文
          questions = capQuestions.chinese || []
          break
        case 2: // 英語
          questions = capQuestions.english || []
          break
        case 3: // 數學
          questions = capQuestions.math || []
          break
        case 4: // 自然
          questions = capQuestions.science || []
          break
        case 5: // 社會 (地理/歷史/公民) - 混合真實會考題與既有題庫
          const geoQuestions = _loadGeographyQuestions()
          const capSocialQuestions = capQuestions.social || []
          questions = [...geoQuestions, ...capSocialQuestions]
          break
        default:
          questions = mockQuestionService.generateQuestions(subjectId, 'default')
      }

      // 確保每個題目有唯一ID (特別是 Mock Data)
      // 真實專案中 ID 應來自後端，這裡為了 Mock 方便重新生成
      // 注意：capQuestions 已經有固定 ID (112xxxx)，不要覆蓋它們
      questions = questions.map((q, idx) => ({
        ...q,
        id: q.id || Number(`${subjectId}${idx + 1}`) // 只有沒有 ID 的才生成
      }))

      // 存儲到內存
      // 為了效能，我們只在有人請求該科目時才放入 questionBank
      questions.forEach(q => {
        questionBank.value.set(q.id, q)
      })
      subjectQuestions.value[subjectId] = questions

      return questions
    } catch (e) {
      error.value = `加載題庫失敗: ${e.message}`
      console.error(error.value)
      throw e
    } finally {
      isLoading.value = false
    }
  }

  // 私有輔助函數：加載地理題庫
  function _loadGeographyQuestions() {
    const questions = []
    
    // 1. 處理 geographyQuizzes（包含嵌套的questions數組）
    geographyQuizzes.forEach(quiz => {
      if (quiz.questions && Array.isArray(quiz.questions)) {
        quiz.questions.forEach((q) => {
          questions.push({
            // Base properties
            subjectId: 5,
            topicId: quiz.topicId || 1,
            type: q.type || 'single',
            question: q.question,
            options: q.options || [],
            answer: q.correctAnswer !== undefined ? q.correctAnswer : (Array.isArray(q.correctAnswers) ? q.correctAnswers[0] : 0),
            explanation: q.explanation || '請參考相關教材',
            difficulty: quiz.difficulty || 'medium',
            tags: quiz.tags || []
          })
        })
      }
    })
    
    // 2. 處理 expandedGeographyQuizzes（已經是扁平結構）
    expandedGeographyQuizzes.forEach((q) => {
      questions.push({
        subjectId: 5,
        topicId: q.topicId || 1,
        type: q.type || 'single',
        question: q.question,
        options: q.options || [],
        answer: q.correctAnswer !== undefined ? q.correctAnswer : (Array.isArray(q.correctAnswers) ? q.correctAnswers[0] : 0),
        explanation: q.explanation || '請參考相關教材',
        difficulty: q.difficulty || 'medium',
        tags: q.tags || []
      })
    })

    return questions
  }

  /**
   * 獲取隨機題目
   */
  function getRandomQuestions(subjectId, count = 10, topicId = null) {
    let questions = subjectQuestions.value[subjectId] || []
    
    // 如果尚未加載，可能需要先調用 loadQuestions (但通常 UI 層會先調用)
    if (questions.length === 0) {
        console.warn(`[QuestionStore] Subject ${subjectId} not loaded yet. returning empty array.`)
        return []
    }

    // 按主題過濾
    if (topicId) {
      questions = questions.filter(q => q.topicId === topicId)
    }

    // 隨機選擇
    // 使用 Fisher-Yates 洗牌算法更佳，但這裡先用簡單 sort
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }

  /**
   * 根據ID獲取題目
   */
  function getQuestionById(questionId) {
    return questionBank.value.get(questionId)
  }

  /**
   * 根據難度獲取題目
   */
  function getQuestionsByDifficulty(subjectId, difficulty, count = 10) {
    const questions = (subjectQuestions.value[subjectId] || [])
      .filter(q => q.difficulty === difficulty)
    
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, Math.min(count, shuffled.length))
  }

  /**
   * 獲取科目所有題目
   */
  function getAllSubjectQuestions(subjectId) {
    return subjectQuestions.value[subjectId] || []
  }

  return {
    // 狀態
    questionBank,
    subjectQuestions,
    isLoading,
    error,
    
    // Getters
    getSubjectQuestionCount,
    
    // Actions
    loadQuestions,
    getRandomQuestions,
    getQuestionById,
    getQuestionsByDifficulty,
    getAllSubjectQuestions
  }
})
