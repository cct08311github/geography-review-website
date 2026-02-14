<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>地理會考複習</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="首頁" value="home" @click="goTo('home')"></v-list-item>
        <v-list-item prepend-icon="mdi-book-open-page-variant" title="學習中心" value="study" @click="goTo('study')"></v-list-item>
        <v-list-item prepend-icon="mdi-check-circle" title="練習中心" value="practice" @click="goTo('practice')"></v-list-item>
        <v-list-item prepend-icon="mdi-chart-line" title="進度報告" value="progress" @click="goTo('progress')"></v-list-item>
        <v-list-item prepend-icon="mdi-cog" title="設定" value="settings" @click="goTo('settings')"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="primary" dark>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <span>© 2026 地理會考複習網站 - 專為國三學生設計</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'

const drawer = ref(false)
const router = useRouter()
const theme = useTheme()

const goTo = (route) => {
  drawer.value = false
  router.push({ name: route })
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style>
/* 手機優先響應式設計 */
@media (max-width: 600px) {
  .v-container {
    padding: 8px !important;
  }
  
  .v-card {
    margin: 4px !important;
  }
}

/* 改善觸控體驗 */
.v-btn {
  min-height: 48px;
}

.v-list-item {
  min-height: 56px;
}
</style>