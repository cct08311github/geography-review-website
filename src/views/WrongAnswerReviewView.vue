<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h4">
            <v-icon left color="orange">mdi-notebook-edit</v-icon>
            錯題本
          </v-card-title>
          
          <v-card-text class="text-center pa-8">
            <v-icon size="64" color="orange" class="mb-4">mdi-book-open</v-icon>
            <h3 class="text-h5 mb-2">請使用新練習中心</h3>
            <p class="text-body-1 mb-4">
              錯題本功能已整合到新練習中心，請前往使用完整功能。
            </p>
            <v-btn color="orange" @click="$router.push({ name: 'new-practice' })">
              前往新練習中心
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