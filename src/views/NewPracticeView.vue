<template>
  <v-container class="pa-4">
    <!-- 頁面標題 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card color="primary" dark class="pa-4 rounded-lg">
          <v-card-title class="text-h4 font-weight-bold">
            <v-icon large left>mdi-school</v-icon>
            國中會考複習系統
          </v-card-title>
          <v-card-subtitle class="text-h6 mt-2">
            5大科目完整題庫 + 模擬考試 + 錯題本功能
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 功能導航 -->
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card class="pa-4 h-100" color="green-lighten-5" hover @click="goToMockExam">
          <v-card-title class="text-h5">
            <v-icon large color="green" left>mdi-clipboard-check</v-icon>
            模擬考試
          </v-card-title>
          <v-card-text>
            <p>模擬正式會考環境，包含：</p>
            <ul>
              <li>正式考試題數與時間</li>
              <li>5大科目完整測驗</li>
              <li>自動評分與分析</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="green" block>
              開始模擬考
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card class="pa-4 h-100" color="blue-lighten-5" hover @click="goToSubjectPractice">
          <v-card-title class="text-h5">
            <v-icon large color="blue" left>mdi-book-open-page-variant</v-icon>
            科目練習
          </v-card-title>
          <v-card-text>
            <p>按科目分類練習：</p>
            <ul>
              <li>國文、英語、數學</li>
              <li>自然、社會</li>
              <li>每個主題20-30題</li>
              <li>題目隨機變化</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" block>
              選擇科目
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card class="pa-4 h-100" color="orange-lighten-5" hover @click="goToWrongAnswerReview">
          <v-card-title class="text-h5">
            <v-icon large color="orange" left>mdi-notebook</v-icon>
            錯題本
          </v-card-title>
          <v-card-text>
            <p>針對錯題加強複習：</p>
            <ul>
              <li>記錄所有答錯題目</li>
              <li>隨機出題複習</li>
              <li>錯題分類管理</li>
              <li>掌握程度追蹤</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" block>
              查看錯題本
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 科目選擇 -->
    <v-row v-if="showSubjectSelection">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-book-multiple</v-icon>
            選擇科目
          </v-card-title>
          
          <v-row>
            <v-col
              v-for="subject in subjects"
              :key="subject.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card 
                class="pa-4 h-100"
                :style="{ borderLeft: `4px solid ${subject.color}` }"
                hover
                @click="selectSubject(subject)"
              >
                <v-card-title class="text-h6">
                  <v-icon :color="subject.color" left>{{ subject.icon }}</v-icon>
                  {{ subject.name }}
                </v-card-title>
                
                <v-card-subtitle class="mb-2">
                  {{ subject.description }}
                </v-card-subtitle>
                
                <v-card-text>
                  <div class="mb-2">
                    <strong>主題：</strong>
                    <div v-for="topic in subject.topics" :key="topic.id" class="ml-2">
                      • {{ topic.name }}
                    </div>
                  </div>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn :color="subject.color" block>
                    開始練習
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- 模擬考試選擇 -->
    <v-row v-if="showMockExamSelection">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="green">mdi-clipboard-text</v-icon>
            模擬考試模式
          </v-card-title>
          
          <v-row>
            <v-col cols="12" md="4">
              <v-card 
                class="pa-4 h-100"
                color="green-lighten-5"
                hover
                @click="startFormalExam"
              >
                <v-card-title class="text-h6">
                  <v-icon color="green" left>mdi-timer</v-icon>
                  正式模擬考
                </v-card-title>
                
                <v-card-text>
                  <p>完全模擬正式會考：</p>
                  <ul>
                    <li>正式題數與時間</li>
                    <li>嚴格時間限制</li>
                    <li>完整評分系統</li>
                  </ul>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn color="green" block>
                    開始考試
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card 
                class="pa-4 h-100"
                color="blue-lighten-5"
                hover
                @click="startPracticeExam"
              >
                <v-card-title class="text-h6">
                  <v-icon color="blue" left>mdi-school</v-icon>
                  練習模擬考
                </v-card-title>
                
                <v-card-text>
                  <p>適合日常練習：</p>
                  <ul>
                    <li>題數減半</li>
                    <li>時間較寬鬆</li>
                    <li>即時解答</li>
                  </ul>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn color="blue" block>
                    開始練習
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            
            <v-col cols="12" md="4">
              <v-card 
                class="pa-4 h-100"
                color="orange-lighten-5"
                hover
                @click="startQuickExam"
              >
                <v-card-title class="text-h6">
                  <v-icon color="orange" left>mdi-lightning-bolt</v-icon>
                  快速測驗
                </v-card-title>
                
                <v-card-text>
                  <p>10題快速測驗：</p>
                  <ul>
                    <li>10題隨機出題</li>
                    <li>15-20分鐘完成</li>
                    <li>適合碎片時間</li>
                  </ul>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn color="orange" block>
                    開始測驗
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- 錯題本 -->
    <v-row v-if="showWrongAnswerReview">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="orange">mdi-notebook-edit</v-icon>
            錯題本
          </v-card-title>
          
          <!-- 統計信息 -->
          <v-card class="pa-4 mb-4" color="orange-lighten-5">
            <v-row>
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ stats.total }}</div>
                  <div class="text-caption">總錯題數</div>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ stats.needReview }}</div>
                  <div class="text-caption">待複習</div>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ stats.mastered }}</div>
                  <div class="text-caption">已掌握</div>
                </div>
              </v-col>
              <v-col cols="6" md="3">
                <div class="text-center">
                  <div class="text-h4 font-weight-bold">{{ Object.keys(stats.bySubject).length }}</div>
                  <div class="text-caption">涉及科目</div>
                </div>
              </v-col>
            </v-row>
          </v-card>
          
          <!-- 錯題列表 -->
          <div v-if="wrongAnswers.length > 0">
            <h3 class="text-h6 mb-3">錯題列表</h3>
            
            <v-expansion-panels class="mb-4">
              <v-expansion-panel
                v-for="(item, index) in wrongAnswers"
                :key="index"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center">
                    <v-chip size="small" :color="getSubjectColor(item.subject)" class="mr-2">
                      {{ getSubjectName(item.subject) }}
                    </v-chip>
                    <span>{{ item.question.question.substring(0, 50) }}...</span>
                    <v-spacer></v-spacer>
                    <v-chip size="small" :color="item.mastered ? 'green' : 'orange'" class="mr-2">
                      {{ item.mastered ? '已掌握' : '待複習' }}
                    </v-chip>
                    <v-chip size="small">
                      複習 {{ item.reviewCount || 0 }} 次
                    </v-chip>
                  </div>
                </v-expansion-panel-title>
                
                <v-expansion-panel-text>
                  <div class="mb-2">
                    <strong>題目：</strong>{{ item.question.question }}
                  </div>
                  <div class="mb-2">
                    <strong>你的答案：</strong>{{ formatAnswer(item.userAnswer, item.question) }}
                  </div>
                  <div class="mb-2">
                    <strong>正確答案：</strong>{{ formatAnswer(item.correctAnswer, item.question) }}
                  </div>
                  <div v-if="item.question.explanation" class="mb-2">
                    <strong>解析：</strong>{{ item.question.explanation }}
                  </div>
                  
                  <v-card-actions class="mt-2">
                    <v-btn color="primary" size="small" @click="reviewWrongAnswer(item)">
                      <v-icon left small>mdi-refresh</v-icon>
                      複習此題
                    </v-btn>
                    <v-btn 
                      color="green" 
                      size="small" 
                      @click="markAsMastered(item)"
                      v-if="!item.mastered"
                    >
                      <v-icon left small>mdi-check</v-icon>
                      標記為已掌握
                    </v-btn>
                    <v-btn 
                      color="red" 
                      size="small" 
                      @click="removeWrongAnswer(item)"
                    >
                      <v-icon left small>mdi-delete</v-icon>
                      刪除
                    </v-btn>
                  </v-card-actions>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            
            <!-- 複習功能 -->
            <v-card class="pa-4 mb-4">
              <v-card-title class="text-h6">
                錯題複習
              </v-card-title>
              
              <v-row>
                <v-col cols="12" md="6">
                  <v-card class="pa-4" color="blue-lighten-5">
                    <v-card-title class="text-h6">
                      隨機出題複習
                    </v-card-title>
                    <v-card-text>
                      從錯題本中隨機抽取10題進行複習
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="blue" block @click="startRandomReview(10)">
                        開始10題複習
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-card class="pa-4" color="green-lighten-5">
                    <v-card-title class="text-h6">
                      按科目複習
                    </v-card-title>
                    <v-card-text>
                      選擇特定科目進行錯題複習
                    </v-card-text>
                    <v-card-actions>
                      <v-select
                        v-model="selectedReviewSubject"
                        :items="availableSubjects"
                        label="選擇科目"
                        dense
                        class="mb-2"
                      ></v-select>
                      <v-btn color="green" block @click="startSubjectReview">
                        開始科目複習
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </div>
          
          <div v-else class="text-center pa-8">
            <v-icon size="64" color="grey" class="mb-4">mdi-notebook-outline</v-icon>
            <h3 class="text-h5 mb-2">還沒有錯題記錄</h3>
            <p class="text-body-1 mb-4">開始練習後，答錯的題目會自動記錄在這裡</p>
            <v-btn color="primary" @click="goToSubjectPractice">
              開始練習
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAllSubjects } from '@/data/subjects'
import { examManager } from '@/data/question-manager'

const router = useRouter()

// 狀態
const showSubjectSelection = ref(false)
const showMockExamSelection = ref(false)
const showWrongAnswerReview = ref(false)
const selectedReviewSubject = ref(null)

// 數據
const subjects = ref(getAllSubjects())

// 計算屬性
const wrongAnswers = computed(() => {
  return examManager.getWrongAnswers()
})

const stats = computed(() => {
  return examManager.getWrongAnswerStats()
})

const availableSubjects = computed(() => {
  const subjectSet = new Set()
  wrongAnswers.value.forEach(item => {
    if (item.subject) {
      subjectSet.add(item.subject)
    }
  })
  return Array.from(subjectSet).map(code => ({
    title: getSubjectName(code),
    value: code
  }))
})

// 方法
const goToMockExam = () => {
  showSubjectSelection.value = false
  showMockExamSelection.value = true
  showWrongAnswerReview.value = false
}

const goToSubjectPractice = () => {
  showSubjectSelection.value = true
  showMockExamSelection.value = false
  showWrongAnswerReview.value = false
}

const goToWrongAnswerReview = () => {
  showSubjectSelection.value = false
  showMockExamSelection.value = false
  showWrongAnswerReview.value = true
}

const selectSubject = (subject) => {
  // 跳轉到科目練習頁面
  router.push({
    name: 'subject-practice',
    params: { subjectId: subject.id }
  })
}

const startFormalExam = () => {
  // 開始正式模擬考
  alert('正式模擬考功能開發中...')
}

const startPracticeExam = () => {
  // 開始練習模擬考
  alert('練習模擬考功能開發中...')
}

const startQuickExam = () => {
  // 開始快速測驗
  const exam = examManager.startWrongAnswerReview(10)
  if (exam.questions.length > 0) {
    router.push({
      name: 'exam-taking',
      state: { exam }
    })
  } else {
    alert('目前沒有足夠的錯題進行複習，請先進行練習。')
  }
}

const getSubjectName = (subjectCode) => {
  const subject = subjects.value.find(s => s.code === subjectCode)
  return subject ? subject.name : subjectCode
}

const getSubjectColor = (subjectCode) => {
  const subject = subjects.value.find(s => s.code === subjectCode)
  return subject ? subject.color : '#9E9E9E'
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
      if (Array.isArray(answer)) {
        if (answer.length > 0 && Array.isArray(answer[0])) {
          // correctPairs 格式
          return answer.map(([leftIndex, rightIndex]) => {
            const leftItem = question.leftItems[leftIndex] || `項目${leftIndex}`
            const rightItem = question.rightItems[rightIndex] || `選項${rightIndex}`
            return `${leftItem} → ${rightItem}`
          }).join('; ')
        } else {
          // 用戶答案格式
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

const reviewWrongAnswer = (item) => {
  // 單題複習
  const exam = {
    mode: 'review',
    subject: item.subject,
    topic: item.topic,
    questions: [item.question],
    questionCount: 1,
    timeLimit: null,
    startTime: new Date(),
    userAnswers: [null],
    completed: false
  }
  
  router.push({
    name: 'exam-taking',
    state: { exam }
  })
}

const startRandomReview = (count) => {
  const exam = examManager.startWrongAnswerReview(count)
  if (exam.questions.length > 0) {
    router.push({
      name: 'exam-taking',
      state: { exam }
    })
  } else {
    alert('目前沒有足夠的錯題進行複習，請先進行練習。')
  }
}

const startSubjectReview = () => {
  if (!selectedReviewSubject.value) {
    alert('請選擇科目')
    return
  }
  
  const exam = examManager.startWrongAnswerReview(10, selectedReviewSubject.value)
  if (exam.questions.length > 0) {
    router.push({
      name: 'exam-taking',
      state: { exam }
    })
  } else {
    alert(`目前沒有${getSubjectName(selectedReviewSubject.value)}科目的錯題。`)
  }
}

const markAsMastered = (item) => {
  examManager.markWrongAnswerAsMastered(item.subject, item.topic, item.question.id)
}

const removeWrongAnswer = (item) => {
  if (confirm('確定要刪除這道錯題嗎？')) {
    examManager.removeWrongAnswer(item.subject, item.topic, item.question.id)
  }
}

// 初始化
onMounted(() => {
  // 默認顯示科目選擇
  showSubjectSelection.value = true
})
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>