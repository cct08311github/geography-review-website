<template>
  <v-container class="pa-4">
    <!-- 科目標題 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card :color="subjectColor" dark class="pa-4 rounded-lg">
          <v-card-title class="text-h4 font-weight-bold">
            <v-icon large left>{{ subjectIcon }}</v-icon>
            {{ subjectName }} - 科目練習
          </v-card-title>
          <v-card-subtitle class="text-h6 mt-2">
            {{ subjectDescription }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 練習模式選擇 -->
    <v-row class="mb-6" v-if="!isPracticing && !showResult">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left :color="subjectColor">mdi-format-list-checks</v-icon>
            選擇練習模式
          </v-card-title>
          
          <v-row>
            <!-- 主題練習 -->
            <v-col cols="12" md="6" lg="4" v-for="topic in subjectTopics" :key="topic.id">
              <v-card 
                class="pa-4 h-100"
                :style="{ borderLeft: `4px solid ${subjectColor}` }"
                hover
                @click="startPractice('topic', topic.id)"
              >
                <v-card-title class="text-h6">
                  {{ topic.name }}
                </v-card-title>
                
                <v-card-subtitle class="mb-2">
                  {{ topic.description }}
                </v-card-subtitle>
                
                <v-card-text>
                  <div class="mb-2">
                    <v-chip size="small" class="mr-1">20-30題</v-chip>
                    <v-chip size="small">隨機出題</v-chip>
                  </div>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn :color="subjectColor" block>
                    開始練習
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            
            <!-- 綜合測驗 -->
            <v-col cols="12" md="6" lg="4">
              <v-card 
                class="pa-4 h-100"
                :style="{ borderLeft: `4px solid ${subjectColor}` }"
                color="green-lighten-5"
                hover
                @click="startPractice('comprehensive')"
              >
                <v-card-title class="text-h6">
                  <v-icon left color="green">mdi-clipboard-text</v-icon>
                  綜合測驗
                </v-card-title>
                
                <v-card-subtitle class="mb-2">
                  涵蓋所有主題的完整測驗
                </v-card-subtitle>
                
                <v-card-text>
                  <div class="mb-2">
                    <v-chip size="small" color="green" class="mr-1">50題</v-chip>
                    <v-chip size="small" color="green">60分鐘</v-chip>
                  </div>
                  <p>測試你對{{ subjectName }}科目的整體掌握程度</p>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn color="green" block>
                    開始測驗
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            
            <!-- 快速練習 -->
            <v-col cols="12" md="6" lg="4">
              <v-card 
                class="pa-4 h-100"
                :style="{ borderLeft: `4px solid ${subjectColor}` }"
                color="orange-lighten-5"
                hover
                @click="startPractice('quick')"
              >
                <v-card-title class="text-h6">
                  <v-icon left color="orange">mdi-lightning-bolt</v-icon>
                  快速練習
                </v-card-title>
                
                <v-card-subtitle class="mb-2">
                  10題隨機練習
                </v-card-subtitle>
                
                <v-card-text>
                  <div class="mb-2">
                    <v-chip size="small" color="orange" class="mr-1">10題</v-chip>
                    <v-chip size="small" color="orange">15分鐘</v-chip>
                  </div>
                  <p>適合碎片時間的快速練習</p>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn color="orange" block>
                    開始練習
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- 練習進行中 -->
    <v-row v-if="isPracticing && !showResult">
      <v-col cols="12">
        <v-card class="pa-4">
          <!-- 進度條 -->
          <v-progress-linear
            :model-value="practiceProgress"
            :color="subjectColor"
            height="20"
            rounded
            class="mb-4"
          >
            <template v-slot:default="{ value }">
              <div class="text-center text-white font-weight-bold">
                第 {{ currentQuestionIndex + 1 }} 題 / 共 {{ totalQuestions }} 題
              </div>
            </template>
          </v-progress-linear>

          <!-- 題目卡片 -->
          <v-card class="pa-6" v-if="currentQuestionData">
            <v-card-title class="text-h5 mb-4">
              <v-chip :color="subjectColor" class="mr-2">{{ getQuestionTypeLabel(currentQuestionData.type) }}</v-chip>
              <v-chip v-if="currentQuestionData.difficulty" :color="getDifficultyColor(currentQuestionData.difficulty)" size="small">
                {{ getDifficultyLabel(currentQuestionData.difficulty) }}
              </v-chip>
            </v-card-title>
            
            <v-card-text>
              <div class="text-h6 mb-6">
                {{ currentQuestionData.question }}
              </div>
              
              <!-- 單選題 -->
              <v-radio-group v-if="currentQuestionData.type === 'single'" v-model="selectedAnswer">
                <v-radio
                  v-for="(option, idx) in currentQuestionData.options"
                  :key="idx"
                  :label="`${String.fromCharCode(65 + idx)}. ${option}`"
                  :value="idx"
                  :color="subjectColor"
                  class="mb-2"
                ></v-radio>
              </v-radio-group>
              
              <!-- 判斷題 -->
              <v-radio-group v-if="currentQuestionData.type === 'truefalse'" v-model="selectedAnswer">
                <v-radio
                  label="正確 (True)"
                  :value="true"
                  :color="subjectColor"
                  class="mb-2"
                ></v-radio>
                <v-radio
                  label="錯誤 (False)"
                  :value="false"
                  :color="subjectColor"
                ></v-radio>
              </v-radio-group>
              
              <!-- 多選題 -->
              <v-checkbox
                v-if="currentQuestionData.type === 'multiple'"
                v-model="selectedMultipleAnswers"
                v-for="(option, idx) in currentQuestionData.options"
                :key="idx"
                :label="`${String.fromCharCode(65 + idx)}. ${option}`"
                :value="idx"
                :color="subjectColor"
                class="mb-1"
              ></v-checkbox>
            </v-card-text>
            
            <!-- 操作按鈕 -->
            <v-card-actions class="mt-4">
              <v-btn 
                v-if="!answerSubmitted" 
                :color="subjectColor" 
                size="large"
                :disabled="!canSubmit"
                @click="submitAnswer"
              >
                提交答案
              </v-btn>
              
              <v-btn 
                v-if="answerSubmitted && hasNextQuestion" 
                color="primary" 
                size="large"
                @click="nextQuestion"
              >
                下一題
              </v-btn>
              
              <v-spacer></v-spacer>
              
              <v-btn 
                color="error" 
                variant="text"
                @click="endPractice"
              >
                結束練習
              </v-btn>
            </v-card-actions>
            
            <!-- 答案解析 -->
            <v-expand-transition>
              <v-card-text v-if="answerSubmitted" class="mt-4 pa-4" color="grey-lighten-4">
                <v-alert
                  :type="lastResult?.isCorrect ? 'success' : 'error'"
                  class="mb-4"
                >
                  <div v-if="lastResult?.isCorrect" class="text-h6">✅ 回答正確！</div>
                  <div v-else class="text-h6">❌ 回答錯誤</div>
                </v-alert>
                
                <div class="text-body-1">
                  <strong>解析：</strong>
                </div>
                <div class="text-body-1 mt-2">
                  {{ currentQuestionData.explanation }}
                </div>
                
                <div v-if="!lastResult?.isCorrect" class="mt-4">
                  <div class="text-body-2">
                    <strong>正確答案：</strong>
                    <span v-if="currentQuestionData.type === 'single' || currentQuestionData.type === 'truefalse'">
                      {{ currentQuestionData.type === 'truefalse' 
                        ? (currentQuestionData.answer ? '正確' : '錯誤')
                        : String.fromCharCode(65 + currentQuestionData.answer) }}
                    </span>
                    <span v-else-if="currentQuestionData.type === 'multiple'">
                      {{ currentQuestionData.answer.map(i => String.fromCharCode(65 + i)).join(', ') }}
                    </span>
                  </div>
                </div>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <!-- 練習結果 -->
    <v-row v-if="showResult">
      <v-col cols="12" md="8" offset-md="2">
        <v-card class="pa-6 text-center">
          <v-card-title class="text-h4 mb-4">
            <v-icon size="48" :color="resultGrade.color" class="mr-4">{{ resultGrade.icon }}</v-icon>
            練習完成！
          </v-card-title>
          
          <v-card-text>
            <div class="text-h2 font-weight-bold" :color="resultGrade.color">
              {{ practiceResult?.score || 0 }}%
            </div>
            <div class="text-h6 mt-2">
              正確 {{ practiceResult?.correctAnswers || 0 }} 題 / 共 {{ practiceResult?.totalQuestions || 0 }} 題
            </div>
            
            <v-chip :color="resultGrade.color" size="large" class="mt-4">
              {{ resultGrade.label }}
            </v-chip>
            
            <v-divider class="my-6"></v-divider>
            
            <div class="d-flex justify-center gap-4 flex-wrap">
              <v-btn 
                color="primary" 
                size="large"
                @click="restartPractice"
              >
                <v-icon left>mdi-refresh</v-icon>
                再練習一次
              </v-btn>
              
              <v-btn 
                color="green" 
                size="large"
                @click="viewWrongQuestions"
                v-if="wrongQuestionCount > 0"
              >
                <v-icon left>mdi-notebook</v-icon>
                查看錯題 ({{ wrongQuestionCount }})
              </v-btn>
              
              <v-btn 
                color="orange" 
                size="large"
                @click="goBackToModeSelect"
              >
                <v-icon left>mdi-arrow-left</v-icon>
                返回選擇
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 科目學習建議 -->
    <v-row v-if="!isPracticing && !showResult">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left :color="subjectColor">mdi-lightbulb-on</v-icon>
            {{ subjectName }}學習建議
          </v-card-title>
          
          <v-card-text>
            <v-alert :color="subjectColor" variant="tonal" class="mb-4">
              <strong>📚 學習重點：</strong> {{ getStudyTips() }}
            </v-alert>
            
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>⏰ 時間分配：</strong> 建議每天花30分鐘專注練習{{ subjectName }}，效果比週末一次練習3小時更好！
            </v-alert>
            
            <v-alert type="success" variant="tonal" class="mb-4">
              <strong>📝 錯題管理：</strong> 系統會自動記錄你的錯題，定期複習錯題本是提高成績的關鍵！
            </v-alert>
            
            <v-alert type="warning" variant="tonal">
              <strong>🎯 考試策略：</strong> {{ getExamStrategy() }}
            </v-alert>
          </v-card-text>
          
          <v-card-actions>
            <v-btn :color="subjectColor" @click="goBack">
              <v-icon left>mdi-arrow-left</v-icon>
              返回科目選擇
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSubjectById } from '@/data/subjects'
import { usePracticeStore } from '@/stores/practice.store'
import { useQuestionStore } from '@/stores/question.store'
import { getGrade } from '@/utils/scoring-system'

const props = defineProps({
  subjectId: {
    type: Number,
    required: true
  }
})

const router = useRouter()
const practiceStore = usePracticeStore()
const questionStore = useQuestionStore()

// ============ 狀態 ============
const selectedAnswer = ref(null)
const selectedMultipleAnswers = ref([])
const answerSubmitted = ref(false)
const lastResult = ref(null)
const practiceMode = ref('quick')
const practiceTopicId = ref(null)

// ============ 計算屬性 ============
const subject = computed(() => {
  const subjectId = Number(props.subjectId)
  return getSubjectById(subjectId)
})

const subjectName = computed(() => subject.value?.name || '未知科目')
const subjectColor = computed(() => subject.value?.color || '#9E9E9E')
const subjectIcon = computed(() => subject.value?.icon || 'mdi-help-circle')
const subjectDescription = computed(() => subject.value?.description || '')
const subjectTopics = computed(() => subject.value?.topics || [])

// 練習狀態
const isPracticing = computed(() => !!practiceStore.currentSession)
const showResult = computed(() => practiceStore.currentSession === null && practiceStore.sessionHistory.length > 0)

const currentQuestionData = computed(() => {
  if (!practiceStore.currentSession) return null
  return practiceStore.currentQuestion
})

const currentQuestionIndex = computed(() => {
  if (!practiceStore.currentSession) return 0
  return practiceStore.currentSession.currentQuestionIndex
})

const totalQuestions = computed(() => {
  if (!practiceStore.currentSession) return 0
  return practiceStore.currentSession.questions.length
})

const practiceProgress = computed(() => practiceStore.progress)
const hasNextQuestion = computed(() => practiceStore.hasNextQuestion)

const practiceResult = computed(() => {
  if (!practiceStore.sessionHistory.length) return null
  return practiceStore.sessionHistory[0]
})

const resultGrade = computed(() => {
  if (!practiceResult.value) return { label: '', color: 'grey' }
  return getGrade(practiceResult.value.score)
})

const wrongQuestionCount = computed(() => {
  return practiceStore.getWrongQuestions(props.subjectId).length
})

const canSubmit = computed(() => {
  if (!currentQuestionData.value) return false
  if (currentQuestionData.value.type === 'multiple') {
    return selectedMultipleAnswers.value.length > 0
  }
  return selectedAnswer.value !== null
})

// ============ 方法 ============
const startPractice = async (mode, topicId = null) => {
  practiceMode.value = mode
  practiceTopicId.value = topicId
  
  let questionCount = 10
  let sessionMode = mode
  
  if (mode === 'comprehensive') {
    questionCount = 50 // 模擬考試題數較多
    sessionMode = 'exam' // 切換為考試模式
  }
  
  try {
    await practiceStore.startPracticeSession({
      subjectId: Number(props.subjectId),
      mode: sessionMode,
      topicId,
      questionCount
    })
    
    // 如果是考試模式，導向專屬考試介面
    if (sessionMode === 'exam') {
        router.push({ name: 'exam-taking' })
        return
    }
    
    // 一般練習模式，留在本頁
    resetAnswerState()
  } catch (error) {
    console.error('開始練習失敗:', error)
    alert('開始練習失敗: ' + error.message)
  }
}

const submitAnswer = async () => {
  if (!currentQuestionData.value || answerSubmitted.value) return
  
  let userAnswer = selectedAnswer.value
  if (currentQuestionData.value.type === 'multiple') {
    userAnswer = [...selectedMultipleAnswers.value]
  }
  
  try {
    const result = await practiceStore.submitAnswer(currentQuestionData.value.id, userAnswer)
    lastResult.value = result
    answerSubmitted.value = true
  } catch (error) {
    console.error('提交答案失敗:', error)
  }
}

const nextQuestion = () => {
  practiceStore.nextQuestion()
  resetAnswerState()
}

const endPractice = async () => {
  try {
    await practiceStore.endPracticeSession()
    resetAnswerState()
  } catch (error) {
    console.error('結束練習失敗:', error)
  }
}

const restartPractice = () => {
  startPractice(practiceMode.value, practiceTopicId.value)
}

const viewWrongQuestions = () => {
  router.push({ name: 'new-practice' })
}

const goBackToModeSelect = () => {
  // 重置狀態
  practiceStore.currentSession = null
  resetAnswerState()
}

const goBack = () => {
  router.push({ name: 'home' })
}

const resetAnswerState = () => {
  selectedAnswer.value = null
  selectedMultipleAnswers.value = []
  answerSubmitted.value = false
  lastResult.value = null
}

// ============ 輔助方法 ============
const getQuestionTypeLabel = (type) => {
  const labels = {
    single: '單選題',
    multiple: '多選題',
    truefalse: '判斷題',
    matching: '配對題'
  }
  return labels[type] || '練習題'
}

const getDifficultyLabel = (difficulty) => {
  const labels = { easy: '簡單', medium: '中等', hard: '困難' }
  return labels[difficulty] || ''
}

const getDifficultyColor = (difficulty) => {
  const colors = { easy: 'green', medium: 'orange', hard: 'red' }
  return colors[difficulty] || 'grey'
}

const getStudyTips = () => {
  switch (subject.value?.code) {
    case 'chinese': return '注重字音字形、詞語成語的積累，多閱讀文言文和白話文，提高閱讀理解能力。'
    case 'english': return '加強單字記憶和文法練習，多聽英語對話，培養語感和聽力理解能力。'
    case 'math': return '掌握基本公式和定理，多做題目練習，培養邏輯思維和解題技巧。'
    case 'science': return '理解科學原理和概念，注重實驗操作和觀察，培養科學探究能力。'
    case 'social': return '掌握地理、歷史、公民的基本知識，注重時事分析和社會現象理解。'
    default: return '系統化學習，注重基礎知識的掌握和應用能力的培養。'
  }
}

const getExamStrategy = () => {
  switch (subject.value?.code) {
    case 'chinese': return '國文考試時間70分鐘，建議前45題用50分鐘，作文用20分鐘。'
    case 'english': return '英語考試時間60分鐘，聽力部分要專注，閱讀部分要快速瀏覽。'
    case 'math': return '數學考試時間80分鐘，先做會做的題目，難題留到最後。'
    case 'science': return '自然科考試時間70分鐘，注意圖表分析和實驗數據解讀。'
    case 'social': return '社會科考試時間70分鐘，地理、歷史、公民題目要均衡分配時間。'
    default: return '合理分配時間，先易後難，檢查答案時要仔細。'
  }
}

// ============ 監聽 ============
watch(() => props.subjectId, () => {
  // 科目變化時重置
  goBackToModeSelect()
})
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}

.gap-4 {
  gap: 16px;
}
</style>
