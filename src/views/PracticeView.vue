<template>
  <v-container class="pa-4">
    <!-- 頁面標題 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card color="green-darken-2" dark class="pa-4 rounded-lg">
          <v-card-title class="text-h4 font-weight-bold">
            <v-icon large left>mdi-check-circle</v-icon>
            練習中心
          </v-card-title>
          <v-card-subtitle class="text-h6 mt-2">
            互動練習題庫 - 超過200題會考題型，加強你的解題能力
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 測驗選擇 -->
    <v-row v-if="!currentQuiz && !quizCompleted" class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-format-list-checks</v-icon>
            選擇測驗類型
          </v-card-title>
          
          <!-- 主題測驗 -->
          <div class="mb-6">
            <h3 class="text-h6 mb-3">主題測驗</h3>
            <v-row>
              <v-col
                v-for="quiz in topicQuizzes"
                :key="quiz.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card 
                  class="pa-4 h-100"
                  :color="getQuizColor(quiz.difficulty)"
                  variant="outlined"
                  hover
                  @click="startQuiz(quiz)"
                >
                  <v-card-title class="text-h6">
                    {{ quiz.title }}
                  </v-card-title>
                  
                  <v-card-subtitle class="mb-2">
                    <v-chip size="small" class="mr-1">{{ quiz.difficulty }}</v-chip>
                    <v-chip size="small">{{ quiz.questionsCount }} 題</v-chip>
                    <v-chip size="small" class="ml-1">{{ Math.floor(quiz.timeLimit / 60) }} 分鐘</v-chip>
                  </v-card-subtitle>
                  
                  <v-card-text>
                    主題：{{ getTopicName(quiz.topicId) }}
                  </v-card-text>
                  
                  <v-card-actions>
                    <v-btn color="primary" block>
                      開始測驗
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- 模擬會考 -->
          <div>
            <h3 class="text-h6 mb-3">模擬會考</h3>
            <v-row>
              <v-col cols="12" md="6">
                <v-card 
                  class="pa-4"
                  color="orange-lighten-5"
                  variant="outlined"
                  hover
                  @click="startMockExam('easy')"
                >
                  <v-card-title class="text-h6">
                    <v-icon left color="orange">mdi-school</v-icon>
                    基礎模擬考
                  </v-card-title>
                  
                  <v-card-subtitle class="mb-2">
                    <v-chip size="small" class="mr-1">初級</v-chip>
                    <v-chip size="small">30 題</v-chip>
                    <v-chip size="small" class="ml-1">45 分鐘</v-chip>
                  </v-card-subtitle>
                  
                  <v-card-text>
                    適合剛開始複習的學生，題目較為基礎。
                  </v-card-text>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card 
                  class="pa-4"
                  color="red-lighten-5"
                  variant="outlined"
                  hover
                  @click="startMockExam('hard')"
                >
                  <v-card-title class="text-h6">
                    <v-icon left color="red">mdi-trophy</v-icon>
                    進階模擬考
                  </v-card-title>
                  
                  <v-card-subtitle class="mb-2">
                    <v-chip size="small" class="mr-1">高級</v-chip>
                    <v-chip size="small">50 題</v-chip>
                    <v-chip size="small" class="ml-1">60 分鐘</v-chip>
                  </v-card-subtitle>
                  
                  <v-card-text>
                    挑戰性題目，適合準備衝刺的學生。
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- 測驗統計 -->
          <v-card class="pa-4 mt-6" color="blue-lighten-5">
            <v-card-title class="text-h6">
              <v-icon left color="blue">mdi-chart-bar</v-icon>
              測驗統計
            </v-card-title>
            
            <v-row>
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ totalQuizzes }}</div>
                  <div class="text-caption">測驗總數</div>
                </div>
              </v-col>
              
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ totalQuestions }}</div>
                  <div class="text-caption">題目總數</div>
                </div>
              </v-col>
              
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ averageScore }}/100</div>
                  <div class="text-caption">平均分數</div>
                </div>
              </v-col>
              
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ completedQuizzes }}</div>
                  <div class="text-caption">已完成測驗</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <!-- 測驗進行中 -->
    <v-row v-if="currentQuiz && !quizCompleted">
      <v-col cols="12">
        <v-card class="pa-4">
          <!-- 測驗標題與計時器 -->
          <v-card-title class="d-flex justify-space-between align-center">
            <div>
              <h2 class="text-h5">{{ currentQuiz.title }}</h2>
              <div class="text-caption">
                第 {{ currentQuestionIndex + 1 }} 題 / {{ currentQuiz.questionsCount }}
              </div>
            </div>
            
            <div class="text-right">
              <v-chip color="primary" size="large">
                <v-icon left>mdi-timer</v-icon>
                {{ formatTime(timeLeft) }}
              </v-chip>
            </div>
          </v-card-title>

          <!-- 進度條 -->
          <v-progress-linear
            :model-value="progressPercentage"
            height="10"
            color="primary"
            class="my-4"
          ></v-progress-linear>

          <!-- 題目 -->
          <div class="mb-6">
            <h3 class="text-h6 mb-4">{{ currentQuestion.question }}</h3>
            
            <!-- 單選題 -->
            <v-radio-group v-if="currentQuestion.type === 'single-choice'" v-model="userAnswers[currentQuestionIndex]">
              <v-radio
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                :label="option"
                :value="index"
                class="mb-2"
              ></v-radio>
            </v-radio-group>
            
            <!-- 多選題 -->
            <v-checkbox
              v-if="currentQuestion.type === 'multiple-choice'"
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              v-model="userAnswers[currentQuestionIndex]"
              :label="option"
              :value="index"
              multiple
              class="mb-1"
            ></v-checkbox>
            
            <!-- 是非題 -->
            <v-radio-group v-if="currentQuestion.type === 'true-false'" v-model="userAnswers[currentQuestionIndex]">
              <v-radio label="正確" :value="true" class="mb-2"></v-radio>
              <v-radio label="錯誤" :value="false"></v-radio>
            </v-radio-group>
            
            <!-- 配對題 -->
            <div v-if="currentQuestion.type === 'matching'" class="mb-4">
              <v-row>
                <v-col cols="6">
                  <div v-for="(item, index) in currentQuestion.leftItems" :key="index" class="mb-2">
                    <v-chip>{{ item }}</v-chip>
                  </div>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-for="(item, index) in currentQuestion.leftItems"
                    :key="index"
                    v-model="userAnswers[currentQuestionIndex][index]"
                    :items="currentQuestion.rightItems"
                    :label="`配對：${item}`"
                    class="mb-2"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </div>

          <!-- 導航按鈕 -->
          <v-card-actions class="d-flex justify-space-between">
            <v-btn 
              color="grey" 
              @click="prevQuestion"
              :disabled="currentQuestionIndex === 0"
            >
              <v-icon left>mdi-chevron-left</v-icon>
              上一題
            </v-btn>
            
            <div>
              <v-btn 
                color="primary" 
                @click="nextQuestion"
                v-if="currentQuestionIndex < currentQuiz.questionsCount - 1"
              >
                下一題
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
              
              <v-btn 
                color="success" 
                @click="submitQuiz"
                v-else
              >
                <v-icon left>mdi-check</v-icon>
                提交測驗
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 測驗結果 -->
    <v-row v-if="quizCompleted">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h4 mb-4 text-center">
            <v-icon large left color="success">mdi-trophy</v-icon>
            測驗完成！
          </v-card-title>
          
          <!-- 分數顯示 -->
          <div class="text-center mb-6">
            <div class="text-h1 font-weight-bold" :class="scoreClass">
              {{ finalScore }}/100
            </div>
            <div class="text-h6 mt-2">
              {{ scoreMessage }}
            </div>
          </div>
          
          <!-- 測驗詳細結果 -->
          <v-card class="pa-4 mb-4">
            <v-card-title class="text-h6">
              測驗詳細結果
            </v-card-title>
            
            <v-table>
              <thead>
                <tr>
                  <th>題號</th>
                  <th>你的答案</th>
                  <th>正確答案</th>
                  <th>得分</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(result, index) in quizResults" 
                  :key="index"
                  :class="result.correct ? 'correct-row' : 'incorrect-row'"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ formatAnswer(result.userAnswer, result.question) }}</td>
                  <td>{{ formatAnswer(result.correctAnswer, result.question) }}</td>
                  <td>{{ result.points }}</td>
                </tr>
              </tbody>
            </v-table>
            
            <div class="text-right mt-4">
              <strong>總分：{{ finalScore }} / {{ maxScore }}</strong>
            </div>
          </v-card>
          
          <!-- 題目解析 -->
          <v-expansion-panels class="mb-4">
            <v-expansion-panel
              v-for="(result, index) in quizResults"
              :key="index"
              :title="`第 ${index + 1} 題：${result.question.question.substring(0, 50)}...`"
            >
              <v-expansion-panel-text>
                <div class="mb-2">
                  <strong>題目：</strong>{{ result.question.question }}
                </div>
                <div class="mb-2">
                  <strong>你的答案：</strong>{{ formatAnswer(result.userAnswer, result.question) }}
                </div>
                <div class="mb-2">
                  <strong>正確答案：</strong>{{ formatAnswer(result.correctAnswer, result.question) }}
                </div>
                <div v-if="result.question.explanation">
                  <strong>解析：</strong>{{ result.question.explanation }}
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          
          <!-- 動作按鈕 -->
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" @click="restartQuiz" class="mr-2">
              <v-icon left>mdi-refresh</v-icon>
              重新測驗
            </v-btn>
            <v-btn color="success" @click="goToStudy" class="mr-2">
              <v-icon left>mdi-book-open</v-icon>
              學習相關主題
            </v-btn>
            <v-btn color="grey" @click="goToQuizList">
              <v-icon left>mdi-format-list-checks</v-icon>
              返回測驗列表
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/store/progress'
import { getAllQuizzes, getTotalQuizzes, getTotalQuestions } from '@/data/quizzes'
import { getAllTopics } from '@/data/taiwan-geography'

const router = useRouter()
const progressStore = useProgressStore()

// 狀態
const currentQuiz = ref(null)
const currentQuestionIndex = ref(0)
const userAnswers = ref([])
const quizCompleted = ref(false)
const quizResults = ref([])
const finalScore = ref(0)
const timeLeft = ref(0)
let timerInterval = null

// 數據
const topicQuizzes = ref(getAllQuizzes())
const topics = ref(getAllTopics())

// 計算屬性
const totalQuizzes = computed(() => getTotalQuizzes())
const totalQuestions = computed(() => getTotalQuestions())
const averageScore = computed(() => progressStore.averageScore)
const completedQuizzes = computed(() => {
  // 簡化：根據progress store中的quizScores計算
  return Object.keys(progressStore.progress.quizScores).length
})

const currentQuestion = computed(() => {
  if (!currentQuiz.value) return null
  return currentQuiz.value.questions[currentQuestionIndex.value]
})

const progressPercentage = computed(() => {
  if (!currentQuiz.value) return 0
  return ((currentQuestionIndex.value + 1) / currentQuiz.value.questionsCount) * 100
})

const maxScore = computed(() => {
  if (!currentQuiz.value) return 0
  return currentQuiz.value.questions.reduce((total, q) => total + q.points, 0)
})

const scoreClass = computed(() => {
  if (finalScore.value >= 80) return 'text-green'
  if (finalScore.value >= 60) return 'text-orange'
  return 'text-red'
})

const scoreMessage = computed(() => {
  if (finalScore.value >= 90) return '太棒了！你是地理小博士！'
  if (finalScore.value >= 80) return '優秀！你的地理知識很扎實！'
  if (finalScore.value >= 60) return '不錯！繼續努力可以更好！'
  return '加油！再多複習一下會更好！'
})

// 方法
const getQuizColor = (difficulty) => {
  switch (difficulty) {
    case '初級': return 'green-lighten-5'
    case '中級': return 'blue-lighten-5'
    case '高級': return 'orange-lighten-5'
    default: return 'grey-lighten-5'
  }
}

const getTopicName = (topicId) => {
  const topic = topics.value.find(t => t.id === topicId)
  return topic ? topic.title : '未知主題'
}

const startQuiz = (quiz) => {
  currentQuiz.value = { ...quiz }
  currentQuestionIndex.value = 0
  
  // 初始化答案數組，對於 matching 題型初始化為空數組
  userAnswers.value = new Array(quiz.questionsCount).fill(null).map((_, index) => {
    const question = quiz.questions[index]
    if (question.type === 'matching' && question.leftItems) {
      // 對於 matching 題型，初始化為與 leftItems 相同長度的數組，填充 null
      return new Array(question.leftItems.length).fill(null)
    }
    return null
  })
  
  quizCompleted.value = false
  quizResults.value = []
  finalScore.value = 0
  
  // 初始化計時器
  timeLeft.value = quiz.timeLimit
  startTimer()
}

const startMockExam = (difficulty) => {
  // 簡化：使用第一個測驗作為模擬考
  startQuiz(topicQuizzes.value[0])
}

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      // 時間到，自動提交
      submitQuiz()
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < currentQuiz.value.questionsCount - 1) {
    currentQuestionIndex.value++
  }
}

const submitQuiz = () => {
  // 停止計時器
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  
  // 計算分數
  let totalScore = 0
  const results = []
  
  currentQuiz.value.questions.forEach((question, index) => {
    const userAnswer = userAnswers.value[index]
    const correctAnswer = question.correctAnswer
    let correct = false
    let points = 0
    
    // 檢查答案正確性
    switch (question.type) {
      case 'single-choice':
      case 'true-false':
        correct = userAnswer === correctAnswer
        break
      case 'multiple-choice':
        // 檢查是否選擇了所有正確答案且沒有錯誤答案
        if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
          const userSorted = [...userAnswer].sort()
          const correctSorted = [...correctAnswer].sort()
          correct = JSON.stringify(userSorted) === JSON.stringify(correctSorted)
        }
        break
      case 'matching':
        // 檢查配對題答案
        if (Array.isArray(userAnswer) && Array.isArray(question.correctPairs)) {
          // 將用戶答案轉換為配對格式
          const userPairs = userAnswer.map((rightIndex, leftIndex) => [leftIndex, rightIndex])
          // 將正確答案轉換為可比較的格式
          const correctPairs = question.correctPairs
          // 排序後比較
          const userSorted = [...userPairs].sort((a, b) => a[0] - b[0] || a[1] - b[1])
          const correctSorted = [...correctPairs].sort((a, b) => a[0] - b[0] || a[1] - b[1])
          correct = JSON.stringify(userSorted) === JSON.stringify(correctSorted)
        }
        break
    }
    
    // 計算得分
    points = correct ? question.points : 0
    totalScore += points
    
    // 對於 matching 題型，需要特殊處理正確答案的格式
    let displayCorrectAnswer = correctAnswer
    if (question.type === 'matching' && question.correctPairs) {
      displayCorrectAnswer = question.correctPairs
    }
    
    results.push({
      question,
      userAnswer,
      correctAnswer: displayCorrectAnswer,
      correct,
      points
    })
  })
  
  // 保存結果
  quizResults.value = results
  finalScore.value = totalScore
  quizCompleted.value = true
  
  // 更新進度
  if (currentQuiz.value.topicId) {
    progressStore.updateQuizScore(currentQuiz.value.topicId, totalScore)
  }
}

const formatAnswer = (answer, question) => {
  if (answer === null || answer === undefined) return '未回答'
  
  switch (question.type) {
    case 'single-choice':
      return question.options[answer] || '無效答案'
    case 'multiple-choice':
      if (Array.isArray(answer)) {
        return answer.map(idx => question.options[idx]).join(', ') || '無效答案'
      }
      return '無效答案'
    case 'true-false':
      return answer ? '正確' : '錯誤'
    case 'matching':
      // 處理 matching 題型的答案顯示
      if (Array.isArray(answer)) {
        // 如果是 correctPairs 格式（[[0,1], [1,2], ...]）
        if (answer.length > 0 && Array.isArray(answer[0])) {
          // 這是 correctPairs 格式
          return answer.map(([leftIndex, rightIndex]) => {
            const leftItem = question.leftItems[leftIndex] || `項目${leftIndex}`
            const rightItem = question.rightItems[rightIndex] || `選項${rightIndex}`
            return `${leftItem} → ${rightItem}`
          }).join('; ')
        } else {
          // 這是用戶答案格式（[1, 2, 3, 0]）
          return answer.map((rightIndex, leftIndex) => {
            const leftItem = question.leftItems[leftIndex] || `項目${leftIndex}`
            const rightItem = question.rightItems[rightIndex] || `選項${rightIndex}`
            return `${leftItem} → ${rightItem}`
          }).join('; ')
        }
      }
      return '無效答案'
    default:
      return String(answer)
  }
}

const restartQuiz = () => {
  if (currentQuiz.value) {
    startQuiz(currentQuiz.value)
  }
}

const goToStudy = () => {
  if (currentQuiz.value && currentQuiz.value.topicId) {
    router.push({ name: 'study', query: { topic: currentQuiz.value.topicId } })
  } else {
    router.push({ name: 'study' })
  }
}

const goToQuizList = () => {
  currentQuiz.value = null
  quizCompleted.value = false
}

// 檢查URL參數
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const topicParam = urlParams.get('topic')
  if (topicParam && !isNaN(topicParam)) {
    const topicId = parseInt(topicParam)
    const quiz = topicQuizzes.value.find(q => q.topicId === topicId)
    if (quiz) {
      startQuiz(quiz)
    }
  }
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<style scoped>
.correct-row {
  background-color: rgba(76, 175, 80, 0.1);
}

.incorrect-row {
  background-color: rgba(244, 67, 54, 0.1);
}

.text-green {
  color: #4CAF50;
}

.text-orange {
  color: #FF9800;
}

.text-red {
  color: #F44336;
}
</style>