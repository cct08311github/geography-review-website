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
    <v-row class="mb-6">
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
                @click="startTopicPractice(topic)"
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
                @click="startComprehensiveTest"
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
            
            <!-- 地理專用功能（僅社會科顯示） -->
            <v-col cols="12" md="6" lg="4" v-if="subject.code === 'social'">
              <v-card 
                class="pa-4 h-100"
                color="blue-lighten-5"
                hover
                @click="goToGeographyFeatures"
              >
                <v-card-title class="text-h6">
                  <v-icon left color="blue">mdi-earth</v-icon>
                  地理專用功能
                </v-card-title>
                
                <v-card-subtitle class="mb-2">
                  台灣地理完整學習系統
                </v-card-subtitle>
                
                <v-card-text>
                  <div class="mb-2">
                    <v-chip size="small" color="blue" class="mr-1">200+題</v-chip>
                    <v-chip size="small" color="blue">10大主題</v-chip>
                  </div>
                  <p>訪問完整的地理學習中心、練習中心和進度追蹤</p>
                </v-card-text>
                
                <v-card-actions>
                  <v-btn color="blue" block>
                    進入地理系統
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
                @click="startQuickPractice"
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

    <!-- 科目學習建議 -->
    <v-row>
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
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goToNewPractice">
              <v-icon left>mdi-rocket</v-icon>
              進入總複習系統
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getSubjectById } from '@/data/subjects'

const props = defineProps({
  subjectId: {
    type: Number,
    required: true
  }
})

const router = useRouter()

// 計算屬性
const subject = computed(() => {
  return getSubjectById(props.subjectId)
})

const subjectName = computed(() => {
  return subject.value ? subject.value.name : '未知科目'
})

const subjectColor = computed(() => {
  return subject.value ? subject.value.color : '#9E9E9E'
})

const subjectIcon = computed(() => {
  return subject.value ? subject.value.icon : 'mdi-help-circle'
})

const subjectDescription = computed(() => {
  return subject.value ? subject.value.description : '科目描述'
})

const subjectTopics = computed(() => {
  return subject.value ? subject.value.topics : []
})

// 方法
const startTopicPractice = (topic) => {
  alert(`${subjectName.value} - ${topic.name} 練習功能開發中...`)
}

const startComprehensiveTest = () => {
  alert(`${subjectName.value} 綜合測驗功能開發中...`)
}

const startQuickPractice = () => {
  alert(`${subjectName.value} 快速練習功能開發中...`)
}

const goBack = () => {
  router.push({ name: 'home' })
}

const goToNewPractice = () => {
  router.push({ name: 'new-practice' })
}

const goToGeographyFeatures = () => {
  // 跳轉到地理學習頁面
  router.push({ name: 'study' })
}

const getStudyTips = () => {
  switch (subject.value?.code) {
    case 'chinese':
      return '注重字音字形、詞語成語的積累，多閱讀文言文和白話文，提高閱讀理解能力。'
    case 'english':
      return '加強單字記憶和文法練習，多聽英語對話，培養語感和聽力理解能力。'
    case 'math':
      return '掌握基本公式和定理，多做題目練習，培養邏輯思維和解題技巧。'
    case 'science':
      return '理解科學原理和概念，注重實驗操作和觀察，培養科學探究能力。'
    case 'social':
      return '掌握地理、歷史、公民的基本知識，注重時事分析和社會現象理解。'
    default:
      return '系統化學習，注重基礎知識的掌握和應用能力的培養。'
  }
}

const getExamStrategy = () => {
  switch (subject.value?.code) {
    case 'chinese':
      return '國文考試時間70分鐘，建議前45題用50分鐘，作文用20分鐘。'
    case 'english':
      return '英語考試時間60分鐘，聽力部分要專注，閱讀部分要快速瀏覽。'
    case 'math':
      return '數學考試時間80分鐘，先做會做的題目，難題留到最後。'
    case 'science':
      return '自然科考試時間70分鐘，注意圖表分析和實驗數據解讀。'
    case 'social':
      return '社會科考試時間70分鐘，地理、歷史、公民題目要均衡分配時間。'
    default:
      return '合理分配時間，先易後難，檢查答案時要仔細。'
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>