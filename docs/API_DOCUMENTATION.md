# 科目練習功能 API 文檔

## 📋 概述
本文檔描述國中會考總複習系統科目練習功能的 API 接口。

## 🏗️ 架構設計

### 數據層架構
```
前端組件 (Vue.js)
    ↓
狀態管理層 (Pinia Stores)
    ↓
業務邏輯層 (Services)
    ↓
數據持久化層 (LocalStorage/API)
```

### 核心 Store 設計

#### 1. Practice Store (`practice.store.js`)
```javascript
// 練習會話狀態管理
const practiceStore = {
  state: {
    currentSession: null,      // 當前練習會話
    sessionHistory: [],        // 練習歷史
    wrongQuestions: new Map(), // 錯題記錄
    subjectProgress: {}        // 科目進度
  },
  
  actions: {
    // 開始新的練習會話
    startPracticeSession(subjectId, mode, topicId = null),
    
    // 獲取下一題
    getNextQuestion(),
    
    // 提交答案
    submitAnswer(questionId, answer),
    
    // 結束練習會話
    endPracticeSession(),
    
    // 獲取錯題列表
    getWrongQuestions(subjectId, limit = 20),
    
    // 獲取練習歷史
    getPracticeHistory(subjectId, limit = 10)
  }
}
```

#### 2. Question Store (`question.store.js`)
```javascript
// 題目數據管理
const questionStore = {
  state: {
    questionBank: new Map(),   // 題目庫
    subjectQuestions: {},      // 按科目分類的題目
    topicQuestions: {},        // 按主題分類的題目
    questionCache: new Map()   // 題目緩存
  },
  
  actions: {
    // 加載題目數據
    loadQuestions(subjectId),
    
    // 獲取隨機題目
    getRandomQuestions(subjectId, count, topicId = null),
    
    // 根據難度獲取題目
    getQuestionsByDifficulty(subjectId, difficulty, count),
    
    // 獲取特定題目
    getQuestionById(questionId),
    
    // 更新題目數據
    updateQuestion(questionId, data)
  }
}
```

#### 3. Progress Store (`progress.store.js`)
```javascript
// 學習進度追蹤
const progressStore = {
  state: {
    subjectStats: {},          // 科目統計
    topicStats: {},            // 主題統計
    dailyProgress: [],         // 每日進度
    achievementBadges: []      // 成就徽章
  },
  
  actions: {
    // 更新練習結果
    updatePracticeResult(sessionResult),
    
    // 獲取科目進度
    getSubjectProgress(subjectId),
    
    // 獲取主題進度
    getTopicProgress(subjectId, topicId),
    
    // 獲取學習報告
    getLearningReport(days = 7),
    
    // 重置進度數據
    resetProgress()
  }
}
```

## 🔧 API 接口詳解

### 練習會話管理 API

#### 1. 開始練習會話
```javascript
/**
 * 開始新的練習會話
 * @param {Object} params - 參數對象
 * @param {number} params.subjectId - 科目ID
 * @param {string} params.mode - 練習模式 ('topic' | 'comprehensive' | 'quick')
 * @param {number} [params.topicId] - 主題ID (僅 topic 模式需要)
 * @param {number} [params.questionCount] - 題目數量
 * @returns {Object} 練習會話對象
 */
function startPracticeSession({ subjectId, mode, topicId, questionCount }) {
  // 實現邏輯
}
```

#### 2. 獲取下一題
```javascript
/**
 * 獲取當前會話的下一題
 * @returns {Object} 題目對象
 */
function getNextQuestion() {
  // 實現邏輯
}
```

#### 3. 提交答案
```javascript
/**
 * 提交答案並獲取結果
 * @param {number} questionId - 題目ID
 * @param {any} answer - 用戶答案
 * @returns {Object} 評分結果
 */
function submitAnswer(questionId, answer) {
  // 實現邏輯
}
```

#### 4. 結束練習會話
```javascript
/**
 * 結束當前練習會話
 * @returns {Object} 會話結果統計
 */
function endPracticeSession() {
  // 實現邏輯
}
```

### 題目管理 API

#### 1. 加載題目數據
```javascript
/**
 * 加載指定科目的題目數據
 * @param {number} subjectId - 科目ID
 * @returns {Promise<Array>} 題目列表
 */
async function loadQuestions(subjectId) {
  // 實現邏輯
}
```

#### 2. 獲取隨機題目
```javascript
/**
 * 獲取隨機題目
 * @param {number} subjectId - 科目ID
 * @param {number} count - 題目數量
 * @param {number} [topicId] - 主題ID
 * @returns {Array} 隨機題目列表
 */
function getRandomQuestions(subjectId, count, topicId = null) {
  // 實現邏輯
}
```

#### 3. 獲取題目詳情
```javascript
/**
 * 根據ID獲取題目詳情
 * @param {number} questionId - 題目ID
 * @returns {Object} 題目對象
 */
function getQuestionById(questionId) {
  // 實現邏輯
}
```

### 錯題本 API

#### 1. 獲取錯題列表
```javascript
/**
 * 獲取錯題列表
 * @param {number} subjectId - 科目ID
 * @param {number} limit - 返回數量限制
 * @returns {Array} 錯題列表
 */
function getWrongQuestions(subjectId, limit = 20) {
  // 實現邏輯
}
```

#### 2. 標記錯題已掌握
```javascript
/**
 * 標記錯題為已掌握
 * @param {number} questionId - 題目ID
 */
function markQuestionMastered(questionId) {
  // 實現邏輯
}
```

#### 3. 獲取錯題統計
```javascript
/**
 * 獲取錯題統計信息
 * @param {number} subjectId - 科目ID
 * @returns {Object} 錯題統計
 */
function getWrongQuestionStats(subjectId) {
  // 實現邏輯
}
```

### 進度追蹤 API

#### 1. 更新練習結果
```javascript
/**
 * 更新練習結果到進度系統
 * @param {Object} sessionResult - 會話結果
 */
function updatePracticeResult(sessionResult) {
  // 實現邏輯
}
```

#### 2. 獲取科目進度
```javascript
/**
 * 獲取科目學習進度
 * @param {number} subjectId - 科目ID
 * @returns {Object} 進度信息
 */
function getSubjectProgress(subjectId) {
  // 實現邏輯
}
```

#### 3. 獲取學習報告
```javascript
/**
 * 獲取學習報告
 * @param {number} days - 報告天數
 * @returns {Object} 學習報告
 */
function getLearningReport(days = 7) {
  // 實現邏輯
}
```

## 📊 數據結構定義

### 題目數據結構
```typescript
interface Question {
  id: number;                    // 題目ID
  subjectId: number;             // 科目ID
  topicId: number;               // 主題ID
  type: 'single' | 'multiple' | 'truefalse' | 'matching'; // 題型
  question: string;              // 問題內容
  options: string[];             // 選項列表
  answer: number | number[] | boolean | number[][]; // 正確答案
  explanation: string;           // 解析說明
  difficulty: 'easy' | 'medium' | 'hard'; // 難度
  tags: string[];                // 標籤
  createdAt: Date;               // 創建時間
  updatedAt: Date;               // 更新時間
}
```

### 練習會話數據結構
```typescript
interface PracticeSession {
  id: string;                    // 會話ID
  subjectId: number;             // 科目ID
  mode: 'topic' | 'comprehensive' | 'quick'; // 練習模式
  topicId?: number;              // 主題ID (可選)
  questions: Question[];         // 題目列表
  currentQuestionIndex: number;  // 當前題目索引
  userAnswers: Map<number, any>; // 用戶答案映射
  startTime: Date;               // 開始時間
  endTime?: Date;                // 結束時間 (可選)
  score?: number;                // 得分 (可選)
  completed: boolean;            // 是否完成
}
```

### 練習結果數據結構
```typescript
interface PracticeResult {
  sessionId: string;             // 會話ID
  subjectId: number;             // 科目ID
  totalQuestions: number;        // 總題數
  correctAnswers: number;        // 正確答案數
  score: number;                 // 得分
  timeSpent: number;             // 花費時間 (毫秒)
  wrongQuestionIds: number[];    // 錯題ID列表
  completedAt: Date;             // 完成時間
}
```

### 進度統計數據結構
```typescript
interface ProgressStats {
  subjectId: number;             // 科目ID
  totalSessions: number;         // 總練習次數
  totalQuestions: number;        // 總答題數
  correctRate: number;           // 正確率
  averageScore: number;          // 平均分數
  totalTimeSpent: number;        // 總學習時間
  lastPracticeDate: Date;        // 最後練習日期
  topicStats: Map<number, TopicStat>; // 主題統計
}
```

## 🔒 錯誤處理

### 錯誤碼定義
```javascript
const ErrorCodes = {
  // 練習會話錯誤
  SESSION_NOT_FOUND: 'SESSION_NOT_FOUND',
  SESSION_ALREADY_COMPLETED: 'SESSION_ALREADY_COMPLETED',
  INVALID_SESSION_MODE: 'INVALID_SESSION_MODE',
  
  // 題目錯誤
  QUESTION_NOT_FOUND: 'QUESTION_NOT_FOUND',
  INVALID_QUESTION_TYPE: 'INVALID_QUESTION_TYPE',
  INSUFFICIENT_QUESTIONS: 'INSUFFICIENT_QUESTIONS',
  
  // 答案錯誤
  INVALID_ANSWER_FORMAT: 'INVALID_ANSWER_FORMAT',
  ANSWER_OUT_OF_RANGE: 'ANSWER_OUT_OF_RANGE',
  
  // 數據錯誤
  DATA_VALIDATION_FAILED: 'DATA_VALIDATION_FAILED',
  STORAGE_ERROR: 'STORAGE_ERROR'
};
```

### 錯誤響應格式
```javascript
{
  success: false,
  error: {
    code: 'SESSION_NOT_FOUND',
    message: '練習會話不存在',
    details: { sessionId: 'abc123' },
    timestamp: '2026-02-14T07:50:00Z'
  }
}
```

## 🧪 測試用例示例

### 單元測試示例
```javascript
// 練習會話管理測試
describe('Practice Session Management', () => {
  test('應該能成功開始新的練習會話', () => {
    const session = startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 10
    });
    
    expect(session).toHaveProperty('id');
    expect(session.subjectId).toBe(1);
    expect(session.mode).toBe('quick');
    expect(session.questions).toHaveLength(10);
  });
  
  test('提交答案應該返回正確的評分結果', () => {
    const question = getNextQuestion();
    const result = submitAnswer(question.id, 0);
    
    expect(result).toHaveProperty('isCorrect');
    expect(result).toHaveProperty('correctAnswer');
    expect(result).toHaveProperty('explanation');
  });
});
```

### 集成測試示例
```javascript
// 完整練習流程測試
describe('Complete Practice Flow', () => {
  test('應該能完成完整的練習流程', async () => {
    // 1. 開始練習
    const session = startPracticeSession({
      subjectId: 1,
      mode: 'quick'
    });
    
    // 2. 回答所有題目
    let score = 0;
    for (let i = 0; i < session.questions.length; i++) {
      const question = getNextQuestion();
      const result = submitAnswer(question.id, 0);
      if (result.isCorrect) score++;
    }
    
    // 3. 結束練習
    const finalResult = endPracticeSession();
    
    expect(finalResult.score).toBe(score);
    expect(finalResult.completed).toBe(true);
  });
});
```

## 📱 前端組件接口

### QuestionCard 組件 Props
```javascript
const QuestionCardProps = {
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
  showExplanation: {
    type: Boolean,
    default: false
  }
};
```

### AnswerOptions 組件 Props
```javascript
const AnswerOptionsProps = {
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
  },
  onChange: {
    type: Function,
    required: true
  }
};
```

## 🔄 數據持久化策略

### LocalStorage 結構
```javascript
const StorageKeys = {
  // 練習數據
  PRACTICE_SESSIONS: 'practice_sessions',
  WRONG_QUESTIONS: 'wrong_questions',
  PRACTICE_HISTORY: 'practice_history',
  
  // 進度數據
  SUBJECT_PROGRESS: 'subject_progress',
  TOPIC_PROGRESS: 'topic_progress',
  DAILY_PROGRESS: 'daily_progress',
  
  // 用戶設置
  USER_SETTINGS: 'user_settings',
  STUDY_PREFERENCES: 'study_preferences'
};
```

### 數據備份與恢復
```javascript
// 導出用戶數據
function exportUserData() {
  const data = {
    practiceHistory: getPracticeHistory(),
    wrongQuestions: getWrongQuestions(),
    progressStats: getProgressStats(),
    exportDate: new Date().toISOString()
  };
  
  return JSON.stringify(data, null, 2);
}

// 導入用戶數據
function importUserData(jsonData) {
  const data = JSON.parse(jsonData);
  
  // 驗證數據格式
  if (!validateImportData(data)) {
    throw new Error('Invalid import data format');
  }
  
  // 恢復數據
  restorePracticeHistory(data.practiceHistory);
  restoreWrongQuestions(data.wrongQuestions);
  restoreProgressStats(data.progressStats);
}
```

## 🚀 性能優化建議

### 1. 題目緩存策略
```javascript
// LRU 緩存實現
class QuestionCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  get(questionId) {
    if (this.cache.has(questionId)) {
      // 移動到最近使用
      const value = this.cache.get(questionId);
      this.cache.delete(questionId);
      this.cache.set(questionId, value);
      return value;
    }
    return null;
  }
  
  set(questionId, question) {
    if (this.cache.size >= this.maxSize) {
      // 移除最久未使用
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(questionId, question);
  }
}
```

### 2. 懶加載題目數據
```javascript
// 按需加載題目
async function loadQuestionsOnDemand(subjectId, topicId = null) {
  const cacheKey = `${subjectId}_${topicId || 'all'}`;
  
  if (questionCache.has(cacheKey)) {
    return questionCache.get(cacheKey);
  }
  
  // 從文件或API加載
  const questions = await fetchQuestions(subjectId, topicId);
  questionCache.set(cacheKey, questions);
  
  return questions;
}
```

### 3. 批量操作優化
```javascript
// 批量更新進度數據
function batchUpdateProgress(updates) {
  // 合併多次更新為單次操作
  const mergedUpdate = updates.reduce((acc, update) => {
    // 合併邏輯
    return acc;
  }, {});
  
  // 單次寫入存儲
  saveProgressData(mergedUpdate);
}
```

---

**文檔版本**: 1.0  
**最後更新**: 2026-02-14 07:50 UTC  
**狀態**: ✅ 完成 - 可供開發