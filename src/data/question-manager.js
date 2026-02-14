// 題目管理系統
// 支持隨機出題、錯題記錄、題目管理

import { geographyQuizzes } from './quizzes.js'

// 題目數據庫（未來擴充）
const questionDatabase = {
  // 地理題目（現有）
  geography: geographyQuizzes,
  
  // 其他科目題目（待擴充）
  chinese: [],
  english: [],
  math: [],
  science: [],
  history: [],
  civics: []
}

// 錯題本管理器
class WrongAnswerManager {
  constructor() {
    this.wrongAnswers = this.loadFromStorage()
  }
  
  // 從LocalStorage加載錯題
  loadFromStorage() {
    try {
      const stored = localStorage.getItem('wrongAnswers')
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('加載錯題本失敗:', error)
      return {}
    }
  }
  
  // 保存到LocalStorage
  saveToStorage() {
    try {
      localStorage.setItem('wrongAnswers', JSON.stringify(this.wrongAnswers))
    } catch (error) {
      console.error('保存錯題本失敗:', error)
    }
  }
  
  // 添加錯題
  addWrongAnswer(subject, topic, question, userAnswer, correctAnswer) {
    const key = `${subject}-${topic}`
    
    if (!this.wrongAnswers[key]) {
      this.wrongAnswers[key] = []
    }
    
    // 檢查是否已存在相同題目
    const exists = this.wrongAnswers[key].some(item => 
      item.question.id === question.id
    )
    
    if (!exists) {
      this.wrongAnswers[key].push({
        subject,
        topic,
        question,
        userAnswer,
        correctAnswer,
        timestamp: new Date().toISOString(),
        reviewCount: 0,
        mastered: false
      })
      
      this.saveToStorage()
    }
  }
  
  // 獲取錯題
  getWrongAnswers(subject = null, topic = null) {
    if (subject && topic) {
      const key = `${subject}-${topic}`
      return this.wrongAnswers[key] || []
    } else if (subject) {
      // 獲取該科目的所有錯題
      const result = []
      Object.keys(this.wrongAnswers).forEach(key => {
        if (key.startsWith(`${subject}-`)) {
          result.push(...this.wrongAnswers[key])
        }
      })
      return result
    } else {
      // 獲取所有錯題
      const result = []
      Object.values(this.wrongAnswers).forEach(items => {
        result.push(...items)
      })
      return result
    }
  }
  
  // 標記為已掌握
  markAsMastered(subject, topic, questionId) {
    const key = `${subject}-${topic}`
    if (this.wrongAnswers[key]) {
      const item = this.wrongAnswers[key].find(item => item.question.id === questionId)
      if (item) {
        item.mastered = true
        this.saveToStorage()
      }
    }
  }
  
  // 增加複習次數
  incrementReviewCount(subject, topic, questionId) {
    const key = `${subject}-${topic}`
    if (this.wrongAnswers[key]) {
      const item = this.wrongAnswers[key].find(item => item.question.id === questionId)
      if (item) {
        item.reviewCount = (item.reviewCount || 0) + 1
        this.saveToStorage()
      }
    }
  }
  
  // 刪除錯題
  removeWrongAnswer(subject, topic, questionId) {
    const key = `${subject}-${topic}`
    if (this.wrongAnswers[key]) {
      this.wrongAnswers[key] = this.wrongAnswers[key].filter(
        item => item.question.id !== questionId
      )
      this.saveToStorage()
    }
  }
  
  // 清空錯題本
  clearAll() {
    this.wrongAnswers = {}
    this.saveToStorage()
  }
  
  // 統計信息
  getStatistics() {
    const stats = {
      total: 0,
      bySubject: {},
      byTopic: {},
      mastered: 0,
      needReview: 0
    }
    
    Object.entries(this.wrongAnswers).forEach(([key, items]) => {
      const [subject, topic] = key.split('-')
      stats.total += items.length
      
      // 按科目統計
      stats.bySubject[subject] = (stats.bySubject[subject] || 0) + items.length
      
      // 按主題統計
      const topicKey = `${subject}-${topic}`
      stats.byTopic[topicKey] = items.length
      
      // 統計掌握情況
      items.forEach(item => {
        if (item.mastered) {
          stats.mastered++
        } else {
          stats.needReview++
        }
      })
    })
    
    return stats
  }
}

// 題目隨機化器
class QuestionRandomizer {
  // 隨機打亂數組
  static shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
  
  // 隨機打亂選項順序
  static shuffleOptions(question) {
    if (!question.options) return question
    
    const shuffledQuestion = { ...question }
    
    // 創建選項索引數組
    const indices = question.options.map((_, index) => index)
    const shuffledIndices = this.shuffleArray(indices)
    
    // 重新排列選項
    shuffledQuestion.options = shuffledIndices.map(i => question.options[i])
    
    // 更新正確答案索引
    if (question.type === 'single-choice') {
      // 單選題：找到原正確答案的新位置
      const newIndex = shuffledIndices.indexOf(question.correctAnswer)
      shuffledQuestion.correctAnswer = newIndex
    } else if (question.type === 'multiple-choice') {
      // 多選題：更新所有正確答案索引
      shuffledQuestion.correctAnswer = question.correctAnswer.map(
        idx => shuffledIndices.indexOf(idx)
      ).sort((a, b) => a - b)
    } else if (question.type === 'matching') {
      // 配對題：需要特殊處理
      // 只打亂右側選項，左側保持不變
      const rightIndices = question.rightItems.map((_, index) => index)
      const shuffledRightIndices = this.shuffleArray(rightIndices)
      
      shuffledQuestion.rightItems = shuffledRightIndices.map(i => question.rightItems[i])
      
      // 更新正確配對
      shuffledQuestion.correctPairs = question.correctPairs.map(([leftIdx, rightIdx]) => {
        const newRightIdx = shuffledRightIndices.indexOf(rightIdx)
        return [leftIdx, newRightIdx]
      })
    }
    
    return shuffledQuestion
  }
  
  // 從題庫中隨機抽取題目
  static getRandomQuestions(questions, count, excludeIds = []) {
    // 過濾掉排除的題目
    const availableQuestions = questions.filter(q => !excludeIds.includes(q.id))
    
    // 如果可用題目不足，返回所有可用題目
    if (availableQuestions.length <= count) {
      return this.shuffleArray(availableQuestions)
    }
    
    // 隨機選擇指定數量的題目
    const selected = []
    const indices = new Set()
    
    while (selected.length < count && indices.size < availableQuestions.length) {
      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      
      if (!indices.has(randomIndex)) {
        indices.add(randomIndex)
        selected.push(availableQuestions[randomIndex])
      }
    }
    
    // 打亂選中的題目順序
    return this.shuffleArray(selected)
  }
  
  // 生成模擬考試題目
  static generateMockExam(subject, topic, count, difficulty = null) {
    // 從題庫中獲取題目
    let questions = []
    
    if (subject === 'geography') {
      // 地理題目
      if (topic) {
        // 特定主題
        const quiz = questionDatabase.geography.find(q => q.topicId === topic)
        if (quiz) {
          questions = quiz.questions
        }
      } else {
        // 所有地理題目
        questionDatabase.geography.forEach(quiz => {
          questions.push(...quiz.questions)
        })
      }
    }
    
    // 按難度過濾
    if (difficulty) {
      // 這裡可以根據題目難度過濾
      // 暫時先不過濾
    }
    
    // 隨機抽取題目
    const selectedQuestions = this.getRandomQuestions(questions, count)
    
    // 打亂每個題目的選項順序
    return selectedQuestions.map(q => this.shuffleOptions(q))
  }
  
  // 從錯題本生成複習題目
  static generateReviewQuestions(wrongAnswerManager, count = 10, subject = null, topic = null) {
    const wrongAnswers = wrongAnswerManager.getWrongAnswers(subject, topic)
    
    // 過濾未掌握的錯題
    const needReview = wrongAnswers.filter(item => !item.mastered)
    
    if (needReview.length === 0) {
      return []
    }
    
    // 隨機選擇錯題
    const selected = this.getRandomQuestions(
      needReview.map(item => item.question),
      Math.min(count, needReview.length)
    )
    
    // 打亂選項順序
    return selected.map(q => this.shuffleOptions(q))
  }
}

// 考試管理器
class ExamManager {
  constructor() {
    this.wrongAnswerManager = new WrongAnswerManager()
    this.randomizer = QuestionRandomizer
  }
  
  // 開始模擬考試
  startMockExam(subject, topic, questionCount, timeLimit) {
    const questions = this.randomizer.generateMockExam(
      subject,
      topic,
      questionCount
    )
    
    return {
      subject,
      topic,
      questions,
      questionCount,
      timeLimit,
      startTime: new Date(),
      userAnswers: new Array(questionCount).fill(null),
      completed: false
    }
  }
  
  // 開始錯題複習
  startWrongAnswerReview(count = 10, subject = null, topic = null) {
    const questions = this.randomizer.generateReviewQuestions(
      this.wrongAnswerManager,
      count,
      subject,
      topic
    )
    
    return {
      mode: 'review',
      subject,
      topic,
      questions,
      questionCount: questions.length,
      timeLimit: null, // 錯題複習不限時
      startTime: new Date(),
      userAnswers: new Array(questions.length).fill(null),
      completed: false
    }
  }
  
  // 提交考試
  submitExam(exam, userAnswers) {
    const results = []
    let totalScore = 0
    let correctCount = 0
    
    exam.questions.forEach((question, index) => {
      const userAnswer = userAnswers[index]
      let correct = false
      let points = 0
      
      // 檢查答案
      switch (question.type) {
        case 'single-choice':
        case 'true-false':
          correct = userAnswer === question.correctAnswer
          break
        case 'multiple-choice':
          if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
            const userSorted = [...userAnswer].sort()
            const correctSorted = [...question.correctAnswer].sort()
            correct = JSON.stringify(userSorted) === JSON.stringify(correctSorted)
          }
          break
        case 'matching':
          if (Array.isArray(userAnswer) && Array.isArray(question.correctPairs)) {
            const userPairs = userAnswer.map((rightIndex, leftIndex) => [leftIndex, rightIndex])
            const userSorted = [...userPairs].sort((a, b) => a[0] - b[0] || a[1] - b[1])
            const correctSorted = [...question.correctPairs].sort((a, b) => a[0] - b[0] || a[1] - b[1])
            correct = JSON.stringify(userSorted) === JSON.stringify(correctSorted)
          }
          break
      }
      
      // 計算得分
      points = correct ? question.points : 0
      totalScore += points
      if (correct) correctCount++
      
      // 記錄錯題
      if (!correct && exam.mode !== 'review') {
        this.wrongAnswerManager.addWrongAnswer(
          exam.subject,
          exam.topic,
          question,
          userAnswer,
          question.correctAnswer
        )
      }
      
      results.push({
        question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        correct,
        points
      })
    })
    
    const finalScore = Math.round((totalScore / (exam.questions.length * 10)) * 100)
    
    return {
      results,
      finalScore,
      correctCount,
      totalQuestions: exam.questions.length,
      timeSpent: new Date() - exam.startTime
    }
  }
  
  // 獲取錯題本統計
  getWrongAnswerStats() {
    return this.wrongAnswerManager.getStatistics()
  }
  
  // 獲取錯題本
  getWrongAnswers(subject = null, topic = null) {
    return this.wrongAnswerManager.getWrongAnswers(subject, topic)
  }
  
  // 標記錯題為已掌握
  markWrongAnswerAsMastered(subject, topic, questionId) {
    this.wrongAnswerManager.markAsMastered(subject, topic, questionId)
  }
  
  // 刪除錯題
  removeWrongAnswer(subject, topic, questionId) {
    this.wrongAnswerManager.removeWrongAnswer(subject, topic, questionId)
  }
  
  // 清空錯題本
  clearWrongAnswers() {
    this.wrongAnswerManager.clearAll()
  }
}

// 創建全局實例
const examManager = new ExamManager()

// 導出
export {
  WrongAnswerManager,
  QuestionRandomizer,
  ExamManager,
  examManager
}