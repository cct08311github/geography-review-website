<template>
  <v-container>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6" color="primary" dark>
          <v-card-title class="text-h4 text-center">
            🎯 歡迎來到國中會考總複習系統！
          </v-card-title>
          <v-card-subtitle class="text-h6 text-center">
            專為國三學生設計的5大科目完整複習平台
          </v-card-subtitle>
          <v-card-text class="text-center">
            <p class="text-body-1">
              整合國文、英語、數學、自然、社會5大科目，提供模擬考試、智能錯題本、題目隨機化等完整複習功能！
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 5大科目選擇 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-book-multiple</v-icon>
            選擇學習科目
          </v-card-title>
          <v-card-subtitle class="mb-4">
            點擊科目卡片開始該科目的學習與練習
          </v-card-subtitle>
          
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
                    <strong>學習主題：</strong>
                    <div v-for="topic in subject.topics.slice(0, 3)" :key="topic.id" class="ml-2">
                      • {{ topic.name }}
                    </div>
                    <div v-if="subject.topics.length > 3" class="ml-2 text-caption">
                      等 {{ subject.topics.length }} 個主題
                    </div>
                  </div>
                  
                  <!-- 科目狀態標示 -->
                  <div class="mt-2">
                    <v-chip size="small" v-if="subject.code === 'social'" color="green" class="mr-1">
                      題庫完整
                    </v-chip>
                    <v-chip size="small" v-else color="orange" class="mr-1">
                      開發中
                    </v-chip>
                    <v-chip size="small" class="mr-1">
                      {{ getSubjectQuestionCount(subject.code) }} 題
                    </v-chip>
                  </div>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn :color="subject.color" block>
                    開始學習
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- 快速功能入口 -->
    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card class="pa-4" height="100%" color="green-lighten-5" hover @click="goToMockExam">
          <v-card-title class="text-h5">
            <v-icon color="green" class="mr-2">mdi-clipboard-check</v-icon>
            模擬會考
          </v-card-title>
          <v-card-text>
            <p>模擬正式會考環境：</p>
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
        <v-card class="pa-4" height="100%" color="blue-lighten-5" hover @click="goToNewPractice">
          <v-card-title class="text-h5">
            <v-icon color="blue" class="mr-2">mdi-notebook</v-icon>
            智能錯題本
          </v-card-title>
          <v-card-text>
            <p>針對性複習錯題：</p>
            <ul>
              <li>自動記錄答錯題目</li>
              <li>按科目分類管理</li>
              <li>隨機出題複習</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" block>
              查看錯題本
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="4">
        <v-card class="pa-4" height="100%" color="orange-lighten-5" hover @click="goToProgress">
          <v-card-title class="text-h5">
            <v-icon color="orange" class="mr-2">mdi-chart-line</v-icon>
            學習進度
          </v-card-title>
          <v-card-text>
            <p>追蹤學習成效：</p>
            <ul>
              <li>各科目完成度</li>
              <li>測驗成績分析</li>
              <li>個人化建議</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" block>
              查看進度
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 系統特色介紹 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4" color="purple-lighten-5">
          <v-card-title class="text-h5">
            <v-icon color="purple" class="mr-2">mdi-star</v-icon>
            ✨ 系統特色
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <div class="d-flex align-start mb-4">
                  <v-icon color="green" class="mr-3 mt-1">mdi-shuffle</v-icon>
                  <div>
                    <div class="text-h6">題目隨機化</div>
                    <div class="text-caption">每次練習題目和選項順序都不同，避免死記硬背，真正掌握知識點。</div>
                  </div>
                </div>
              </v-col>
              
              <v-col cols="12" md="6">
                <div class="d-flex align-start mb-4">
                  <v-icon color="blue" class="mr-3 mt-1">mdi-robot</v-icon>
                  <div>
                    <div class="text-h6">智能錯題分析</div>
                    <div class="text-caption">自動記錄錯題，分析弱點科目和主題，提供針對性複習建議。</div>
                  </div>
                </div>
              </v-col>
              
              <v-col cols="12" md="6">
                <div class="d-flex align-start mb-4">
                  <v-icon color="orange" class="mr-3 mt-1">mdi-timer</v-icon>
                  <div>
                    <div class="text-h6">模擬會考環境</div>
                    <div class="text-caption">正式考試題數與時間模擬，幫助適應考試節奏和壓力。</div>
                  </div>
                </div>
              </v-col>
              
              <v-col cols="12" md="6">
                <div class="d-flex align-start mb-4">
                  <v-icon color="red" class="mr-3 mt-1">mdi-chart-bar</v-icon>
                  <div>
                    <div class="text-h6">學習進度追蹤</div>
                    <div class="text-caption">詳細記錄各科目學習進度，提供個人化學習建議和目標設定。</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            <v-icon color="warning" class="mr-2">mdi-lightbulb-on</v-icon>
            學習小技巧
          </v-card-title>
          <v-card-text>
            <v-alert type="info" class="mb-4">
              <strong>📚 系統化複習：</strong> 使用總複習系統按科目、主題逐步複習，建立完整的知識體系！
            </v-alert>
            <v-alert type="success" class="mb-4">
              <strong>🎯 模擬會考訓練：</strong> 定期進行模擬考試，熟悉正式會考的題數、時間和壓力環境。
            </v-alert>
            <v-alert type="warning" class="mb-4">
              <strong>📊 智能錯題分析：</strong> 系統自動記錄錯題，分析弱點科目和主題，提供針對性複習建議。
            </v-alert>
            <v-alert type="info">
              <strong>🔄 題目隨機化：</strong> 每次練習題目和選項順序都不同，避免死記硬背，真正掌握知識點。
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/store/progress'
import { getAllSubjects } from '@/data/subjects'

const router = useRouter()
const progressStore = useProgressStore()

// 科目數據
const subjects = ref([])

// 初始化
onMounted(() => {
  subjects.value = getAllSubjects()
})

// 方法
const selectSubject = (subject) => {
  // 所有科目都跳轉到科目練習頁面
  router.push({
    name: 'subject-practice',
    params: { subjectId: subject.id }
  })
}

const goToMockExam = () => {
  router.push({ name: 'new-practice' })
}

const goToNewPractice = () => {
  router.push({ name: 'new-practice' })
}

const goToProgress = () => {
  router.push({ name: 'progress' })
}

// 獲取科目題目數量
const getSubjectQuestionCount = (subjectCode) => {
  switch (subjectCode) {
    case 'social':
      return '200+' // 地理題庫
    case 'chinese':
    case 'english':
    case 'math':
    case 'science':
      return '50+' // 其他科目基礎題庫
    default:
      return '20+'
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}
</style>