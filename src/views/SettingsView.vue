<template>
  <v-container class="pa-4">
    <!-- 頁面標題 -->
    <v-row class="mb-4">
      <v-col cols="12">
        <v-card color="grey-darken-2" dark class="pa-4 rounded-lg">
          <v-card-title class="text-h4 font-weight-bold">
            <v-icon large left>mdi-cog</v-icon>
            設定
          </v-card-title>
          <v-card-subtitle class="text-h6 mt-2">
            個人化設定與應用程式選項
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- 個人設定 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-account-cog</v-icon>
            個人設定
          </v-card-title>
          
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              <v-list-item-title>使用者名稱</v-list-item-title>
              <v-list-item-subtitle>設定您的顯示名稱</v-list-item-subtitle>
              <template v-slot:append>
                <v-text-field
                  v-model="username"
                  placeholder="輸入使用者名稱"
                  density="compact"
                  hide-details
                  style="max-width: 200px;"
                ></v-text-field>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-school</v-icon>
              </template>
              <v-list-item-title>年級</v-list-item-title>
              <v-list-item-subtitle>選擇您的年級</v-list-item-subtitle>
              <template v-slot:append>
                <v-select
                  v-model="grade"
                  :items="gradeOptions"
                  density="compact"
                  hide-details
                  style="max-width: 150px;"
                ></v-select>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- 應用程式設定 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-application-cog</v-icon>
            應用程式設定
          </v-card-title>
          
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-theme-light-dark</v-icon>
              </template>
              <v-list-item-title>主題模式</v-list-item-title>
              <v-list-item-subtitle>選擇亮色或暗色主題</v-list-item-subtitle>
              <template v-slot:append>
                <v-switch
                  v-model="darkMode"
                  color="primary"
                  hide-details
                  :label="darkMode ? '暗色' : '亮色'"
                ></v-switch>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-volume-high</v-icon>
              </template>
              <v-list-item-title>音效</v-list-item-title>
              <v-list-item-subtitle>開啟或關閉音效</v-list-item-subtitle>
              <template v-slot:append>
                <v-switch
                  v-model="soundEnabled"
                  color="primary"
                  hide-details
                  :label="soundEnabled ? '開啟' : '關閉'"
                ></v-switch>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-bell</v-icon>
              </template>
              <v-list-item-title>學習提醒</v-list-item-title>
              <v-list-item-subtitle>每日學習提醒通知</v-list-item-subtitle>
              <template v-slot:append>
                <v-switch
                  v-model="notificationsEnabled"
                  color="primary"
                  hide-details
                  :label="notificationsEnabled ? '開啟' : '關閉'"
                ></v-switch>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-autorenew</v-icon>
              </template>
              <v-list-item-title>自動保存</v-list-item-title>
              <v-list-item-subtitle>自動保存學習進度</v-list-item-subtitle>
              <template v-slot:append>
                <v-switch
                  v-model="autoSave"
                  color="primary"
                  hide-details
                  :label="autoSave ? '開啟' : '關閉'"
                ></v-switch>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- 數據管理 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-database-cog</v-icon>
            數據管理
          </v-card-title>
          
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-download</v-icon>
              </template>
              <v-list-item-title>匯出學習數據</v-list-item-title>
              <v-list-item-subtitle>下載您的學習進度報告</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="exportData"
                  :disabled="!hasProgressData"
                >
                  匯出
                </v-btn>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-upload</v-icon>
              </template>
              <v-list-item-title>匯入學習數據</v-list-item-title>
              <v-list-item-subtitle>從檔案恢復學習進度</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  color="warning"
                  variant="outlined"
                  @click="importData"
                >
                  匯入
                </v-btn>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon color="error">mdi-delete</v-icon>
              </template>
              <v-list-item-title>重置學習進度</v-list-item-title>
              <v-list-item-subtitle>清除所有學習數據，重新開始</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  color="error"
                  variant="outlined"
                  @click="confirmReset"
                >
                  重置
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- 關於 -->
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            <v-icon left color="primary">mdi-information</v-icon>
            關於
          </v-card-title>
          
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-cellphone</v-icon>
              </template>
              <v-list-item-title>版本</v-list-item-title>
              <v-list-item-subtitle>應用程式版本資訊</v-list-item-subtitle>
              <template v-slot:append>
                <span class="text-body-2">v1.0.0</span>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-calendar</v-icon>
              </template>
              <v-list-item-title>最後更新</v-list-item-title>
              <v-list-item-subtitle>內容最後更新時間</v-list-item-subtitle>
              <template v-slot:append>
                <span class="text-body-2">2026年2月</span>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-book-open-page-variant</v-icon>
              </template>
              <v-list-item-title>內容來源</v-list-item-title>
              <v-list-item-subtitle>地理資料參考來源</v-list-item-subtitle>
              <template v-slot:append>
                <span class="text-body-2">近5年會考重點</span>
              </template>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-github</v-icon>
              </template>
              <v-list-item-title>開源專案</v-list-item-title>
              <v-list-item-subtitle>專案原始碼</v-list-item-subtitle>
              <template v-slot:append>
                <v-btn
                  color="secondary"
                  variant="text"
                  @click="openGitHub"
                >
                  查看原始碼
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- 重置確認對話框 -->
    <v-dialog v-model="resetDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">確認重置</v-card-title>
        <v-card-text>
          您確定要重置所有學習進度嗎？此操作將：
          <ul class="mt-2">
            <li>清除所有已完成的主題</li>
            <li>刪除所有測驗成績</li>
            <li>重置學習時間統計</li>
          </ul>
          <strong class="text-error">此操作無法復原！</strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="resetDialog = false">取消</v-btn>
          <v-btn color="error" @click="resetProgress">確認重置</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 成功提示 -->
    <v-snackbar v-model="showSuccess" color="success" timeout="3000">
      設定已保存！
    </v-snackbar>

    <!-- 錯誤提示 -->
    <v-snackbar v-model="showError" color="error" timeout="3000">
      操作失敗，請重試。
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProgressStore } from '@/store/progress'
import { useTheme } from 'vuetify'

const progressStore = useProgressStore()
const theme = useTheme()

// 設定狀態
const username = ref('')
const grade = ref('國三')
const darkMode = ref(false)
const soundEnabled = ref(true)
const notificationsEnabled = ref(true)
const autoSave = ref(true)

// 對話框狀態
const resetDialog = ref(false)

// 提示狀態
const showSuccess = ref(false)
const showError = ref(false)

// 年級選項
const gradeOptions = [
  '國一',
  '國二',
  '國三'
]

// 檢查是否有進度數據
const hasProgressData = computed(() => {
  return progressStore.progress.completedTopics.length > 0 || 
         Object.keys(progressStore.progress.quizScores).length > 0
})

// 載入保存的設定
onMounted(() => {
  loadSettings()
  
  // 監聽主題變化
  darkMode.value = theme.global.current.value.dark || false
})

// 監聽設定變化並保存
watch([username, grade, darkMode, soundEnabled, notificationsEnabled, autoSave], () => {
  saveSettings()
  updateTheme()
}, { deep: true })

// 載入設定
const loadSettings = () => {
  try {
    const saved = localStorage.getItem('geographySettings')
    if (saved) {
      const settings = JSON.parse(saved)
      username.value = settings.username || ''
      grade.value = settings.grade || '國三'
      darkMode.value = settings.darkMode || false
      soundEnabled.value = settings.soundEnabled !== false
      notificationsEnabled.value = settings.notificationsEnabled !== false
      autoSave.value = settings.autoSave !== false
    }
  } catch (error) {
    console.error('載入設定失敗:', error)
  }
}

// 保存設定
const saveSettings = () => {
  try {
    const settings = {
      username: username.value,
      grade: grade.value,
      darkMode: darkMode.value,
      soundEnabled: soundEnabled.value,
      notificationsEnabled: notificationsEnabled.value,
      autoSave: autoSave.value,
      savedAt: Date.now()
    }
    localStorage.setItem('geographySettings', JSON.stringify(settings))
    showSuccess.value = true
  } catch (error) {
    console.error('保存設定失敗:', error)
    showError.value = true
  }
}

// 更新主題
const updateTheme = () => {
  theme.global.name.value = darkMode.value ? 'dark' : 'light'
}

// 匯出數據
const exportData = () => {
  try {
    const progressData = localStorage.getItem('geographyProgress')
    const settingsData = localStorage.getItem('geographySettings')
    
    const exportData = {
      progress: progressData ? JSON.parse(progressData) : {},
      settings: settingsData ? JSON.parse(settingsData) : {},
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `地理學習數據_${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    showSuccess.value = true
  } catch (error) {
    console.error('匯出數據失敗:', error)
    showError.value = true
  }
}

// 匯入數據
const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        
        if (data.progress) {
          localStorage.setItem('geographyProgress', JSON.stringify(data.progress))
        }
        
        if (data.settings) {
          localStorage.setItem('geographySettings', JSON.stringify(data.settings))
          loadSettings() // 重新載入設定
        }
        
        showSuccess.value = true
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (error) {
        console.error('匯入數據失敗:', error)
        showError.value = true
      }
    }
    reader.readAsText(file)
  }
  
  input.click()
}

// 確認重置
const confirmReset = () => {
  resetDialog.value = true
}

// 重置進度
const resetProgress = () => {
  try {
    progressStore.resetProgress()
    resetDialog.value = false
    showSuccess.value = true
  } catch (error) {
    console.error('重置進度失敗:', error)
    showError.value = true
  }
}

// 打開GitHub
const openGitHub = () => {
  window.open('https://github.com/your-username/geography-review-website', '_blank')
}
</script>

<style scoped>
/* 響應式調整 */
@media (max-width: 600px) {
  .v-list-item {
    flex-wrap: wrap;
  }
  
  .v-list-item__append {
    width: 100%;
    margin-top: 8px;
  }
}

/* 改善觸控體驗 */
.v-switch {
  min-width: 60px;
}

.v-btn {
  min-height: 36px;
}
</style>