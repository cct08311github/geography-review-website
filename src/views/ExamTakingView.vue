<template>
  <v-container fluid class="fill-height pa-0 bg-grey-lighten-4">
    <!-- 載入中 -->
    <v-row v-if="isLoading" class="fill-height" justify="center" align="center">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-row>

    <template v-else>
      <!-- 頂部資訊欄 -->
      <v-app-bar color="white" elevation="1" density="compact">
        <v-app-bar-title class="text-subtitle-1 font-weight-bold">
          <v-icon :color="subjectColor" class="mr-2">mdi-file-document-edit</v-icon>
          {{ subjectName }} - 模擬考試
        </v-app-bar-title>
        
        <v-spacer></v-spacer>
        
        <!-- 計時器 -->
        <div class="d-flex align-center mr-4" :class="{'text-red': isTimeRunningOut}">
          <v-icon class="mr-1">mdi-timer-outline</v-icon>
          <span class="text-h6 font-weight-mono">{{ formattedTime }}</span>
        </div>

        <v-btn color="primary" variant="flat" @click="confirmSubmit">
          交卷
        </v-btn>
      </v-app-bar>

      <v-main class="bg-grey-lighten-4">
        <v-container class="fill-height py-4">
          <v-row class="fill-height">
            <!-- 左側：題目區域 -->
            <v-col cols="12" md="9" class="d-flex flex-column h-100">
              <v-card class="flex-grow-1 d-flex flex-column rounded-lg elevation-2">
                <!-- 題目內容 -->
                <v-card-text class="flex-grow-1 overflow-y-auto pa-6" v-if="currentQuestionData">
                  <div class="d-flex justify-space-between mb-4">
                    <v-chip color="primary" label>第 {{ currentQuestionIndex + 1 }} 題</v-chip>
                    <v-chip variant="outlined" size="small">{{ getQuestionTypeLabel(currentQuestionData.type) }}</v-chip>
                  </div>

                  <div class="text-h5 font-weight-medium mb-6 lh-relaxed">
                    {{ currentQuestionData.question }}
                  </div>

                  <!-- 選項區域 -->
                  <div class="options-container">
                    <!-- 單選/判斷 -->
                    <v-radio-group v-if="['single', 'truefalse'].includes(currentQuestionData.type)" v-model="currentAnswer" @update:modelValue="saveAnswer">
                      <v-radio
                        v-for="(option, idx) in currentOptions"
                        :key="idx"
                        :value="getOptionValue(currentQuestionData.type, idx)"
                        class="mb-3 pa-2 border rounded option-item"
                        color="primary"
                        :class="{'bg-blue-lighten-5 border-primary': currentAnswer === getOptionValue(currentQuestionData.type, idx)}"
                      >
                        <template v-slot:label>
                          <div class="d-flex align-center w-100">
                            <span class="font-weight-bold mr-3 text-body-1">{{ getOptionLabel(currentQuestionData.type, idx) }}</span>
                            <span class="text-body-1 text-high-emphasis">{{ option }}</span>
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>

                    <!-- 多選 -->
                    <div v-if="currentQuestionData.type === 'multiple'">
                      <v-checkbox
                        v-for="(option, idx) in currentOptions"
                        :key="idx"
                        v-model="currentMultipleAnswer"
                        :value="idx"
                        @update:modelValue="saveAnswer"
                        class="mb-2 pa-2 border rounded option-item"
                        color="primary"
                        hide-details
                      >
                        <template v-slot:label>
                          <span class="font-weight-bold mr-3">{{ String.fromCharCode(65 + idx) }}.</span>
                          <span class="text-high-emphasis">{{ option }}</span>
                        </template>
                      </v-checkbox>
                    </div>
                  </div>
                </v-card-text>

                <v-divider></v-divider>

                <!-- 底部導航 -->
                <v-card-actions class="pa-4 bg-grey-lighten-5">
                  <v-btn 
                    variant="outlined" 
                    prepend-icon="mdi-arrow-left"
                    :disabled="currentQuestionIndex === 0"
                    @click="prevQuestion"
                  >
                    上一題
                  </v-btn>
                  
                  <v-spacer></v-spacer>
                  
                  <v-btn 
                    color="primary" 
                    variant="elevated" 
                    append-icon="mdi-arrow-right"
                    :disabled="currentQuestionIndex === totalQuestions - 1"
                    @click="nextQuestion"
                  >
                    下一題
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <!-- 右側：答題卡 (Desktop) -->
            <v-col cols="12" md="3" class="d-none d-md-flex flex-column h-100">
              <v-card class="h-100 d-flex flex-column rounded-lg">
                <v-card-title class="font-weight-bold d-flex align-center">
                  <v-icon left class="mr-2">mdi-apps</v-icon>
                  答題卡
                </v-card-title>
                <v-divider></v-divider>
                
                <v-card-text class="overflow-y-auto">
                  <div class="d-flex flex-wrap gap-2 justify-start">
                    <v-btn
                      v-for="(status, idx) in answerStatus"
                      :key="idx"
                      :color="getQuestionStatusColor(status, idx)"
                      :variant="getQuestionStatusVariant(idx)"
                      size="small"
                      class="question-grid-btn"
                      icon
                      @click="goToQuestion(idx)"
                    >
                      {{ idx + 1 }}
                    </v-btn>
                  </div>
                </v-card-text>
                
                <v-divider></v-divider>
                <v-card-text class="py-2 text-caption text-grey">
                  <div class="d-flex align-center mb-1">
                    <v-sheet width="12" height="12" color="primary" class="mr-2 rounded-circle"></v-sheet> 當前題目
                  </div>
                  <div class="d-flex align-center mb-1">
                    <v-sheet width="12" height="12" color="blue-lighten-4" class="mr-2 rounded-circle"></v-sheet> 已作答
                  </div>
                  <div class="d-flex align-center">
                    <v-sheet width="12" height="12" color="grey-lighten-3" class="mr-2 rounded-circle border"></v-sheet> 未作答
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- 交卷確認 Dialog -->
      <v-dialog v-model="showSubmitDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold pa-4 bg-primary text-white">
            確認交卷？
          </v-card-title>
          <v-card-text class="pa-4 pt-6">
            <div class="text-center mb-4">
              <v-progress-circular :model-value="completionRate" color="primary" size="80" width="8">
                {{ completionRate }}%
              </v-progress-circular>
            </div>
            <p class="text-body-1">
              您已完成 <strong>{{ answeredCount }}</strong> / {{ totalQuestions }} 題。
            </p>
            <p v-if="unansweredCount > 0" class="text-red font-weight-bold mt-2">
              還有 {{ unansweredCount }} 題未作答！
            </p>
            <p class="text-caption text-grey mt-4">
              交卷後將無法修改答案，並立即計算成績。
            </p>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="showSubmitDialog = false">再檢查一下</v-btn>
            <v-btn color="primary" variant="flat" @click="submitExam">確認交卷</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePracticeStore } from '@/stores/practice.store'
import { useQuestionStore } from '@/stores/question.store'
import { getSubjectById } from '@/data/subjects'

const router = useRouter()
const practiceStore = usePracticeStore()
const questionStore = useQuestionStore() // Needed for hydration checks if any

// 狀態
const isLoading = ref(true)
const showSubmitDialog = ref(false)
const timeLeft = ref(0) // 秒
const timerInterval = ref(null)

// 綁定當前題目的答案
const currentAnswer = ref(null)
const currentMultipleAnswer = ref([])

// 檢查是否為有效考試會話
const isValidSession = computed(() => {
  return practiceStore.currentSession && practiceStore.currentSession.mode === 'exam'
})

// 當前題目數據
const currentQuestionData = computed(() => practiceStore.currentQuestion)
const currentQuestionIndex = computed(() => practiceStore.currentSession?.currentQuestionIndex || 0)
const totalQuestions = computed(() => practiceStore.currentSession?.questions.length || 0)
const subjectId = computed(() => practiceStore.currentSession?.subjectId)

// 科目資訊
const subject = computed(() => getSubjectById(subjectId.value))
const subjectName = computed(() => subject.value?.name || '')
const subjectColor = computed(() => subject.value?.color || 'primary')

// 選項處理
const currentOptions = computed(() => {
  if (!currentQuestionData.value) return []
  // 判斷題特殊處理
  if (currentQuestionData.value.type === 'truefalse') return ['正確', '錯誤']
  return currentQuestionData.value.options
})

// 答題狀態追蹤 (Answer Sheet)
// 是一個 Array of booleans: true if answered
const answerStatus = computed(() => {
  if (!practiceStore.currentSession) return []
  return practiceStore.currentSession.questions.map(q => {
    const ans = practiceStore.currentSession.userAnswers[q.id]
    if (!ans) return false
    // 檢查是否有有效答案
    if (Array.isArray(ans.userAnswer)) return ans.userAnswer.length > 0
    return ans.userAnswer !== null && ans.userAnswer !== undefined
  })
})

const answeredCount = computed(() => answerStatus.value.filter(s => s).length)
const unansweredCount = computed(() => totalQuestions.value - answeredCount.value)
const completionRate = computed(() => Math.round((answeredCount.value / totalQuestions.value) * 100))

// 計時器邏輯
const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
})

const isTimeRunningOut = computed(() => timeLeft.value < 300) // 最後5分鐘

// 初始化
onMounted(async () => {
  // 如果沒有考試會話，導回首頁或練習設置頁
  if (!isValidSession.value) {
    alert('無效的考試會話，請重新開始。')
    router.replace({ name: 'home' })
    return
  }

  isLoading.value = false
  
  // 設定時間 (例如 60 分鐘)
  // TODO: 從 Store 或 Config 獲取時間設定
  timeLeft.value = 60 * 60 
  
  startTimer()
  
  // 同步當前題目的答案狀態
  syncCurrentAnswer()
})

onUnmounted(() => {
  stopTimer()
})

// 當題目切換時，同步答案
watch(currentQuestionIndex, () => {
  syncCurrentAnswer()
})

const syncCurrentAnswer = () => {
  if (!currentQuestionData.value) return
  
  const qId = currentQuestionData.value.id
  const saved = practiceStore.currentSession.userAnswers[qId]
  
  if (saved) {
    if (currentQuestionData.value.type === 'multiple') {
      currentMultipleAnswer.value = saved.userAnswer || []
    } else {
      currentAnswer.value = saved.userAnswer
    }
  } else {
    currentAnswer.value = null
    currentMultipleAnswer.value = []
  }
}

// 操作方法
const saveAnswer = async () => {
  if (!currentQuestionData.value) return
  
  let val = currentAnswer.value
  if (currentQuestionData.value.type === 'multiple') {
    val = currentMultipleAnswer.value
  }
  
  await practiceStore.submitAnswer(currentQuestionData.value.id, val)
}

const nextQuestion = () => {
  practiceStore.nextQuestion()
}

const prevQuestion = () => {
  practiceStore.previousQuestion()
}

const goToQuestion = (idx) => {
  practiceStore.goToQuestion(idx)
}

const confirmSubmit = () => {
  showSubmitDialog.value = true
}

const submitExam = async () => {
  showSubmitDialog.value = false
  stopTimer()
  
  try {
    const result = await practiceStore.endPracticeSession()
    // 導向結果頁面 (可以是目前的 SubjectPracticeView 的結果模式，或是新的 View)
    // 這裡我們暫時重用 SubjectPracticeView 的結果展示邏輯
    // 但因為路由參數問題，我們可能需要一個通用的 Result View
    // 或者我們修改 SubjectPracticeView 讓它能接受 "showResultOnly" 參數
    
    // 簡單解法：導回 subject-practice 並利用 Store 的歷史記錄顯示結果
    // 由於我們清除了 currentSession，SubjectPracticeView 會自動顯示 'showResult'
    router.replace({ 
      name: 'subject-practice', 
      params: { subjectId: result.subjectId } 
    })
    
  } catch (e) {
    console.error('交卷失敗:', e)
    alert('交卷失敗，請稍後再試')
  }
}

// 計時器
const startTimer = () => {
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      // 時間到，強制交卷
      stopTimer()
      alert('考試時間到！系統將自動交卷。')
      submitExam()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timerInterval.value) clearInterval(timerInterval.value)
}

// UI Helpers
const getQuestionTypeLabel = (type) => {
  const map = { single: '單選', multiple: '多選', truefalse: '判斷' }
  return map[type] || '問答'
}

const getOptionLabel = (type, idx) => {
  if (type === 'truefalse') return idx === 0 ? 'O' : 'X' // 假設 0=True, 1=False logic handled in template
  return String.fromCharCode(65 + idx) + '.'
}

const getOptionValue = (type, idx) => {
  if (type === 'truefalse') return idx === 0 ? true : false
  return idx
}

// 答題卡樣式
const getQuestionStatusColor = (isAnswered, idx) => {
  if (idx === currentQuestionIndex.value) return 'primary'
  if (isAnswered) return 'blue-lighten-4'
  return 'grey-lighten-3'
}

const getQuestionStatusVariant = (idx) => {
  if (idx === currentQuestionIndex.value) return 'elevated'
  return 'flat'
}

</script>

<style scoped>
.question-grid-btn {
  width: 36px;
  height: 36px;
  min-width: 36px;
}
.lh-relaxed {
  line-height: 1.6;
}
.option-item {
  cursor: pointer;
  transition: background-color 0.2s;
}
.option-item:hover {
  background-color: #f5f5f5;
}
</style>
