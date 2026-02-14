import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProgressStore = defineStore('progress', () => {
  // 從LocalStorage載入進度
  const loadFromStorage = () => {
    const saved = localStorage.getItem('geographyProgress')
    return saved ? JSON.parse(saved) : {
      completedTopics: [],
      quizScores: {},
      studyTime: 0,
      lastActive: Date.now()
    }
  }

  // 進度狀態
  const progress = ref(loadFromStorage())

  // 保存到LocalStorage
  const saveToStorage = () => {
    localStorage.setItem('geographyProgress', JSON.stringify(progress.value))
  }

  // 完成主題
  const completeTopic = (topicId) => {
    if (!progress.value.completedTopics.includes(topicId)) {
      progress.value.completedTopics.push(topicId)
      saveToStorage()
    }
  }

  // 更新測驗分數
  const updateQuizScore = (topicId, score) => {
    if (!progress.value.quizScores[topicId]) {
      progress.value.quizScores[topicId] = {
        score: 0,
        lastAttempt: Date.now(),
        attempts: 0
      }
    }
    
    progress.value.quizScores[topicId].score = score
    progress.value.quizScores[topicId].lastAttempt = Date.now()
    progress.value.quizScores[topicId].attempts++
    
    saveToStorage()
  }

  // 增加學習時間
  const addStudyTime = (minutes) => {
    progress.value.studyTime += minutes
    progress.value.lastActive = Date.now()
    saveToStorage()
  }

  // 計算總進度
  const totalProgress = computed(() => {
    const totalTopics = 10 // 台灣地理有10個主題
    const completed = progress.value.completedTopics.length
    return Math.round((completed / totalTopics) * 100)
  })

  // 平均分數
  const averageScore = computed(() => {
    const scores = Object.values(progress.value.quizScores)
    if (scores.length === 0) return 0
    
    const total = scores.reduce((sum, item) => sum + item.score, 0)
    return Math.round(total / scores.length)
  })

  // 學習時間格式化
  const formattedStudyTime = computed(() => {
    const hours = Math.floor(progress.value.studyTime / 60)
    const minutes = progress.value.studyTime % 60
    
    if (hours > 0) {
      return `${hours}小時${minutes}分鐘`
    }
    return `${minutes}分鐘`
  })

  // 重置進度
  const resetProgress = () => {
    progress.value = {
      completedTopics: [],
      quizScores: {},
      studyTime: 0,
      lastActive: Date.now()
    }
    saveToStorage()
  }

  return {
    progress,
    completeTopic,
    updateQuizScore,
    addStudyTime,
    totalProgress,
    averageScore,
    formattedStudyTime,
    resetProgress
  }
})