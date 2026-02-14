<template>
  <v-container>
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="10">
        <v-card class="pa-4">
          <v-card-title class="text-h4">
            <v-icon color="info" class="mr-2">mdi-chart-line</v-icon>
            進度報告 - 學習成果追蹤
          </v-card-title>
          <v-card-subtitle class="text-h6">
            即時追蹤你的學習進度與成果
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 主要進度指標 -->
    <v-row class="mb-6">
      <v-col cols="12" md="3">
        <v-card class="pa-4 text-center" color="primary-lighten-5">
          <v-icon size="48" color="primary" class="mb-3">mdi-progress-check</v-icon>
          <div class="text-h2">{{ progressStore.totalProgress }}%</div>
          <div class="text-subtitle-1">總學習進度</div>
          <v-progress-linear
            :model-value="progressStore.totalProgress"
            height="10"
            color="primary"
            class="mt-3"
          ></v-progress-linear>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4 text-center" color="success-lighten-5">
          <v-icon size="48" color="success" class="mb-3">mdi-check-circle</v-icon>
          <div class="text-h2">{{ completedTopicsCount }}</div>
          <div class="text-subtitle-1">已完成主題</div>
          <div class="text-caption mt-2">共10個主題</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4 text-center" color="warning-lighten-5">
          <v-icon size="48" color="warning" class="mb-3">mdi-star</v-icon>
          <div class="text-h2">{{ progressStore.averageScore }}%</div>
          <div class="text-subtitle-1">測驗平均分數</div>
          <div class="text-caption mt-2">基於 {{ quizCount }} 次測驗</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="3">
        <v-card class="pa-4 text-center" color="info-lighten-5">
          <v-icon size="48" color="info" class="mb-3">mdi-clock</v-icon>
          <div class="text-h2">{{ progressStore.formattedStudyTime }}</div>
          <div class="text-subtitle-1">總學習時間</div>
          <div class="text-caption mt-2">持續學習中</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 進度圖表 -->
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            <v-icon color="primary" class="mr-2">mdi-chart-areaspline</v-icon>
            學習進度趨勢
          </v-card-title>
          <v-card-text>
            <!-- 這裡可以放圖表組件 -->
            <div class="text-center py-8">
              <v-icon size="64" color="grey-lighten-2">mdi-chart-line</v-icon>
              <p class="text-body-1 mt-4">進度圖表將顯示你的學習趨勢</p>
              <p class="text-caption">（圖表功能開發中）</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            <v-icon color="success" class="mr-2">mdi-chart-pie</v-icon>
            主題完成分布
          </v-card-title>
          <v-card-text>
            <!-- 這裡可以放圓餅圖 -->
            <div class="text-center py-8">
              <v-icon size="64" color="grey-lighten-2">mdi-chart-pie</v-icon>
              <p class="text-body-1 mt-4">主題完成度分布圖</p>
              <p class="text-caption">（圖表功能開發中）</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 詳細進度報告 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            <v-icon color="warning" class="mr-2">mdi-file-document</v-icon>
            詳細進度報告
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>主題</th>
                  <th>完成狀態</th>
                  <th>最後學習時間</th>
                  <th>測驗分數</th>
                  <th>學習時間</th>
                  <th>建議</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="topic in detailedProgress" :key="topic.id">
                  <td>{{ topic.title }}</td>
                  <td>
                    <v-chip :color="topic.completed ? 'success' : 'default'" size="small">
                      {{ topic.completed ? '已完成' : '未開始' }}
                    </v-chip>
                  </td>
                  <td>{{ topic.lastStudy }}</td>
                  <td>
                    <v-chip :color="getScoreColor(topic.score)" size="small">
                      {{ topic.score }}%
                    </v-chip>
                  </td>
                  <td>{{ topic.studyTime }}</td>
                  <td>
                    <v-btn 
                      v-if="!topic.completed"
                      size="small"
                      color="primary"
                      @click="startStudy(topic.id)"
                    >
                      開始學習
                    </v-btn>
                    <v-btn 
                      v-else-if="topic.score < 70"
                      size="small"
                      color="warning"
                      @click="reviewTopic(topic.id)"
                    >
                      加強複習
                    </v-btn>
                    <v-chip v-else color="success" size="small">
                      已掌握
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 學習建議 -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5">
            <v-icon color="info" class="mr-2">mdi-lightbulb-on</v-icon>
            個人化學習建議
          </v-card-title>
          <v-card-text>
            <v-alert v-if="progressStore.totalProgress < 30" type="info">
              <strong>🎯 起步階段：</strong> 你剛剛開始學習，建議每天設定小目標，從基礎主題開始。
            </v-alert>
            
            <v-alert v-else-if="progressStore.totalProgress < 70" type="warning">
              <strong>📈 進步階段：</strong> 你已經完成 {{ progressStore.totalProgress }}% 的進度，繼續保持！建議加強練習測驗分數較低的主題。
            </v-alert>
            
            <v-alert v-else-if="progressStore.totalProgress < 100" type="success">
              <strong>🚀 衝刺階段：</strong> 太棒了！你已經完成 {{ progressStore.totalProgress }}% 的進度，即將完成所有學習。建議進行模擬考試，準備會考。
            </v-alert>
            
            <v-alert v-else type="success">
              <strong>🎉 完成階段：</strong> 恭喜你已經完成所有學習！現在可以進行總複習和模擬考試，為會考做最後準備。
            </v-alert>

            <div class="mt-4">
              <h4 class="text-h6 mb-2">具體建議：</h4>
              <ul>
                <li v-if="weakTopics.length > 0">
                  <strong>加強弱點：</strong> 建議優先複習 {{ weakTopics.join('、') }} 等主題
                </li>
                <li>
                  <strong>學習時間：</strong> 你已經學習 {{ progressStore.formattedStudyTime }}，建議每天保持30分鐘學習
                </li>
                <li>
                  <strong>測驗準備：</strong> 平均分數 {{ progressStore.averageScore }}%，目標提升到80%以上
                </li>
              </ul>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="generateReport">
              <v-icon class="mr-2">mdi-download</v-icon>
              下載進度報告
            </v-btn>
            <v-btn color="warning" @click="resetProgress" class="ml-2">
              <v-icon class="mr-2">mdi-refresh</v-icon>
              重置進度
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '@/store/progress'

const progressStore = useProgressStore()

// 已完成主題數量
const completedTopicsCount = computed(() => {
  return progressStore.progress.completedTopics.length
})

// 測驗次數
const quizCount = computed(() => {
  return Object.keys(progressStore.progress.quizScores).length
})

// 詳細進度報告
const detailedProgress = ref([
  { id: 1, title: '台灣地理位置與範圍', completed: true, lastStudy: '2026-02-13', score: 90, studyTime: '45分鐘' },
  { id: 2, title: '地形與地質', completed: true, lastStudy: '2026-02-12', score: 85, studyTime: '60分鐘' },
  { id: 3, title: '氣候與水文', completed: true, lastStudy: '2026-02-11', score: 75, studyTime: '50分鐘' },
  { id: 4, title: '人口與聚落', completed: true, lastStudy: '2026-02-10', score: 80, studyTime: '40分鐘' },
  { id: 5, title: '產業與經濟', completed: false, lastStudy: '-', score: 0, studyTime: '0分鐘' },
  { id: 6, title: '交通與運輸', completed: false, lastStudy: '-', score: 0, studyTime: '0分鐘' },
  { id: 7, title: '區域發展', completed: false, lastStudy: '-', score: 0, studyTime: '0分鐘' },
  { id: 8, title: '環境保護', completed: false, lastStudy: '-', score: 0, studyTime: '0分鐘' },
  { id: 9, title: '地圖判讀', completed: false, lastStudy: '-', score: 0, studyTime: '0分鐘' },
  { id: 10, title: '綜合應用', completed: false, lastStudy: '-', score: 0, studyTime: '0分鐘' }
])

// 弱點主題（分數低於70%）
const weakTopics = computed(() => {
  return detailedProgress.value
    .filter(topic => topic.completed && topic.score < 70)
    .map(topic => topic.title)
})

// 根據分數獲取顏色
const getScoreColor = (score) => {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'error'
}

// 開始學習
const startStudy = (topicId) => {
  const topic = detailedProgress.value.find(t => t.id === topicId)
  if (topic) {
    alert(`開始學習「${topic.title}」主題！`)
  }
}

// 複習主題
const reviewTopic = (topicId) => {
  const topic = detailedProgress.value.find(t => t.id === topicId)
  if (topic) {
    alert(`開始複習「${topic.title}」主題！`)
  }
}

// 生成報告
const generateReport = () => {
  alert('進度報告已生成！')
  // 這裡可以實現生成和下載報告的邏輯
}

// 重置進度
const resetProgress = () => {
  if (confirm('確定要重置所有學習進度嗎？此操作無法復原。')) {
    progressStore.resetProgress()
    alert('進度已重置！')
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