<template>
  <v-container class="pa-4">
    <!-- 標題與統計 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card color="red-lighten-5" class="pa-4 rounded-lg">
          <div class="d-flex align-center justify-space-between flex-wrap">
            <div>
              <v-card-title class="text-h4 font-weight-bold text-red-darken-2">
                <v-icon large left color="red-darken-2">mdi-notebook-edit</v-icon>
                錯題複習本
              </v-card-title>
              <v-card-subtitle class="text-h6 mt-1 text-red-darken-4">
                累積待複習：{{ filteredQuestions.length }} 題
              </v-card-subtitle>
            </div>
            
            <div class="d-flex align-center mt-2 mt-sm-0">
              <v-select
                v-model="selectedSubject"
                :items="subjectOptions"
                item-title="name"
                item-value="id"
                label="篩選科目"
                variant="outlined"
                density="compact"
                bg-color="white"
                hide-details
                class="mr-2"
                style="min-width: 150px"
              ></v-select>
              
              <v-btn 
                color="red-darken-2" 
                variant="flat" 
                @click="clearAll"
                :disabled="filteredQuestions.length === 0"
              >
                <v-icon left>mdi-delete-sweep</v-icon>
                清空全部
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- 載入中狀態 -->
    <v-row v-if="isLoading">
      <v-col cols="12" class="text-center pa-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <div class="mt-4 text-grey">正在載入錯題資料...</div>
      </v-col>
    </v-row>

    <!-- 空狀態 -->
    <v-row v-else-if="filteredQuestions.length === 0">
      <v-col cols="12">
        <v-card class="pa-12 text-center rounded-lg" variant="outlined" style="border: 2px dashed #ddd">
          <v-icon size="80" color="success" class="mb-4">mdi-check-circle-outline</v-icon>
          <h3 class="text-h5 text-grey-darken-2 font-weight-bold">太棒了！沒有待複習的錯題</h3>
          <p class="text-body-1 text-grey mt-2">
            {{ selectedSubject ? '此科目目前沒有錯題' : '繼續保持，去練習新的題目吧！' }}
          </p>
          <v-btn 
            color="primary" 
            size="large" 
            class="mt-6"
            @click="$router.push({ name: 'home' })"
          >
            返回首頁
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- 錯題列表 -->
    <v-row v-else>
      <v-col cols="12" v-for="item in filteredQuestions" :key="item.id">
        <v-card class="rounded-lg elevation-2 border-l-xl">
          <!-- 題目表頭 -->
          <v-card-item class="pb-0">
            <div class="d-flex align-center mb-2">
              <v-chip 
                :color="getSubjectColor(item.subjectId)" 
                size="small" 
                class="mr-2 font-weight-bold"
              >
                {{ getSubjectName(item.subjectId) }}
              </v-chip>
              
              <v-chip 
                color="red-lighten-4" 
                text-color="red-darken-2" 
                size="small" 
                class="mr-2"
              >
                錯誤 {{ item.count }} 次
              </v-chip>
              
              <v-spacer></v-spacer>
              
              <span class="text-caption text-grey">
                最後錯誤：{{ formatDate(item.lastWrong) }}
              </span>
            </div>
            
            <div class="text-h6 py-3 font-weight-medium">
              {{ item.question }}
            </div>
          </v-card-item>

          <!-- 展開解析區域 -->
          <v-expansion-panels variant="accordion" class="elevation-0">
            <v-expansion-panel>
              <v-expansion-panel-title collapse-icon="mdi-lightbulb-on">
                <span class="text-primary font-weight-bold">查看選項與解析</span>
              </v-expansion-panel-title>
              
              <v-expansion-panel-text>
                <v-list density="compact" class="bg-grey-lighten-5 rounded mb-4">
                  <v-list-item v-for="(opt, idx) in item.options" :key="idx">
                    <template v-slot:prepend>
                      <v-avatar size="24" color="grey-lighten-1" class="text-caption text-white mr-2">
                        {{ String.fromCharCode(65 + idx) }}
                      </v-avatar>
                    </template>
                    <v-list-item-title :class="{'text-green-darken-2 font-weight-bold': isCorrectAnswer(item, idx)}">
                      {{ opt }}
                      <v-icon v-if="isCorrectAnswer(item, idx)" color="green" size="small" class="ml-2">mdi-check-circle</v-icon>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-alert type="info" variant="tonal" class="mb-2" border="start">
                  <strong>💡 解析：</strong> {{ item.explanation || '暫無解析' }}
                </v-alert>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- 底部操作 -->
          <v-card-actions class="pa-4 pt-2">
            <v-spacer></v-spacer>
            <v-btn 
              color="success" 
              variant="elevated" 
              prepend-icon="mdi-check"
              @click="markAsMastered(item.id)"
            >
              我已掌握 (移除)
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePracticeStore } from '@/stores/practice.store'
import { useQuestionStore } from '@/stores/question.store'
import { getAllSubjects, getSubjectById } from '@/data/subjects'

const practiceStore = usePracticeStore()
const questionStore = useQuestionStore()

// 狀態
const selectedSubject = ref(null) // null = All
const isLoading = ref(true)

// 選項資料
const subjectOptions = computed(() => {
  const allOpt = { id: null, name: '全部科目' }
  const subjects = getAllSubjects().map(s => ({ id: s.id, name: s.name }))
  return [allOpt, ...subjects]
})

// 錯題數據
// 注意：practiceStore.getWrongQuestions 返回的是 hydrated data (包含題目內容)
// 我們需要確保 questionStore 已載入資料，否則 hydration 可能不完整
const wrongQuestions = computed(() => {
  return practiceStore.getWrongQuestions(selectedSubject.value)
})

const filteredQuestions = computed(() => {
  return wrongQuestions.value
})

// 初始化
onMounted(async () => {
  isLoading.value = true
  try {
    // 預先載入所有有錯題的科目資料，確保顯示正常
    // 1. 取得所有錯題的 subjectId
    const rawMap = practiceStore.wrongQuestions
    const subjectIds = new Set()
    rawMap.forEach(v => subjectIds.add(v.subjectId))
    
    // 2. 併發載入題庫
    const promises = Array.from(subjectIds).map(id => questionStore.loadQuestions(id))
    await Promise.all(promises)
  } catch (e) {
    console.error('載入錯題資料失敗:', e)
  } finally {
    isLoading.value = false
  }
})

// 輔助方法
const getSubjectName = (id) => {
  const s = getSubjectById(id)
  return s ? s.name : '未知'
}

const getSubjectColor = (id) => {
  const s = getSubjectById(id)
  return s ? s.color : 'grey'
}

const formatDate = (isoString) => {
  if (!isoString) return '-'
  return new Date(isoString).toLocaleString('zh-TW', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const isCorrectAnswer = (question, optionIndex) => {
  // 處理單選題
  if (question.type === 'single') {
    return question.answer === optionIndex
  }
  // 處理多選題 (answer 是陣列)
  if (question.type === 'multiple' && Array.isArray(question.answer)) {
    return question.answer.includes(optionIndex)
  }
  return false
}

// 操作
const markAsMastered = (id) => {
  if (confirm('確定已掌握此題？它將從錯題本中移除。')) {
    practiceStore.markQuestionMastered(id)
  }
}

const clearAll = () => {
  if (confirm('警告：確定要清空所有錯題記錄嗎？此操作無法復原。')) {
    practiceStore.clearWrongQuestions()
  }
}
</script>

<style scoped>
.border-l-xl {
  border-left: 6px solid #e0e0e0 !important;
}
</style>
