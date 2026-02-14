import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllSubjects, getSubjectById } from '@/data/subjects'

// 導入題庫數據
import { geographyQuizzes } from '@/data/quizzes'
import { expandedGeographyQuizzes } from '@/data/expanded-geography-quizzes'

export const useQuestionStore = defineStore('question', () => {
  // ============ 狀態 ============
  const questionBank = ref(new Map())
  const subjectQuestions = ref({})
  const isLoading = ref(false)
  const error = ref(null)

  // ============ Getters ============
  const getSubjectQuestionCount = computed(() => {
    return (subjectId) => {
      return subjectQuestions.value[subjectId]?.length || 0
    }
  })

  // ============ 數據加載 ============
  
  /**
   * 加載科目題目
   */
  async function loadQuestions(subjectId) {
    if (subjectQuestions.value[subjectId]) {
      return subjectQuestions.value[subjectId]
    }

    isLoading.value = true
    error.value = null

    try {
      let questions = []

      // 根據科目加載對應題庫
      switch (subjectId) {
        case 1: // 國文
          questions = generateMockQuestions(subjectId, 'chinese')
          break
        case 2: // 英語
          questions = generateMockQuestions(subjectId, 'english')
          break
        case 3: // 數學
          questions = generateMockQuestions(subjectId, 'math')
          break
        case 4: // 自然
          questions = generateMockQuestions(subjectId, 'science')
          break
        case 5: // 社會
          // 使用真實的地理題庫
          questions = [...geographyQuizzes, ...expandedGeographyQuizzes].map((q, idx) => ({
            id: idx + 1,
            subjectId: 5,
            topicId: q.topicId || 1,
            type: q.type || 'single',
            question: q.question,
            options: q.options,
            answer: q.correctAnswer !== undefined ? q.correctAnswer : (Array.isArray(q.correctAnswers) ? q.correctAnswers[0] : 0),
            explanation: q.explanation || q.explanationText || '請參考相關教材',
            difficulty: q.difficulty || 'medium',
            tags: q.tags || []
          }))
          break
        default:
          questions = generateMockQuestions(subjectId, 'default')
      }

      // 確保每個題目有ID
      questions = questions.map((q, idx) => ({
        ...q,
        id: q.id || idx + 1
      }))

      // 存儲到內存
      questions.forEach(q => {
        questionBank.value.set(q.id, q)
      })
      subjectQuestions.value[subjectId] = questions

      return questions
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 獲取隨機題目
   */
  function getRandomQuestions(subjectId, count = 10, topicId = null) {
    let questions = subjectQuestions.value[subjectId] || []
    
    // 按主題過濾
    if (topicId) {
      questions = questions.filter(q => q.topicId === topicId)
    }

    // 隨機選擇
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

  // ============ 模擬數據生成（臨時使用） ============
  
  function generateMockQuestions(subjectId, subjectCode) {
    const subject = getSubjectById(subjectId)
    if (!subject) return []

    const questions = []
    let questionId = 1

    // 為每個主題生成題目
    subject.topics.forEach((topic, topicIdx) => {
      // 每個主題生成5-10題
      const topicQuestionCount = 5 + Math.floor(Math.random() * 6)
      
      for (let i = 0; i < topicQuestionCount; i++) {
        const difficulty = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
        
        questions.push({
          id: questionId++,
          subjectId,
          topicId: topic.id,
          type: ['single', 'multiple', 'truefalse'][Math.floor(Math.random() * 3)],
          question: generateQuestionText(subjectCode, topic, i + 1),
          options: generateOptions(subjectCode, topic, i + 1),
          answer: Math.floor(Math.random() * 4),
          explanation: `這是第${i + 1}題的解析。${topic.name}是${subjectCode}學科的重要內容，請認真學習。`,
          difficulty,
          tags: [topic.name, subject.name]
        })
      }
    })

    return questions
  }

  function generateQuestionText(subjectCode, topic, num) {
    const templates = {
      chinese: [
        `下列何者為「${topic.name}」的正確用法？`,
        `關於「${topic.name}」，下列敘述何者正確？`,
        `${topic.description}的相關知識，以下何者正確？`,
        `「${topic.name}」的使用時機，下列何者正確？`
      ],
      english: [
        `Which of the following is the correct usage of "${topic.name}"?`,
        `Regarding "${topic.name}", which statement is correct?`,
        `Choose the best answer for "${topic.name}" usage.`,
        `What is the proper form of "${topic.name}"?`
      ],
      math: [
        `已知條件，求${topic.name}的值為何？`,
        `關於${topic.name}，下列計算何者正確？`,
        `${topic.description}，正確的解法為何？`,
        `計算${topic.name}，答案為何？`
      ],
      science: [
        `關於${topic.name}的原理，下列何者正確？`,
        `${topic.description}的相關知識，以下何者正確？`,
        `有關${topic.name}的現象，解釋何者正確？`,
        `${topic.name}的形成原因，下列何者正確？`
      ],
      default: [
        `關於${topic.name}，下列敘述何者正確？`,
        `${topic.description}的相關知識，以下何者正確？`,
        `${topic.name}為本章節重點，請問下列何者正確？`,
        `學習${topic.name}時，應注意哪些事項？`
      ]
    }

    const templateList = templates[subjectCode] || templates.default
    return templateList[num % templateList.length]
  }

  function generateOptions(subjectCode, topic, num) {
    const templates = {
      chinese: ['選項A', '選項B', '選項C', '選項D'],
      english: ['Option A', 'Option B', 'Option C', 'Option D'],
      math: ['甲', '乙', '丙', '丁'],
      science: ['①', '②', '③', '④'],
      default: ['選項一', '選項二', '選項三', '選項四']
    }

    const options = templates[subjectCode] || templates.default
    
    // 根據題目數量動態生成選項
    return [
      `${options[0]}：這是第一個選項的內容`,
      `${options[1]}：這是第二個選項的內容`,
      `${options[2]}：這是第三個選項的內容`,
      `${options[3]}：這是第四個選項的內容`
    ]
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
