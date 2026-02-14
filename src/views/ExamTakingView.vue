<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h4">
            <v-icon left color="green">mdi-clipboard-text</v-icon>
            考試進行中
          </v-card-title>
          
          <v-card-text class="text-center pa-8">
            <v-icon size="64" color="green" class="mb-4">mdi-timer-sand</v-icon>
            <h3 class="text-h5 mb-2">考試功能開發中</h3>
            <p class="text-body-1 mb-4">
              模擬考試功能正在開發中，即將上線！
            </p>
            <v-btn color="green" @click="$router.push({ name: 'new-practice' })">
              返回練習中心
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>