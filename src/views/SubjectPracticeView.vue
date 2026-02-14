<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-4">
          <v-card-title class="text-h4">
            <v-icon left color="primary">mdi-book-open</v-icon>
            科目練習 - {{ subjectName }}
          </v-card-title>
          
          <v-card-text class="text-center pa-8">
            <v-icon size="64" color="blue" class="mb-4">mdi-tools</v-icon>
            <h3 class="text-h5 mb-2">功能開發中</h3>
            <p class="text-body-1 mb-4">
              {{ subjectName }}科目的練習功能正在開發中，敬請期待！
            </p>
            <v-btn color="primary" @click="$router.push({ name: 'new-practice' })">
              返回練習中心
            </v-btn>
          </v-card-text>
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

const subject = computed(() => {
  return getSubjectById(props.subjectId)
})

const subjectName = computed(() => {
  return subject.value ? subject.value.name : '未知科目'
})
</script>