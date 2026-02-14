/**
 * 題目生成器工具函數
 */

/**
 * 從題庫中隨機選擇題目
 * @param {Array} questions - 題目數組
 * @param {number} count - 需要選擇的題目數量
 * @param {Object} options - 選項
 * @param {number} [options.topicId] - 主題ID過濾
 * @param {string} [options.difficulty] - 難度過濾
 * @returns {Array} 隨機選擇的題目
 */
export function getRandomQuestions(questions, count, options = {}) {
  // 過濾題目
  let filteredQuestions = [...questions]
  
  if (options.topicId) {
    filteredQuestions = filteredQuestions.filter(q => q.topicId === options.topicId)
  }
  
  if (options.difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === options.difficulty)
  }
  
  // 檢查題目數量是否足夠
  if (filteredQuestions.length < count) {
    console.warn(`題目數量不足: 需要 ${count} 題，只有 ${filteredQuestions.length} 題可用`)
    count = Math.min(count, filteredQuestions.length)
  }
  
  if (count <= 0 || filteredQuestions.length === 0) {
    return []
  }
  
  // 隨機選擇（Fisher-Yates 洗牌算法）
  const selected = []
  const available = [...filteredQuestions]
  
  for (let i = 0; i < count; i++) {
    if (available.length === 0) break
    
    const randomIndex = Math.floor(Math.random() * available.length)
    selected.push(available[randomIndex])
    available.splice(randomIndex, 1)
  }
  
  return selected
}

/**
 * 打亂題目順序
 * @param {Array} questions - 題目數組
 * @returns {Array} 打亂順序後的題目
 */
export function shuffleQuestions(questions) {
  if (!questions || questions.length === 0) return []
  
  const shuffled = [...questions]
  
  // Fisher-Yates 洗牌算法
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * 打亂選項順序
 * @param {Array} options - 選項數組
 * @param {number} correctAnswer - 正確答案索引
 * @returns {Object} 打亂後的選項和映射關係
 */
export function shuffleOptions(options, correctAnswer) {
  // 創建帶原始索引的選項
  const indexedOptions = options.map((option, index) => ({
    text: option,
    originalIndex: index
  }))
  
  // 打亂順序
  for (let i = indexedOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexedOptions[i], indexedOptions[j]] = [indexedOptions[j], indexedOptions[i]]
  }
  
  // 找出新的正確答案索引
  let newCorrectIndex = 0
  indexedOptions.forEach((opt, newIndex) => {
    if (opt.originalIndex === correctAnswer) {
      newCorrectIndex = newIndex
    }
  })
  
  return {
    options: indexedOptions.map(o => o.text),
    newCorrectIndex
  }
}

/**
 * 根據難度分組題目
 * @param {Array} questions - 題目數組
 * @returns {Object} 按難度分組的題目
 */
export function groupByDifficulty(questions) {
  return {
    easy: questions.filter(q => q.difficulty === 'easy'),
    medium: questions.filter(q => q.difficulty === 'medium'),
    hard: questions.filter(q => q.difficulty === 'hard')
  }
}

/**
 * 根據主題分組題目
 * @param {Array} questions - 題目數組
 * @returns {Object} 按主題分組的題目
 */
export function groupByTopic(questions) {
  const grouped = {}
  
  questions.forEach(q => {
    const topicId = q.topicId || 'unknown'
    if (!grouped[topicId]) {
      grouped[topicId] = []
    }
    grouped[topicId].push(q)
  })
  
  return grouped
}

/**
 * 從錯題本中獲取題目
 * @param {Map} wrongQuestions - 錯題本 Map
 * @param {number} count - 需要數量
 * @returns {Array} 隨機錯題
 */
export function getQuestionsFromWrongBook(wrongQuestions, count = 10) {
  const questions = Array.from(wrongQuestions.values())
    .map(wq => wq.question)
  
  return getRandomQuestions(questions, count)
}

/**
 * 生成測驗試卷
 * @param {Array} questions - 可用題目
 * @param {Object} config - 試卷配置
 * @param {number} config.totalQuestions - 總題數
 * @param {number} [config.easyRatio] - 簡單題比例 (0-1)
 * @param {number} [config.mediumRatio] - 中等題比例 (0-1)
 * @param {number} [config.hardRatio] - 困難題比例 (0-1)
 * @returns {Array} 試卷題目
 */
export function generateExamPaper(questions, config) {
  const { totalQuestions } = config
  const easyRatio = config.easyRatio || 0.3
  const mediumRatio = config.mediumRatio || 0.5
  const hardRatio = config.hardRatio || 0.2
  
  // 按難度分組
  const grouped = groupByDifficulty(questions)
  
  // 計算各難度題數
  const easyCount = Math.round(totalQuestions * easyRatio)
  const mediumCount = Math.round(totalQuestions * mediumRatio)
  const hardCount = totalQuestions - easyCount - mediumCount
  
  // 隨機選擇各難度題目
  const easyQuestions = getRandomQuestions(grouped.easy || [], easyCount)
  const mediumQuestions = getRandomQuestions(grouped.medium || [], mediumCount)
  const hardQuestions = getRandomQuestions(grouped.hard || [], hardCount)
  
  // 合併並打亂
  return shuffleQuestions([...easyQuestions, ...mediumQuestions, ...hardQuestions])
}

/**
 * 驗證試題配置
 * @param {Object} config - 試卷配置
 * @returns {Object} 驗證結果
 */
export function validateExamConfig(config) {
  const errors = []
  
  if (!config.totalQuestions || config.totalQuestions <= 0) {
    errors.push('總題數必須大於0')
  }
  
  const ratioSum = (config.easyRatio || 0.3) + (config.mediumRatio || 0.5) + (config.hardRatio || 0.2)
  if (Math.abs(ratioSum - 1) > 0.01) {
    errors.push('難度比例總和必須等於1')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
