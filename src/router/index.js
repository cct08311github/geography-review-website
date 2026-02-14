import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('../views/StudyView.vue')
  },
  {
    path: '/practice',
    name: 'practice',
    component: () => import('../views/PracticeView.vue')
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('../views/ProgressView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingsView.vue')
  },
  // 新功能路由
  {
    path: '/new-practice',
    name: 'new-practice',
    component: () => import('../views/NewPracticeView.vue')
  },
  {
    path: '/subject-practice/:subjectId',
    name: 'subject-practice',
    component: () => import('../views/SubjectPracticeView.vue'),
    props: true
  },
  {
    path: '/exam-taking',
    name: 'exam-taking',
    component: () => import('../views/ExamTakingView.vue')
  },
  {
    path: '/wrong-answers',
    name: 'wrong-answers',
    component: () => import('../views/WrongAnswerReviewView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router