<template>
  <v-container>
    <v-row justify="center" class="mb-8">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6" color="primary" dark>
          <v-card-title class="text-h4 text-center">
            🗺️ 歡迎來到地理會考複習網站！
          </v-card-title>
          <v-card-subtitle class="text-h6 text-center">
            專為15歲國三學生設計的台灣地理重點複習
          </v-card-subtitle>
          <v-card-text class="text-center">
            <p class="text-body-1">
              這裡整理了近5年國中地理會考重點知識，幫助你高效複習、輕鬆應考！
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
              我們新增了完整的國中會考複習系統，包含5大科目、模擬考試和錯題本功能！
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
                體驗全新複習系統
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
              <strong>📚 每日30分鐘：</strong> 每天花30分鐘複習一個主題，效果比週末一次複習3小時更好！
            </v-alert>
            <v-alert type="success" class="mb-4">
              <strong>🗺️ 地圖記憶法：</strong> 台灣地理要記住「一府二鹿三艋舺」，從北到南的重要城市位置。
            </v-alert>
            <v-alert type="warning" class="mb-4">
              <strong>⏰ 考試時間分配：</strong> 會考地理50分鐘，建議選擇題30分鐘、非選擇題20分鐘。
            </v-alert>
            <v-alert type="info">
              <strong>📝 錯題本：</strong> 把做錯的題目記錄下來，考前重點複習這些題目。
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