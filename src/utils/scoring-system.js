/**
 * 評分系統工具函數
 */

/**
 * 檢查答案是否正確
 * @param {Object} question - 題目對象
 * @param {any} userAnswer - 用戶答案
 * @returns {Object} 評分結果
 */
export function checkAnswer(question, userAnswer) {
  const { type, answer: correctAnswer } = question
  
  switch (type) {
    case 'single':
      return checkSingleAnswer(correctAnswer, userAnswer)
      
    case 'multiple':
      return checkMultipleAnswer(correctAnswer, userAnswer)
      
    case 'truefalse':
      return checkTrueFalseAnswer(correctAnswer, userAnswer)
      
    case 'matching':
      return checkMatchingAnswer(correctAnswer, userAnswer)
      
    default:
      return {
        isCorrect: false,
        correctAnswer,
        userAnswer,
        score: 0,
        error: `不支持的題型: ${type}`
      }
  }
}

/**
 * 檢查單選題答案
 */
function checkSingleAnswer(correctAnswer, userAnswer) {
  const isCorrect = correctAnswer === userAnswer
  
  return {
    isCorrect,
    correctAnswer,
    userAnswer,
    score: isCorrect ? 1 : 0
  }
}

/**
 * 檢查多選題答案
 */
function checkMultipleAnswer(correctAnswer, userAnswer) {
  // 確保數組格式
  const correct = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]
  const user = Array.isArray(userAnswer) ? userAnswer : []
  
  // 排序後比較
  const sortedCorrect = [...correct].sort((a, b) => a - b)
  const sortedUser = [...user].sort((a, b) => a - b)
  
  const isCorrect = 
    sortedCorrect.length === sortedUser.length &&
    sortedCorrect.every((value, index) => value === sortedUser[index])
  
  return {
    isCorrect,
    correctAnswer: sortedCorrect,
    userAnswer: sortedUser,
    score: isCorrect ? 1 : 0
  }
}

/**
 * 檢查判斷題答案
 */
function checkTrueFalseAnswer(correctAnswer, userAnswer) {
  const isCorrect = correctAnswer === userAnswer
  
  return {
    isCorrect,
    correctAnswer,
    userAnswer,
    score: isCorrect ? 1 : 0
  }
}

/**
 * 檢查配對題答案
 */
function checkMatchingAnswer(correctAnswer, userAnswer) {
  // correctAnswer 格式: [[0, 1], [1, 2], [2, 3]]
  // 表示 0->1, 1->2, 2->3 配對
  
  const correct = Array.isArray(correctAnswer) ? correctAnswer : []
  const user = Array.isArray(userAnswer) ? userAnswer : []
  
  // 檢查每個配對是否正確
  let correctPairs = 0
  correct.forEach((pair, index) => {
    const userPair = user[index]
    if (userPair && userPair[0] === pair[0] && userPair[1] === pair[1]) {
      correctPairs++
    }
  })
  
  const isCorrect = correctPairs === correct.length
  const score = correct.length > 0 ? correctPairs / correct.length : 0
  
  return {
    isCorrect,
    correctAnswer: correct,
    userAnswer: user,
    score
  }
}

/**
 * 計算練習會話總分
 * @param {Array} results - 每題評分結果
 * @returns {Object} 總分統計
 */
export function calculateTotalScore(results) {
  const totalQuestions = results.length
  const correctAnswers = results.filter(r => r.isCorrect).length
  const score = totalQuestions > 0 
    ? Math.round((correctAnswers / totalQuestions) * 100 * 100) / 100 
    : 0
  
  return {
    totalQuestions,
    correctAnswers,
    score,
    wrongAnswers: totalQuestions - correctAnswers
  }
}

/**
 * 計算正確率
 * @param {number} correctAnswers - 正確題數
 * @param {number} totalQuestions - 總題數
 * @returns {number} 正確率百分比
 */
export function calculateCorrectRate(correctAnswers, totalQuestions) {
  if (totalQuestions === 0) return 0
  return Math.round((correctAnswers / totalQuestions) * 100 * 100) / 100
}

/**
 * 獲取成績等級
 * @param {number} score - 分數 (0-100)
 * @returns {Object} 等級信息
 */
export function getGrade(score) {
  if (score >= 90) {
    return { grade: 'A', label: '優秀', color: 'green' }
  } else if (score >= 80) {
    return { grade: 'B', label: '良好', color: 'blue' }
  } else if (score >= 70) {
    return { grade: 'C', label: '中等', color: 'orange' }
  } else if (score >= 60) {
    return { grade: 'D', label: '及格', color: 'warning' }
  } else {
    return { grade: 'F', label: '需要加油', color: 'red' }
  }
}

/**
 * 計算答題時間得分
 * @param {number} timeSpent - 花費時間（毫秒）
 * @param {number} questionCount - 題目數量
 * @param {number} targetTimePerQuestion - 每題目標時間（毫秒）
 * @returns {number} 時間得分 (0-1)
 */
export function calculateTimeScore(timeSpent, questionCount, targetTimePerQuestion = 60000) {
  const totalTargetTime = questionCount * targetTimePerQuestion
  
  if (timeSpent <= totalTargetTime) {
    return 1
  } else if (timeSpent <= totalTargetTime * 1.5) {
    return 0.7
  } else if (timeSpent <= totalTargetTime * 2) {
    return 0.4
  } else {
    return 0.1
  }
}
