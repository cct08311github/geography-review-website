import { getSubjectById } from '@/data/subjects'

/**
 * Mock Question Service
 * 負責生成測試用的假題目數據
 */

export const mockQuestionService = {
  /**
   * 生成指定科目的模擬試題
   * @param {number} subjectId 
   * @param {string} subjectCode 
   * @returns {Array} 題目列表
   */
  generateQuestions(subjectId, subjectCode) {
    const subject = getSubjectById(subjectId)
    if (!subject) return []

    const questions = []
    let questionId = 1

    // 為每個主題生成題目
    subject.topics.forEach((topic) => {
      // 每個主題生成5-10題
      const topicQuestionCount = 5 + Math.floor(Math.random() * 6)
      
      for (let i = 0; i < topicQuestionCount; i++) {
        const difficulty = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
        
        questions.push({
          id: questionId++, // 注意：真實環境應由後端生成或 UUID
          subjectId,
          topicId: topic.id,
          type: ['single', 'multiple', 'truefalse'][Math.floor(Math.random() * 3)],
          question: this._generateQuestionText(subjectCode, topic, i + 1),
          options: this._generateOptions(subjectCode, topic, i + 1),
          answer: Math.floor(Math.random() * 4),
          explanation: `這是第${i + 1}題的解析。${topic.name}是${subjectCode}學科的重要內容，請認真學習。`,
          difficulty,
          tags: [topic.name, subject.name]
        })
      }
    })

    return questions
  },

  _generateQuestionText(subjectCode, topic, num) {
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
  },

  _generateOptions(subjectCode, topic, num) {
    const templates = {
      chinese: ['選項A', '選項B', '選項C', '選項D'],
      english: ['Option A', 'Option B', 'Option C', 'Option D'],
      math: ['甲', '乙', '丙', '丁'],
      science: ['①', '②', '③', '④'],
      default: ['選項一', '選項二', '選項三', '選項四']
    }

    const options = templates[subjectCode] || templates.default
    
    return [
      `${options[0]}：這是第一個選項的內容`,
      `${options[1]}：這是第二個選項的內容`,
      `${options[2]}：這是第三個選項的內容`,
      `${options[3]}：這是第四個選項的內容`
    ]
  }
}
