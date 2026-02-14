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

    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card class="pa-4" height="100%">
          <v-card-title class="text-h5">
            <v-icon color="primary" class="mr-2">mdi-book-open-page-variant</v-icon>
            學習中心
          </v-card-title>
          <v-card-text>
            <p>系統化學習台灣地理10大主題，包含：</p>
            <ul>
              <li>台灣地理位置與範圍</li>
              <li>地形與地質</li>
              <li>氣候與水文</li>
              <li>人口與聚落</li>
              <li>產業與經濟</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="$router.push({ name: 'study' })">
              開始學習
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" height="100%">
          <v-card-title class="text-h5">
            <v-icon color="success" class="mr-2">mdi-check-circle</v-icon>
            練習中心
          </v-card-title>
          <v-card-text>
            <p>超過200題互動練習題，包含：</p>
            <ul>
              <li>選擇題測驗</li>
              <li>填空題練習</li>
              <li>地圖辨識題</li>
              <li>歷屆會考真題</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" block @click="$router.push({ name: 'practice' })">
              開始練習
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-4" height="100%">
          <v-card-title class="text-h5">
            <v-icon color="info" class="mr-2">mdi-chart-line</v-icon>
            進度追蹤
          </v-card-title>
          <v-card-text>
            <p>即時追蹤你的學習進度：</p>
            <ul>
              <li>已完成主題數</li>
              <li>測驗平均分數</li>
              <li>總學習時間</li>
              <li>個人化建議</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" block @click="$router.push({ name: 'progress' })">
              查看進度
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 新功能介紹 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="pa-4" color="purple-lighten-5">
          <v-card-title class="text-h5">
            <v-icon color="purple" class="mr-2">mdi-rocket-launch</v-icon>
            🚀 全新功能上線！
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 mb-4">
              國中會考總複習系統提供完整的5大科目複習方案，包含模擬會考、智能錯題本、題目隨機化等先進功能！
            </p>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="pa-3 mb-3" hover @click="$router.push({ name: 'new-practice' })">
                  <div class="d-flex align-center">
                    <v-icon color="green" class="mr-3">mdi-clipboard-check</v-icon>
                    <div>
                      <div class="text-h6">模擬正式考試</div>
                      <div class="text-caption">正式題數與時間，真實考試體驗</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card class="pa-3 mb-3" hover @click="$router.push({ name: 'new-practice' })">
                  <div class="d-flex align-center">
                    <v-icon color="blue" class="mr-3">mdi-book-multiple</v-icon>
                    <div>
                      <div class="text-h6">5大科目完整題庫</div>
                      <div class="text-caption">國文、英語、數學、自然、社會</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card class="pa-3 mb-3" hover @click="$router.push({ name: 'new-practice' })">
                  <div class="d-flex align-center">
                    <v-icon color="orange" class="mr-3">mdi-notebook</v-icon>
                    <div>
                      <div class="text-h6">智能錯題本</div>
                      <div class="text-caption">自動記錄錯題，針對性複習</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              
              <v-col cols="12" md="6">
                <v-card class="pa-3 mb-3" hover @click="$router.push({ name: 'new-practice' })">
                  <div class="d-flex align-center">
                    <v-icon color="red" class="mr-3">mdi-shuffle</v-icon>
                    <div>
                      <div class="text-h6">題目隨機變化</div>
                      <div class="text-caption">每次練習都不一樣，避免死記硬背</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            
            <div class="text-center mt-4">
              <v-btn color="purple" size="large" @click="$router.push({ name: 'new-practice' })">
                <v-icon left>mdi-rocket</v-icon>
                進入總複習系統
              </v-btn>
            </div>
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
import { useProgressStore } from '@/store/progress'

const progressStore = useProgressStore()
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