# 科目練習功能 - 開發規格說明

## 🎯 專案概述

### 目標
為國中會考總複習系統開發完整的科目練習功能，提供5大科目的練習、評分、錯題記錄和進度追蹤功能。

### 技術棧
- **前端框架**: Vue.js 3.4+
- **UI框架**: Vuetify 3.5+
- **狀態管理**: Pinia 2.1+
- **路由管理**: Vue Router 4.2+
- **構建工具**: Vite 5.0+
- **測試框架**: Vitest + Vue Test Utils
- **部署平台**: GitHub Pages

## 🏗️ 系統架構

### 整體架構
```
┌─────────────────────────────────────────────┐
│               前端應用層 (Vue.js)            │
├─────────────────────────────────────────────┤
│ 視圖層 (Views)       │ 組件層 (Components)   │
├─────────────────────────────────────────────┤
│          狀態管理層 (Pinia Stores)           │
├─────────────────────────────────────────────┤
│          業務邏輯層 (Services)              │
├─────────────────────────────────────────────┤
│          數據持久化層 (LocalStorage)         │
└─────────────────────────────────────────────┘
```

### 模塊劃分

#### 1. 練習管理模塊
- 練習會話管理
- 題目隨機化算法
- 評分系統
- 錯題記錄

#### 2. 題目管理模塊
- 題目加載與緩存
- 題目分類與過濾
- 題目難度管理
- 題目搜索

#### 3. 進度追蹤模塊
- 學習統計
- 成績分析
- 成就系統
- 報告生成

#### 4. 用戶界面模塊
- 練習界面
- 結果展示
- 錯題本界面
- 進度報告界面

## 📁 項目結構

### 目錄結構
```
geography-review-website/
├── src/
│   ├── components/
│   │   ├── practice/          # 練習相關組件
│   │   │   ├── QuestionCard.vue      # 題目卡片
│   │   │   ├── AnswerOptions.vue     # 答案選項
│   │   │   ├── ProgressBar.vue       # 進度條
│   │   │   ├── TimerDisplay.vue      # 計時器
│   │   │   └── ResultDisplay.vue     # 結果顯示
│   │   └── subjects/          # 科目專用組件
│   │       ├── ChinesePractice.vue   # 國文練習
│   │       ├── EnglishPractice.vue   # 英語練習
│   │       ├── MathPractice.vue      # 數學練習
│   │       ├── SciencePractice.vue   # 自然練習
│   │       └── SocialPractice.vue    # 社會練習
│   ├── stores/
│   │   ├── practice.store.js  # 練習狀態管理
│   │   ├── question.store.js  # 題目數據管理
│   │   └── progress.store.js  # 進度追蹤管理
│   ├── utils/
│   │   ├── question-generator.js     # 題目生成器
│   │   ├── scoring-system.js         # 評分系統
│   │   ├── data-validator.js         # 數據驗證器
│   │   └── storage-manager.js        # 存儲管理器
│   ├── views/
│   │   ├── SubjectPracticeView.vue   # 科目練習頁面
│   │   └── NewPracticeView.vue       # 新練習中心
│   └── data/
│       ├── subjects.js        # 科目定義
│       ├── question-manager.js # 題目管理器
│       └── expanded-geography-quizzes.js # 擴充題庫
├── tests/
│   ├── unit/                  # 單元測試
│   ├── integration/           # 集成測試
│   └── e2e/                   # 端到端測試
└── docs/                      # 文檔
```

## 🔧 技術規格

### 1. 狀態管理規格

#### Practice Store (`practice.store.js`)
```javascript
// 狀態定義
const state = () => ({
  // 當前練習會話
  currentSession: null,
  
  // 練習歷史
  sessionHistory: [],
  
  // 錯題記錄 (Map結構: questionId -> 錯誤信息)
  wrongQuestions: new Map(),
  
  // 科目進度
  subjectProgress: {},
  
  // 加載狀態
  isLoading: false,
  
  // 錯誤信息
  error: null
});

// Actions 規格
const actions = {
  /**
   * 開始新的練習會話
   * @param {Object} params - 參數
   * @param {number} params.subjectId - 科目ID
   * @param {string} params.mode - 練習模式
   * @param {number} [params.topicId] - 主題ID
   * @param {number} [params.questionCount] - 題目數量
   */
  async startPracticeSession({ commit }, params) {},
  
  /**
   * 提交答案
   * @param {number} questionId - 題目ID
   * @param {any} answer - 用戶答案
   */
  async submitAnswer({ commit }, { questionId, answer }) {},
  
  /**
   * 結束當前練習會話
   */
  async endPracticeSession({ commit, state }) {},
  
  /**
   * 獲取錯題列表
   * @param {number} subjectId - 科目ID
   * @param {number} limit - 返回數量限制
   */
  async getWrongQuestions({ state }, { subjectId, limit }) {},
  
  /**
   * 標記錯題為已掌握
   * @param {number} questionId - 題目ID
   */
  async markQuestionMastered({ commit }, questionId) {}
};
```

#### Question Store (`question.store.js`)
```javascript
// 狀態定義
const state = () => ({
  // 題目庫 (Map結構: questionId -> question)
  questionBank: new Map(),
  
  // 按科目分類的題目
  subjectQuestions: {},
  
  // 按主題分類的題目
  topicQuestions: {},
  
  // 題目緩存 (LRU緩存)
  questionCache: new Map(),
  
  // 加載狀態
  isLoading: false
});

// Actions 規格
const actions = {
  /**
   * 加載科目題目
   * @param {number} subjectId - 科目ID
   */
  async loadQuestions({ commit }, subjectId) {},
  
  /**
   * 獲取隨機題目
   * @param {Object} params - 參數
   * @param {number} params.subjectId - 科目ID
   * @param {number} params.count - 題目數量
   * @param {number} [params.topicId] - 主題ID
   */
  async getRandomQuestions({ state }, params) {},
  
  /**
   * 根據ID獲取題目
   * @param {number} questionId - 題目ID
   */
  async getQuestionById({ state }, questionId) {},
  
  /**
   * 根據難度獲取題目
   * @param {Object} params - 參數
   * @param {number} params.subjectId - 科目ID
   * @param {string} params.difficulty - 難度等級
   * @param {number} params.count - 題目數量
   */
  async getQuestionsByDifficulty({ state }, params) {}
};
```

### 2. 組件規格

#### QuestionCard 組件
```vue
<template>
  <!-- 題目卡片模板 -->
  <div class="question-card">
    <!-- 題目編號和進度 -->
    <div class="question-header">
      <span class="question-number">第 {{ questionNumber }} 題 / 共 {{ totalQuestions }} 題</span>
      <progress-bar :progress="progress" />
    </div>
    
    <!-- 題目內容 -->
    <div class="question-content">
      <div class="question-text" v-html="formattedQuestion" />
      
      <!-- 答案選項 -->
      <answer-options
        :options="question.options"
        :question-type="question.type"
        :selected-answer="selectedAnswer"
        :disabled="isSubmitted"
        @change="handleAnswerChange"
      />
    </div>
    
    <!-- 操作按鈕 -->
    <div class="question-actions">
      <v-btn
        :disabled="!selectedAnswer || isSubmitted"
        @click="handleSubmit"
      >
        {{ submitButtonText }}
      </v-btn>
      
      <v-btn
        v-if="showNextButton"
        @click="handleNext"
      >
        下一題
      </v-btn>
    </div>
    
    <!-- 答案解析 -->
    <div v-if="showExplanation" class="explanation">
      <h4>解析：</h4>
      <div v-html="question.explanation" />
    </div>
  </div>
</template>

<script setup>
// Props 定義
const props = defineProps({
  question: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id && value.question && value.options;
    }
  },
  questionNumber: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  onSubmit: {
    type: Function,
    required: true
  },
  onNext: {
    type: Function,
    default: null
  }
});

// 狀態
const selectedAnswer = ref(null);
const isSubmitted = ref(false);
const showExplanation = ref(false);

// 計算屬性
const progress = computed(() => {
  return (props.questionNumber / props.totalQuestions) * 100;
});

const submitButtonText = computed(() => {
  return isSubmitted.value ? '已提交' : '提交答案';
});

const showNextButton = computed(() => {
  return isSubmitted.value && props.onNext;
});

// 方法
const handleAnswerChange = (answer) => {
  selectedAnswer.value = answer;
};

const handleSubmit = async () => {
  if (!selectedAnswer.value || isSubmitted.value) return;
  
  isSubmitted.value = true;
  showExplanation.value = true;
  
  // 調用父組件提交方法
  await props.onSubmit(props.question.id, selectedAnswer.value);
};

const handleNext = () => {
  if (props.onNext) {
    props.onNext();
  }
};

// 格式化題目文本（處理HTML和數學公式）
const formattedQuestion = computed(() => {
  return formatQuestionText(props.question.question);
});
</script>

<style scoped>
.question-card {
  padding: 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.question-number {
  font-size: 16px;
  font-weight: 500;
  color: #666;
}

.question-content {
  margin-bottom: 20px;
}

.question-text {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
}

.question-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.explanation {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #2196f3;
}

.explanation h4 {
  margin: 0 0 10px 0;
  color: #2196f3;
}
</style>
```

#### AnswerOptions 組件
```vue
<template>
  <div class="answer-options">
    <!-- 單選題 -->
    <div v-if="questionType === 'single'" class="single-options">
      <v-radio-group v-model="selected">
        <v-radio
          v-for="(option, index) in options"
          :key="index"
          :label="`${String.fromCharCode(65 + index)}. ${option}`"
          :value="index"
          :disabled="disabled"
        />
      </v-radio-group>
    </div>
    
    <!-- 多選題 -->
    <div v-else-if="questionType === 'multiple'" class="multiple-options">
      <v-checkbox
        v-for="(option, index) in options"
        :key="index"
        v-model="selectedMultiple"
        :label="`${String.fromCharCode(65 + index)}. ${option}`"
        :value="index"
        :disabled="disabled"
      />
    </div>
    
    <!-- 判斷題 -->
    <div v-else-if="questionType === 'truefalse'" class="truefalse-options">
      <v-radio-group v-model="selected">
        <v-radio label="正確" :value="true" :disabled="disabled" />
        <v-radio label="錯誤" :value="false" :disabled="disabled" />
      </v-radio-group>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  questionType: {
    type: String,
    required: true,
    validator: (value) => ['single', 'multiple', 'truefalse'].includes(value)
  },
  selectedAnswer: {
    type: [Number, Array, Boolean],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change']);

// 狀態
const selected = ref(props.selectedAnswer);
const selectedMultiple = ref(props.selectedAnswer || []);

// 監聽選擇變化
watch(selected, (newValue) => {
  emit('change', newValue);
});

watch(selectedMultiple, (newValue) => {
  emit('change', newValue);
});

// 監聽外部selectedAnswer變化
watch(() => props.selectedAnswer, (newValue) => {
  if (props.questionType === 'multiple') {
    selectedMultiple.value = newValue || [];
  } else {
    selected.value = newValue;
  }
});
</script>

<style scoped>
.answer-options {
  margin: 20px 0;
}

.single-options,
.multiple-options,
.truefalse-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
```

### 3. 工具函數規格

#### 評分系統 (`scoring-system.js`)
```javascript
/**
 * 評分系統工具函數
 */

/**
 * 檢查答案是否正確
 * @param {Object} question - 題目對象
 * @param {any} userAnswer - 用戶答案
 * @returns {Object} 評分結果
 */
export function checkAnswer(question, userAnswer) {
  const { type, answer: correctAnswer } = question;
  
  switch (type) {
    case 'single':
      return checkSingleAnswer(correctAnswer, userAnswer);
      
    case 'multiple':
      return checkMultipleAnswer(correctAnswer, userAnswer);
      
    case 'truefalse':
      return checkTrueFalseAnswer(correctAnswer, userAnswer);
      
    case 'matching':
      return checkMatchingAnswer(correctAnswer, userAnswer);
      
    default:
      throw new Error(`不支持的題型: ${type}`);
  }
}

/**
 * 檢查單選題答案
 */
function checkSingleAnswer(correctAnswer, userAnswer) {
  const isCorrect = correctAnswer === userAnswer;
  
  return {
    isCorrect,
    correctAnswer,
    userAnswer,
    score: isCorrect ? 1 : 0
  };
}

/**
 * 檢查多選題答案
 */
function checkMultipleAnswer(correctAnswer, userAnswer) {
  // 確保數組格式
  const correct = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  const user = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
  
  // 排序後比較
  const sortedCorrect = [...correct].sort((a, b) => a - b);
  const sortedUser = [...user].sort((a, b) => a - b);
  
  const isCorrect = 
    sortedCorrect.length === sortedUser.length &&
    sortedCorrect.every((value, index) => value === sortedUser[index]);
  
  return {
    isCorrect,
    correctAnswer: sortedCorrect,
    userAnswer: sortedUser,
    score: isCorrect ? 1 : 0
  };
}

/**
 * 計算練習會話總分
 * @param {Array} results - 每題評分結果
 * @returns {Object} 總分統計
 */
export function calculateTotalScore(results) {
  const totalQuestions = results.length;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const score = (correctAnswers / totalQuestions) * 100;
  
  return {
    totalQuestions,
    correctAnswers,
    score: Math.round(score * 100) / 100, // 保留兩位小數
    wrongAnswers: totalQuestions - correctAnswers
  };
}
```

#### 題目生成器 (`question-generator.js`)
```javascript
/**
 * 題目生成器工具函數
 */

/**
 * 從題庫中隨機選擇題目
 * @param {Array} questions - 題目數組
 * @param {number} count - 需要選擇的題目數量
 * @param {Object} options - 選項
 * @param {number} [options.topicId] - 主題ID過濾
 * @param {string} [options.difficulty] - 難度過濾
 * @returns {Array} 隨機選擇的題目
 */
export function getRandomQuestions(questions, count, options = {}) {
  // 過濾題目
  let filteredQuestions = [...questions];
  
  if (options.topicId) {
    filteredQuestions = filteredQuestions.filter(q => q.topicId === options.topicId);
  }
  
  if (options.difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === options.difficulty);
  }
  
  // 檢查題目數量是否足夠
  if (filteredQuestions.length < count) {
    console.warn(`題目數量不足: 需要 ${count} 題，只有 ${filteredQuestions.length} 題可用`);
    count = Math.min(count, filteredQuestions.length);
  }
  
  // 隨機選擇
  const selected = [];
  const available = [...filteredQuestions];
  
  for (let i = 0; i < count; i++) {
    if (available.length === 0) break;
    
    const randomIndex = Math.floor(Math.random() * available.length);
    selected.push(available[randomIndex]);
    available.splice(randomIndex, 1);
  }
  
  return selected;
}

/**
 * 打亂題目順序
 * @param {Array} questions - 題目數組
 * @returns {Array} 打亂順序後的題目
 */
export function shuffleQuestions(questions) {
  const shuffled = [...questions];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * 打亂選項順序
 * @param {Array} options - 選項數組
 * @returns {Object} 打亂後的選項和映射關係
 */
export function shuffleOptions(options) {
  const indices = options.map((_, index) => index);
  
  // 打亂索引
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // 創建新選項順序
  const shuffledOptions = indices.map(index => options[index]);
  
  // 創建映射關係 (新索引 -> 原索引)
  const mapping = {};
  indices.forEach((originalIndex, newIndex) => {
    mapping[newIndex] = originalIndex;
  });
  
  return {
    options: shuffledOptions,
    mapping
  };
}
```

#### 數據驗證器 (`data-validator.js`)
```javascript
/**
 * 數據驗證工具函數
 */

/**
 * 驗證題目數據
 * @param {Object} question - 題目對象
 * @returns {Object} 驗證結果
 */
export function validateQuestion(question) {
  const errors = [];
  
  // 檢查必要字段
  const requiredFields = ['id', 'subjectId', 'type', 'question', 'options', 'answer'];
  requiredFields.forEach(field => {
    if (!question[field] && question[field] !== 0) {
      errors.push(`缺少必要字段: ${field}`);
    }
  });
  
  // 檢查題型
  const validTypes = ['single', 'multiple', 'truefalse', 'matching'];
  if (!validTypes.includes(question.type)) {
    errors.push(`無效的題型: ${question.type}`);
  }
  
  // 檢查選項
  if (!Array.isArray(question.options) || question.options.length === 0) {
    errors.push('選項必須是非空數組');
  }
  
  // 根據題型檢查答案格式
  switch (question.type) {
    case 'single':
      if (typeof question.answer !== 'number' || 
          question.answer < 0 || 
          question.answer >= question.options.length) {
        errors.push('單選題答案必須是有效的選項索引');
      }
      break;
      
    case 'multiple':
      if (!Array.isArray(question.answer) || 
          question.answer.length === 0 ||
          !question.answer.every(idx => 
            typeof idx === 'number' && idx >= 0 && idx < question.options.length)) {
        errors.push('多選題答案必須是有效的選項索引數組');
      }
      break;
      
    case 'truefalse':
      if (typeof question.answer !== 'boolean') {
        errors.push('判斷題答案必須是布爾值');
      }
      break;
      
    case 'matching':
      if (!Array.isArray(question.answer) || 
          !question.answer.every(pair => 
            Array.isArray(pair) && pair.length === 2)) {
        errors.push('配對題答案必須是二維數組');
      }
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 驗證練習會話參數
 * @param {Object} params - 參數對象
 * @returns {Object} 驗證結果
 */
export function validatePracticeParams(params) {
  const errors = [];
  
  if (!params.subjectId || typeof params.subjectId !== 'number') {
    errors.push('subjectId 必須是數字');
  }
  
  const validModes = ['topic', 'comprehensive', 'quick'];
  if (!params.mode || !validModes.includes(params.mode)) {
    errors.push(`mode 必須是以下之一: ${validModes.join(', ')}`);
  }
  
  if (params.mode === 'topic' && (!params.topicId || typeof params.topicId !== 'number')) {
    errors.push('topic 模式必須提供 topicId');
  }
  
  if (params.questionCount && 
      (typeof params.questionCount !== 'number' || params.questionCount <= 0)) {
    errors.push('questionCount 必須是大於0的數字');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### 4. 測試規格

#### 單元測試規格
```javascript
// tests/unit/stores/practice.store.test.js
import { describe, test, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePracticeStore } from '@/stores/practice.store';

describe('Practice Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  test('應該能成功開始練習會話', async () => {
    const store = usePracticeStore();
    
    const session = await store.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 10
    });
    
    expect(session).toBeDefined();
    expect(session.subjectId).toBe(1);
    expect(session.mode).toBe('quick');
    expect(session.questions).toHaveLength(10);
    expect(store.currentSession).toBe(session);
  });
  
  test('提交答案應該更新會話狀態', async () => {
    const store = usePracticeStore();
    
    // 先開始會話
    await store.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 5
    });
    
    // 提交答案
    const result = await store.submitAnswer({
      questionId: store.currentSession.questions[0].id,
      answer: 0
    });
    
    expect(result).toHaveProperty('isCorrect');
    expect(store.currentSession.userAnswers.size).toBe(1);
  });
  
  test('結束會話應該計算總分', async () => {
    const store = usePracticeStore();
    
    // 開始會話並提交一些答案
    await store.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 3
    });
    
    // 提交所有答案
    for (const question of store.currentSession.questions) {
      await store.submitAnswer({
        questionId: question.id,
        answer: 0
      });
    }
    
    // 結束會話
    const finalResult = await store.endPracticeSession();
    
    expect(finalResult).toHaveProperty('score');
    expect(finalResult.totalQuestions).toBe(3);
    expect(store.currentSession).toBeNull();
    expect(store.sessionHistory).toHaveLength(1);
  });
});

// tests/unit/utils/scoring-system.test.js
import { describe, test, expect } from 'vitest';
import { checkAnswer, calculateTotalScore } from '@/utils/scoring-system';

describe('Scoring System', () => {
  describe('單選題評分', () => {
    test('正確答案應該返回正確結果', () => {
      const question = {
        type: 'single',
        answer: 0,
        options: ['選項A', '選項B', '選項C']
      };
      
      const result = checkAnswer(question, 0);
      
      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(1);
    });
    
    test('錯誤答案應該返回錯誤結果', () => {
      const question = {
        type: 'single',
        answer: 0,
        options: ['選項A', '選項B', '選項C']
      };
      
      const result = checkAnswer(question, 1);
      
      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
    });
  });
  
  describe('總分計算', () => {
    test('應該正確計算總分', () => {
      const results = [
        { isCorrect: true, score: 1 },
        { isCorrect: false, score: 0 },
        { isCorrect: true, score: 1 },
        { isCorrect: true, score: 1 }
      ];
      
      const total = calculateTotalScore(results);
      
      expect(total.totalQuestions).toBe(4);
      expect(total.correctAnswers).toBe(3);
      expect(total.score).toBe(75);
      expect(total.wrongAnswers).toBe(1);
    });
  });
});
```

## 🚀 開發流程

### 1. 環境設置
```bash
# 克隆項目
git clone https://github.com/cct08311github/geography-review-website.git
cd geography-review-website

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 運行測試
npm run test

# 構建生產版本
npm run build
```

### 2. 代碼規範
- 使用 ESLint + Prettier 進行代碼格式化
- 遵循 Vue.js 風格指南
- 組件使用 Composition API + `<script setup>`
- 所有導出函數必須有 JSDoc 註釋

### 3. 提交規範
```
feat: 新增科目練習功能
fix: 修復題目加載問題
docs: 更新API文檔
test: 添加練習會話測試
refactor: 重構評分系統
chore: 更新依賴包
```

### 4. 測試要求
- 所有 Store 必須有單元測試
- 核心工具函數必須有單元測試
- 組件必須有基本的渲染測試
- 集成測試覆蓋主要用戶流程
- 測試覆蓋率目標 > 80%

## 📦 數據結構

### 題目數據示例
```javascript
{
  id: 1,
  subjectId: 5,           // 社會科
  topicId: 1,             // 地理主題
  type: 'single',         // 單選題
  question: '台灣最高的山是哪一座？',
  options: ['玉山', '阿里山', '陽明山', '合歡山'],
  answer: 0,              // 正確答案索引
  explanation: '玉山海拔3952公尺，是台灣也是東北亞最高峰。',
  difficulty: 'easy',
  tags: ['台灣地理', '山脈'],
  createdAt: '2026-02-14T00:00:00Z',
  updatedAt: '2026-02-14T00:00:00Z'
}
```

### 練習會話示例
```javascript
{
  id: 'session_abc123',
  subjectId: 5,
  mode: 'quick',
  questions: [
    { id: 1, /* 題目詳情 */ },
    { id: 2, /* 題目詳情 */ },
    // ... 共10題
  ],
  currentQuestionIndex: 3,
  userAnswers: new Map([
    [1, 0],    // 第1題選擇選項A
    [2, 2],    // 第2題選擇選項C
    [3, 1]     // 第3題選擇選項B
  ]),
  startTime: '2026-02-14T08:00:00Z',
  completed: false
}
```

## 🔒 安全性考慮

### 1. 輸入驗證
- 所有用戶輸入必須驗證
- 防止XSS攻擊（使用Vue的文本插值）
- 驗證題目數據完整性

### 2. 數據安全
- LocalStorage 數據加密（可選）
- 防止數據篡改
- 定期備份提醒

### 3. 性能安全
- 防止內存洩漏
- 限制題目緩存大小
- 優化渲染性能

## 📈 性能優化

### 1. 加載優化
- 題目數據懶加載
- 圖片和資源延遲加載
- 使用Web Worker處理複雜計算

### 2. 渲染優化
- 虛擬滾動長列表
- 組件懶加載
- 避免不必要的重新渲染

### 3. 存儲優化
- LRU緩存策略
- 數據壓縮存儲
- 定期清理過期數據

## 🔄 部署流程

### 1. 開發環境
```bash
# 本地開發
npm run dev

# 訪問 http://localhost:5173
```

### 2. 測試環境
```bash
# 運行所有測試
npm run test

# 構建測試版本
npm run build:test
```

### 3. 生產環境
```bash
# 構建生產版本
npm run build

# 部署到GitHub Pages
npm run deploy
```

### 4. 監控與維護
- 使用GitHub Actions自動化部署
- 設置錯誤監控（可選）
- 定期更新依賴包

## 🎯 驗收標準

### 功能驗收
- [ ] 5大科目練習功能正常
- [ ] 三種練習模式完整實現
- [ ] 錯題本功能正常
- [ ] 學習進度追蹤準確

### 質量驗收
- [ ] 測試覆蓋率 > 80%
- [ ] 無嚴重錯誤
- [ ] 性能指標達標
- [ ] 代碼審查通過

### 用戶體驗驗收
- [ ] 界面響應迅速
- [ ] 操作流程順暢
- [ ] 錯誤提示友好
- [ ] 移動端適配良好

---

**文檔版本**: 1.0  
**最後更新**: 2026-02-14 08:00 UTC  
**狀態**: ✅ 完成 - 可供開發團隊使用