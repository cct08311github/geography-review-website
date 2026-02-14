<template>
  <v-container class="pa-4">
    <!-- 頁面標題 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card color="blue-darken-2" dark class="pa-4 rounded-lg">
          <v-card-title class="text-h4 font-weight-bold">
            <v-icon large left>mdi-book-open-page-variant</v-icon>
            學習中心
          </v-card-title>
          <v-card-subtitle class="text-h6 mt-2">
            台灣地理會考重點整理 - 近5年考試重點精選
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 主題選擇 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-format-list-bulleted</v-icon>
            選擇學習主題
          </v-card-title>
          
          <v-tabs v-model="activeTab" color="primary" grow>
            <v-tab v-for="topic in topics" :key="topic.id" :value="topic.id">
              <v-badge
                :content="topic.lastTested.length"
                color="red"
                v-if="topic.lastTested.length > 0"
              >
                {{ topic.emoji }} {{ topic.title }}
              </v-badge>
              <span v-else>{{ topic.emoji }} {{ topic.title }}</span>
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <!-- 主題內容 -->
    <v-row>
      <v-col cols="12">
        <v-window v-model="activeTab">
          <v-window-item v-for="topic in topics" :key="topic.id" :value="topic.id">
            <v-card class="pa-4 mb-4">
              <!-- 主題標題與資訊 -->
              <v-card-title class="text-h5 mb-2">
                {{ topic.emoji }} {{ topic.title }}
              </v-card-title>
              
              <v-card-subtitle class="mb-4">
                <v-chip color="primary" variant="outlined" class="mr-2">
                  <v-icon left small>mdi-calendar</v-icon>
                  近5年考過 {{ topic.lastTested.length }} 次
                </v-chip>
                <v-chip :color="getImportanceColor(topic.importance)" variant="outlined" class="mr-2">
                  <v-icon left small>mdi-flag</v-icon>
                  重要性：{{ '★'.repeat(topic.importance) }}
                </v-chip>
                <v-chip :color="topicCompleted(topic.id) ? 'success' : 'grey'" variant="outlined">
                  <v-icon left small>{{ topicCompleted(topic.id) ? 'mdi-check-circle' : 'mdi-circle-outline' }}</v-icon>
                  {{ topicCompleted(topic.id) ? '已完成' : '未學習' }}
                </v-chip>
              </v-card-subtitle>

              <!-- 考試提示 -->
              <v-alert type="info" variant="tonal" class="mb-4">
                <v-alert-title>會考提示</v-alert-title>
                <ul class="mt-2">
                  <li v-for="(tip, index) in topic.examTips" :key="index">{{ tip }}</li>
                </ul>
              </v-alert>

              <!-- 章節內容 -->
              <div v-for="section in topic.sections" :key="section.id" class="mb-6">
                <v-divider class="my-4"></v-divider>
                
                <h3 class="text-h6 mb-2">{{ section.title }}</h3>
                
                <v-card variant="outlined" class="pa-4 mb-2">
                  <div class="markdown-content" v-html="formatContent(section.content)"></div>
                  
                  <!-- 關鍵字 -->
                  <div class="mt-4">
                    <v-chip v-for="keyword in section.keywords" :key="keyword" size="small" class="mr-1 mb-1">
                      {{ keyword }}
                    </v-chip>
                  </div>
                </v-card>

                <!-- 學習進度按鈕 -->
                <div class="text-right">
                  <v-btn 
                    :color="sectionCompleted(section.id) ? 'success' : 'primary'" 
                    @click="toggleSectionComplete(section.id, topic.id)"
                    size="small"
                  >
                    <v-icon left>{{ sectionCompleted(section.id) ? 'mdi-check' : 'mdi-bookmark' }}</v-icon>
                    {{ sectionCompleted(section.id) ? '已學習' : '標記為已學習' }}
                  </v-btn>
                </div>
              </div>

              <!-- 主題完成按鈕 -->
              <v-card-actions class="mt-6">
                <v-btn 
                  :color="topicCompleted(topic.id) ? 'success' : 'primary'" 
                  @click="toggleTopicComplete(topic.id)"
                  size="large"
                  block
                >
                  <v-icon left>{{ topicCompleted(topic.id) ? 'mdi-check-circle' : 'mdi-check-circle-outline' }}</v-icon>
                  {{ topicCompleted(topic.id) ? '已完成此主題' : '完成此主題學習' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>

    <!-- 學習工具 -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="pa-4" color="blue-lighten-5">
          <v-card-title class="text-h6">
            <v-icon left color="blue">mdi-timer</v-icon>
            學習計時器
          </v-card-title>
          <v-card-text>
            <div class="text-center">
              <div class="text-h3 font-weight-bold">{{ formatTime(studyTimer) }}</div>
              <div class="text-caption mt-2">本次學習時間</div>
            </div>
            
            <div class="text-center mt-4">
              <v-btn color="blue" @click="startTimer" :disabled="timerRunning" class="mr-2">
                <v-icon left>mdi-play</v-icon>
                開始
              </v-btn>
              <v-btn color="red" @click="stopTimer" :disabled="!timerRunning" class="mr-2">
                <v-icon left>mdi-stop</v-icon>
                停止
              </v-btn>
              <v-btn color="grey" @click="resetTimer">
                <v-icon left>mdi-refresh</v-icon>
                重置
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card class="pa-4" color="green-lighten-5">
          <v-card-title class="text-h6">
            <v-icon left color="green">mdi-chart-line</v-icon>
            學習進度
          </v-card-title>
          <v-card-text>
            <v-progress-linear
              :model-value="completionPercentage"
              height="20"
              color="green"
              rounded
              class="mb-2"
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.round(value) }}%</strong>
              </template>
            </v-progress-linear>
            <div class="text-caption">已完成 {{ completedSectionsCount }} / {{ totalSectionsCount }} 個章節</div>
            
            <div class="mt-4">
              <v-btn color="green" @click="$router.push({ name: 'practice', query: { topic: activeTab } })" block>
                <v-icon left>mdi-check-circle</v-icon>
                進行主題測驗
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useProgressStore } from '@/store/progress'
import { taiwanGeographyTopics, totalTopics } from '@/data/taiwan-geography'

const progressStore = useProgressStore()

// 狀態
const activeTab = ref(1) // 預設第一個主題
const studyTimer = ref(0) // 秒數
const timerRunning = ref(false)
let timerInterval = null

// 主題資料
const topics = ref(taiwanGeographyTopics)

// 計算屬性
const completedSectionsCount = computed(() => {
  // 這裡可以根據實際記錄的章節完成情況計算
  return progressStore.progress.completedTopics.length * 3 // 假設每個主題有3個章節
})

const totalSectionsCount = computed(() => {
  return totalTopics * 3 // 每個主題有3個章節
})

const completionPercentage = computed(() => {
  return (completedSectionsCount.value / totalSectionsCount.value) * 100
})

// 檢查主題是否完成
const topicCompleted = (topicId) => {
  return progressStore.progress.completedTopics.includes(topicId)
}

// 檢查章節是否完成（簡化版本）
const sectionCompleted = (sectionId) => {
  // 這裡可以實現更詳細的章節追蹤
  // 目前簡化為如果主題完成，則所有章節都完成
  const topicId = parseInt(sectionId.split('-')[0])
  return topicCompleted(topicId)
}

// 格式化內容（簡單的markdown處理）
const formatContent = (content) => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
    .replace(/- \*\*(.*?)\*\*/g, '<li><strong>$1</strong></li>')
    .replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>')
    .replace(/\d+\.\s+\*\*(.*?)\*\*/g, '<li><strong>$1</strong></li>')
    .replace(/\d+\.\s+(.*?)(?=\n|$)/g, '<li>$1</li>')
}

// 獲取重要性顏色
const getImportanceColor = (importance) => {
  const colors = ['grey', 'green', 'blue', 'orange', 'red']
  return colors[importance - 1] || 'grey'
}

// 計時器功能
const startTimer = () => {
  if (!timerRunning.value) {
    timerRunning.value = true
    timerInterval = setInterval(() => {
      studyTimer.value++
    }, 1000)
  }
}

const stopTimer = () => {
  if (timerRunning.value) {
    timerRunning.value = false
    clearInterval(timerInterval)
    
    // 保存學習時間（分鐘）
    const minutes = Math.floor(studyTimer.value / 60)
    if (minutes > 0) {
      progressStore.addStudyTime(minutes)
    }
  }
}

const resetTimer = () => {
  studyTimer.value = 0
  if (timerRunning.value) {
    clearInterval(timerInterval)
    timerRunning.value = false
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 標記主題完成
const toggleTopicComplete = (topicId) => {
  if (topicCompleted(topicId)) {
    // 如果已經完成，可以考慮移除
    // 但為了簡單起見，我們保留完成狀態
  } else {
    progressStore.completeTopic(topicId)
  }
}

// 標記章節完成
const toggleSectionComplete = (sectionId, topicId) => {
  // 簡化：標記章節完成時，如果所有章節都完成，則自動完成主題
  if (!topicCompleted(topicId)) {
    progressStore.completeTopic(topicId)
  }
}

// 檢查URL參數
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const topicParam = urlParams.get('topic')
  if (topicParam && !isNaN(topicParam)) {
    const topicId = parseInt(topicParam)
    if (topics.value.some(t => t.id === topicId)) {
      activeTab.value = topicId
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
.markdown-content {
  line-height: 1.6;
}

.markdown-content ul {
  padding-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.markdown-content li {
  margin-bottom: 4px;
}
</style>