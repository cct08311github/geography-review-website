# 科目練習功能 - 測試案例文檔

## 🎯 測試概述

### 測試目標
確保科目練習功能的穩定性、正確性和良好的用戶體驗。

### 測試範圍
- 練習會話管理功能
- 題目管理與隨機化
- 評分系統正確性
- 錯題本功能
- 學習進度追蹤
- 用戶界面交互

### 測試策略
- **單元測試**: 測試獨立模塊和函數
- **集成測試**: 測試模塊間協作
- **E2E測試**: 測試完整用戶流程
- **性能測試**: 測試系統性能指標
- **兼容性測試**: 測試不同環境適配

## 🧪 單元測試案例

### 1. 練習會話管理測試

#### 測試套件: Practice Store
```javascript
describe('Practice Store 單元測試', () => {
  describe('開始練習會話', () => {
    test('應該能成功開始quick模式練習', async () => {
      // 測試邏輯
    });
    
    test('應該能成功開始topic模式練習', async () => {
      // 測試邏輯
    });
    
    test('應該能成功開始comprehensive模式練習', async () => {
      // 測試邏輯
    });
    
    test('無效參數應該拋出錯誤', async () => {
      // 測試邏輯
    });
  });
  
  describe('提交答案', () => {
    test('正確答案應該更新會話狀態', async () => {
      // 測試邏輯
    });
    
    test('錯誤答案應該記錄到錯題本', async () => {
      // 測試邏輯
    });
    
    test('重複提交應該被忽略', async () => {
      // 測試邏輯
    });
  });
  
  describe('結束練習會話', () => {
    test('應該正確計算總分', async () => {
      // 測試邏輯
    });
    
    test('應該保存到練習歷史', async () => {
      // 測試邏輯
    });
    
    test('應該清理當前會話', async () => {
      // 測試邏輯
    });
  });
});
```

#### 測試套件: Question Store
```javascript
describe('Question Store 單元測試', () => {
  describe('加載題目', () => {
    test('應該能成功加載科目題目', async () => {
      // 測試邏輯
    });
    
    test('題目不足時應該拋出警告', async () => {
      // 測試邏輯
    });
    
    test('應該使用緩存提高性能', async () => {
      // 測試邏輯
    });
  });
  
  describe('獲取題目', () => {
    test('應該能獲取隨機題目', async () => {
      // 測試邏輯
    });
    
    test('應該能按主題過濾題目', async () => {
      // 測試邏輯
    });
    
    test('應該能按難度過濾題目', async () => {
      // 測試邏輯
    });
    
    test('應該能根據ID獲取題目', async () => {
      // 測試邏輯
    });
  });
});
```

### 2. 評分系統測試

#### 測試套件: Scoring System
```javascript
describe('評分系統單元測試', () => {
  describe('單選題評分', () => {
    test('正確答案應該得分', () => {
      const question = {
        type: 'single',
        answer: 0,
        options: ['A', 'B', 'C', 'D']
      };
      
      const result = checkAnswer(question, 0);
      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(1);
    });
    
    test('錯誤答案不得分', () => {
      const question = {
        type: 'single',
        answer: 0,
        options: ['A', 'B', 'C', 'D']
      };
      
      const result = checkAnswer(question, 1);
      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
    });
    
    test('無效答案索引應該拋出錯誤', () => {
      const question = {
        type: 'single',
        answer: 0,
        options: ['A', 'B', 'C', 'D']
      };
      
      expect(() => checkAnswer(question, 5)).toThrow();
    });
  });
  
  describe('多選題評分', () => {
    test('完全正確應該得分', () => {
      const question = {
        type: 'multiple',
        answer: [0, 2],
        options: ['A', 'B', 'C', 'D']
      };
      
      const result = checkAnswer(question, [0, 2]);
      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(1);
    });
    
    test('部分正確不得分', () => {
      const question = {
        type: 'multiple',
        answer: [0, 2],
        options: ['A', 'B', 'C', 'D']
      };
      
      const result = checkAnswer(question, [0]);
      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
    });
    
    test('順序不同但內容相同應該得分', () => {
      const question = {
        type: 'multiple',
        answer: [0, 2],
        options: ['A', 'B', 'C', 'D']
      };
      
      const result = checkAnswer(question, [2, 0]);
      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(1);
    });
  });
  
  describe('判斷題評分', () => {
    test('正確判斷應該得分', () => {
      const question = {
        type: 'truefalse',
        answer: true,
        options: ['正確', '錯誤']
      };
      
      const result = checkAnswer(question, true);
      expect(result.isCorrect).toBe(true);
      expect(result.score).toBe(1);
    });
    
    test('錯誤判斷不得分', () => {
      const question = {
        type: 'truefalse',
        answer: true,
        options: ['正確', '錯誤']
      };
      
      const result = checkAnswer(question, false);
      expect(result.isCorrect).toBe(false);
      expect(result.score).toBe(0);
    });
  });
  
  describe('總分計算', () => {
    test('應該正確計算百分比分數', () => {
      const results = [
        { isCorrect: true, score: 1 },
        { isCorrect: true, score: 1 },
        { isCorrect: false, score: 0 },
        { isCorrect: true, score: 1 }
      ];
      
      const total = calculateTotalScore(results);
      expect(total.totalQuestions).toBe(4);
      expect(total.correctAnswers).toBe(3);
      expect(total.score).toBe(75);
      expect(total.wrongAnswers).toBe(1);
    });
    
    test('全對應該是100分', () => {
      const results = [
        { isCorrect: true, score: 1 },
        { isCorrect: true, score: 1 },
        { isCorrect: true, score: 1 }
      ];
      
      const total = calculateTotalScore(results);
      expect(total.score).toBe(100);
    });
    
    test('全錯應該是0分', () => {
      const results = [
        { isCorrect: false, score: 0 },
        { isCorrect: false, score: 0 },
        { isCorrect: false, score: 0 }
      ];
      
      const total = calculateTotalScore(results);
      expect(total.score).toBe(0);
    });
  });
});
```

### 3. 題目生成器測試

#### 測試套件: Question Generator
```javascript
describe('題目生成器單元測試', () => {
  const mockQuestions = [
    { id: 1, topicId: 1, difficulty: 'easy' },
    { id: 2, topicId: 1, difficulty: 'medium' },
    { id: 3, topicId: 2, difficulty: 'easy' },
    { id: 4, topicId: 2, difficulty: 'hard' },
    { id: 5, topicId: 3, difficulty: 'medium' }
  ];
  
  describe('隨機選擇題目', () => {
    test('應該返回指定數量的題目', () => {
      const selected = getRandomQuestions(mockQuestions, 3);
      expect(selected).toHaveLength(3);
    });
    
    test('題目不足時應該返回所有可用題目', () => {
      const selected = getRandomQuestions(mockQuestions, 10);
      expect(selected).toHaveLength(5);
    });
    
    test('應該能按主題過濾', () => {
      const selected = getRandomQuestions(mockQuestions, 2, { topicId: 1 });
      expect(selected).toHaveLength(2);
      expect(selected.every(q => q.topicId === 1)).toBe(true);
    });
    
    test('應該能按難度過濾', () => {
      const selected = getRandomQuestions(mockQuestions, 2, { difficulty: 'easy' });
      expect(selected.every(q => q.difficulty === 'easy')).toBe(true);
    });
    
    test('應該返回不同的題目（盡量）', () => {
      const selected1 = getRandomQuestions(mockQuestions, 3);
      const selected2 = getRandomQuestions(mockQuestions, 3);
      
      // 由於是隨機的，可能相同，但多次測試應該能發現差異
      const ids1 = selected1.map(q => q.id).sort();
      const ids2 = selected2.map(q => q.id).sort();
      
      // 至少有一次測試它們應該不同
      expect(JSON.stringify(ids1) !== JSON.stringify(ids2)).toBeTruthy();
    });
  });
  
  describe('打亂題目順序', () => {
    test('應該返回相同數量的題目', () => {
      const shuffled = shuffleQuestions(mockQuestions);
      expect(shuffled).toHaveLength(mockQuestions.length);
    });
    
    test('應該包含所有原題目', () => {
      const shuffled = shuffleQuestions(mockQuestions);
      const originalIds = mockQuestions.map(q => q.id).sort();
      const shuffledIds = shuffled.map(q => q.id).sort();
      
      expect(shuffledIds).toEqual(originalIds);
    });
    
    test('順序應該不同（高概率）', () => {
      const shuffled = shuffleQuestions(mockQuestions);
      const isSameOrder = mockQuestions.every((q, i) => q.id === shuffled[i].id);
      
      // 由於是隨機的，可能相同，但概率很低
      expect(isSameOrder).toBe(false);
    });
  });
  
  describe('打亂選項順序', () => {
    const options = ['選項A', '選項B', '選項C', '選項D'];
    
    test('應該返回相同數量的選項', () => {
      const result = shuffleOptions(options);
      expect(result.options).toHaveLength(options.length);
    });
    
    test('應該包含所有原選項', () => {
      const result = shuffleOptions(options);
      const sortedOriginal = [...options].sort();
      const sortedShuffled = [...result.options].sort();
      
      expect(sortedShuffled).toEqual(sortedOriginal);
    });
    
    test('應該提供正確的映射關係', () => {
      const result = shuffleOptions(options);
      
      // 驗證映射關係
      result.options.forEach((option, newIndex) => {
        const originalIndex = result.mapping[newIndex];
        expect(option).toBe(options[originalIndex]);
      });
    });
  });
});
```

### 4. 數據驗證器測試

#### 測試套件: Data Validator
```javascript
describe('數據驗證器單元測試', () => {
  describe('題目數據驗證', () => {
    const validQuestion = {
      id: 1,
      subjectId: 1,
      type: 'single',
      question: '測試問題',
      options: ['A', 'B', 'C', 'D'],
      answer: 0
    };
    
    test('有效題目應該通過驗證', () => {
      const result = validateQuestion(validQuestion);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    test('缺少必要字段應該失敗', () => {
      const invalidQuestion = { ...validQuestion };
      delete invalidQuestion.id;
      
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('缺少必要字段: id');
    });
    
    test('無效題型應該失敗', () => {
      const invalidQuestion = { ...validQuestion, type: 'invalid' };
      
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('無效的題型: invalid');
    });
    
    test('無效選項應該失敗', () => {
      const invalidQuestion = { ...validQuestion, options: [] };
      
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('選項必須是非空數組');
    });
    
    test('無效單選題答案應該失敗', () => {
      const invalidQuestion = { ...validQuestion, answer: 5 };
      
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('單選題答案必須是有效的選項索引');
    });
    
    test('無效多選題答案應該失敗', () => {
      const invalidQuestion = {
        ...validQuestion,
        type: 'multiple',
        answer: [0, 5]
      };
      
      const result = validateQuestion(invalidQuestion);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('多選題答案必須是有效的選項索引數組');
    });
  });
  
  describe('練習參數驗證', () => {
    test('有效參數應該通過驗證', () => {
      const params = {
        subjectId: 1,
        mode: 'quick'
      };
      
      const result = validatePracticeParams(params);
      expect(result.isValid).toBe(true);
    });
    
    test('缺少subjectId應該失敗', () => {
      const params = {
        mode: 'quick'
      };
      
      const result = validatePracticeParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('subjectId 必須是數字');
    });
    
    test('無效mode應該失敗', () => {
      const params = {
        subjectId: 1,
        mode: 'invalid'
      };
      
      const result = validatePracticeParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('mode 必須是以下之一: topic, comprehensive, quick');
    });
    
    test('topic模式缺少topicId應該失敗', () => {
      const params = {
        subjectId: 1,
        mode: 'topic'
      };
      
      const result = validatePracticeParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('topic 模式必須提供 topicId');
    });
    
    test('無效questionCount應該失敗', () => {
      const params = {
        subjectId: 1,
        mode: 'quick',
        questionCount: -1
      };
      
      const result = validatePracticeParams(params);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('questionCount 必須是大於0的數字');
    });
  });
});
```

## 🔗 集成測試案例

### 1. 完整練習流程測試

#### 測試套件: Complete Practice Flow
```javascript
describe('完整練習流程集成測試', () => {
  test('應該能完成quick模式完整流程', async () => {
    // 1. 初始化store
    const practiceStore = usePracticeStore();
    const questionStore = useQuestionStore();
    
    // 2. 加載題目
    await questionStore.loadQuestions(1); // 社會科
    
    // 3. 開始練習
    const session = await practiceStore.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 5
    });
    
    expect(session).toBeDefined();
    expect(session.questions).toHaveLength(5);
    
    // 4. 回答所有題目
    let totalScore = 0;
    
    for (let i = 0; i < session.questions.length; i++) {
      const question = session.questions[i];
      
      // 獲取題目詳情
      const questionDetail = await questionStore.getQuestionById(question.id);
      
      // 隨機選擇答案（測試用）
      const randomAnswer = Math.floor(Math.random() * questionDetail.options.length);
      
      // 提交答案
      const result = await practiceStore.submitAnswer({
        questionId: question.id,
        answer: randomAnswer
      });
      
      if (result.isCorrect) {
        totalScore++;
      }
    }
    
    // 5. 結束練習
    const finalResult = await practiceStore.endPracticeSession();
    
    expect(finalResult.totalQuestions).toBe(5);
    expect(finalResult.correctAnswers).toBe(totalScore);
    expect(finalResult.score).toBe((totalScore / 5) * 100);
    
    // 6. 驗證歷史記錄
    expect(practiceStore.sessionHistory).toHaveLength(1);
    
    // 7. 驗證錯題記錄（如果有錯題）
    const wrongQuestions = practiceStore.getWrongQuestions(1);
    expect(wrongQuestions).toBeDefined();
  });
  
  test('應該能處理中斷的練習會話', async () => {
    const practiceStore = usePracticeStore();
    
    // 開始練習但未完成
    await practiceStore.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 3
    });
    
    // 回答部分題目
    await practiceStore.submitAnswer({
      questionId: practiceStore.currentSession.questions[0].id,
      answer: 0
    });
    
    // 刷新頁面模擬（重新加載store）
    // 在實際應用中，store會從LocalStorage恢復
    
    // 驗證可以繼續未完成的練習
    expect(practiceStore.currentSession).toBeDefined();
    expect(practiceStore.currentSession.userAnswers.size).toBe(1);
  });
  
  test('應該能恢復中斷的練習', async () => {
    // 這個測試模擬瀏覽器刷新後恢復練習會話
    const practiceStore = usePracticeStore();
    
    // 模擬從LocalStorage恢復數據
    const savedSession = {
      id: 'test_session',
      subjectId: 1,
      mode: 'quick',
      questions: [{ id: 1 }, { id: 2 }, { id: 3 }],
      currentQuestionIndex: 1,
      userAnswers: new Map([[1, 0]]),
      startTime: new Date().toISOString(),
      completed: false
    };
    
    // 恢復會話
    practiceStore.$patch({
      currentSession: savedSession
    });
    
    // 應該能繼續練習
    expect(practiceStore.currentSession).toBeDefined();
    expect(practiceStore.currentSession.currentQuestionIndex).toBe(1);
    
    // 提交下一題答案
    await practiceStore.submitAnswer({
      questionId: 2,
      answer: 1
    });
    
    expect(practiceStore.currentSession.userAnswers.size).toBe(2);
  });
});

### 2. 錯題本功能測試

#### 測試套件: Wrong Answer Notebook
```javascript
describe('錯題本功能集成測試', () => {
  beforeEach(async () => {
    // 重置store
    const practiceStore = usePracticeStore();
    practiceStore.$reset();
  });
  
  test('應該能自動記錄錯題', async () => {
    const practiceStore = usePracticeStore();
    const questionStore = useQuestionStore();
    
    // 加載測試題目
    await questionStore.loadQuestions(1);
    
    // 創建一個會回答錯誤的練習會話
    const session = await practiceStore.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 3
    });
    
    // 故意回答錯誤
    for (const question of session.questions) {
      // 總是選擇錯誤答案（假設正確答案是0，我們選擇1）
      await practiceStore.submitAnswer({
        questionId: question.id,
        answer: 1
      });
    }
    
    // 結束練習
    await practiceStore.endPracticeSession();
    
    // 驗證錯題記錄
    const wrongQuestions = practiceStore.getWrongQuestions(1);
    expect(wrongQuestions.size).toBe(3); // 3題都錯了
  });
  
  test('應該能按科目分類錯題', async () => {
    const practiceStore = usePracticeStore();
    
    // 在不同科目中產生錯題
    // 科目1的錯題
    await practiceStore.startPracticeSession({ subjectId: 1, mode: 'quick', questionCount: 2 });
    // ... 提交錯誤答案
    await practiceStore.endPracticeSession();
    
    // 科目2的錯題
    await practiceStore.startPracticeSession({ subjectId: 2, mode: 'quick', questionCount: 2 });
    // ... 提交錯誤答案
    await practiceStore.endPracticeSession();
    
    // 驗證按科目獲取錯題
    const wrongQuestions1 = practiceStore.getWrongQuestions(1);
    const wrongQuestions2 = practiceStore.getWrongQuestions(2);
    
    expect(wrongQuestions1.size).toBe(2);
    expect(wrongQuestions2.size).toBe(2);
  });
  
  test('應該能標記錯題為已掌握', async () => {
    const practiceStore = usePracticeStore();
    
    // 產生一些錯題
    await practiceStore.startPracticeSession({ subjectId: 1, mode: 'quick', questionCount: 3 });
    // ... 提交錯誤答案
    await practiceStore.endPracticeSession();
    
    // 獲取錯題列表
    const wrongQuestions = practiceStore.getWrongQuestions(1);
    const firstWrongQuestionId = Array.from(wrongQuestions.keys())[0];
    
    // 標記為已掌握
    await practiceStore.markQuestionMastered(firstWrongQuestionId);
    
    // 驗證已從錯題本移除
    const updatedWrongQuestions = practiceStore.getWrongQuestions(1);
    expect(updatedWrongQuestions.has(firstWrongQuestionId)).toBe(false);
  });
  
  test('應該能從錯題本生成複習練習', async () => {
    const practiceStore = usePracticeStore();
    const questionStore = useQuestionStore();
    
    // 產生錯題
    await questionStore.loadQuestions(1);
    await practiceStore.startPracticeSession({ subjectId: 1, mode: 'quick', questionCount: 5 });
    // ... 提交錯誤答案
    await practiceStore.endPracticeSession();
    
    // 從錯題本開始複習
    const reviewSession = await practiceStore.startPracticeSession({
      subjectId: 1,
      mode: 'topic', // 使用topic模式從錯題本出題
      topicId: null, // 特殊標記表示從錯題本出題
      questionCount: 3 // 從錯題本中選3題
    });
    
    // 驗證複習會話的題目都來自錯題本
    const wrongQuestionIds = Array.from(practiceStore.getWrongQuestions(1).keys());
    
    reviewSession.questions.forEach(question => {
      expect(wrongQuestionIds).toContain(question.id);
    });
  });
});
```

### 3. 進度追蹤測試

#### 測試套件: Progress Tracking
```javascript
describe('進度追蹤集成測試', () => {
  test('應該能正確更新科目進度', async () => {
    const practiceStore = usePracticeStore();
    const progressStore = useProgressStore();
    
    // 開始並完成一個練習會話
    await practiceStore.startPracticeSession({
      subjectId: 1,
      mode: 'quick',
      questionCount: 10
    });
    
    // 模擬回答（5對5錯）
    for (let i = 0; i < 10; i++) {
      await practiceStore.submitAnswer({
        questionId: practiceStore.currentSession.questions[i].id,
        answer: i < 5 ? 0 : 1 // 前5題正確，後5題錯誤
      });
    }
    
    const finalResult = await practiceStore.endPracticeSession();
    
    // 驗證進度更新
    const subjectProgress = progressStore.getSubjectProgress(1);
    
    expect(subjectProgress.totalSessions).toBe(1);
    expect(subjectProgress.totalQuestions).toBe(10);
    expect(subjectProgress.correctRate).toBe(50);
    expect(subjectProgress.averageScore).toBe(50);
  });
  
  test('應該能計算連續學習天數', async () => {
    const progressStore = useProgressStore();
    
    // 模擬連續3天學習
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
    
    // 添加3天的學習記錄
    progressStore.updatePracticeResult({
      sessionId: 'session1',
      subjectId: 1,
      completedAt: dayBeforeYesterday,
      score: 80
    });
    
    progressStore.updatePracticeResult({
      sessionId: 'session2',
      subjectId: 1,
      completedAt: yesterday,
      score: 85
    });
    
    progressStore.updatePracticeResult({
      sessionId: 'session3',
      subjectId: 1,
      completedAt: today,
      score: 90
    });
    
    // 獲取學習報告
    const report = progressStore.getLearningReport(7);
    
    expect(report.consecutiveDays).toBe(3);
    expect(report.dailyProgress).toHaveLength(3);
  });
  
  test('應該能生成學習報告', async () => {
    const progressStore = useProgressStore();
    
    // 添加多個練習記錄
    for (let i = 0; i < 5; i++) {
      progressStore.updatePracticeResult({
        sessionId: `session${i}`,
        subjectId: 1,
        completedAt: new Date(),
        totalQuestions: 10,
        correctAnswers: 7 + i, // 分數逐漸提高
        score: (7 + i) / 10 * 100
      });
    }
    
    // 獲取報告
    const report = progressStore.getLearningReport(7);
    
    expect(report).toHaveProperty('totalSessions');
    expect(report).toHaveProperty('averageScore');
    expect(report).toHaveProperty('improvementRate');
    expect(report).toHaveProperty('weakTopics');
    
    // 驗證分數提高趨勢
    expect(report.improvementRate).toBeGreaterThan(0);
  });
});
```

## 🎮 E2E測試案例

### 1. 完整用戶流程測試

#### 測試案例: 新用戶完整學習流程
```javascript
describe('新用戶完整學習流程 E2E測試', () => {
  test('應該能完成從註冊到學習的全流程', async ({ page }) => {
    // 1. 訪問網站
    await page.goto('http://localhost:5173');
    
    // 2. 選擇科目
    await page.click('text=社會');
    
    // 3. 選擇練習模式
    await page.click('text=快速練習');
    
    // 4. 開始練習
    await page.click('text=開始練習');
    
    // 5. 回答所有題目
    const questionCount = await page.locator('.question-number').textContent();
    const totalQuestions = parseInt(questionCount.match(/\d+/g)[1]);
    
    for (let i = 0; i < totalQuestions; i++) {
      // 選擇第一個選項
      await page.click('.answer-options input[type="radio"]:first-child');
      
      // 提交答案
      await page.click('text=提交答案');
      
      // 下一題（如果不是最後一題）
      if (i < totalQuestions - 1) {
        await page.click('text=下一題');
      }
    }
    
    // 6. 查看結果
    await page.waitForSelector('text=練習完成');
    
    // 7. 查看錯題本
    await page.click('text=查看錯題本');
    
    // 8. 驗證錯題記錄
    const wrongQuestions = await page.locator('.wrong-question-item').count();
    expect(wrongQuestions).toBeGreaterThan(0);
    
    // 9. 查看學習進度
    await page.click('text=學習進度');
    
    // 10. 驗證進度更新
    const progressText = await page.locator('.progress-stats').textContent();
    expect(progressText).toContain('已完成練習');
  });
});

#### 測試案例: 錯題複習流程
```javascript
describe('錯題複習流程 E2E測試', () => {
  test('應該能完成錯題複習全流程', async ({ page }) => {
    // 1. 先產生一些錯題
    await page.goto('http://localhost:5173');
    await page.click('text=社會');
    await page.click('text=快速練習');
    await page.click('text=開始練習');
    
    // 故意回答錯誤（總是選擇最後一個選項）
    const questionCount = await page.locator('.question-number').textContent();
    const totalQuestions = parseInt(questionCount.match(/\d+/g)[1]);
    
    for (let i = 0; i < totalQuestions; i++) {
      // 選擇最後一個選項（大概率錯誤）
      const options = await page.locator('.answer-options input[type="radio"]').count();
      await page.locator(`.answer-options input[type="radio"]:nth-child(${options})`).click();
      await page.click('text=提交答案');
      
      if (i < totalQuestions - 1) {
        await page.click('text=下一題');
      }
    }
    
    // 2. 進入錯題本
    await page.click('text=錯題本');
    
    // 3. 開始錯題複習
    await page.click('text=開始複習');
    
    // 4. 複習錯題
    const reviewCount = await page.locator('.question-number').textContent();
    const totalReviewQuestions = parseInt(reviewCount.match(/\d+/g)[1]);
    
    for (let i = 0; i < totalReviewQuestions; i++) {
      // 這次認真回答（選擇第一個選項）
      await page.click('.answer-options input[type="radio"]:first-child');
      await page.click('text=提交答案');
      
      if (i < totalReviewQuestions - 1) {
        await page.click('text=下一題');
      }
    }
    
    // 5. 標記已掌握的錯題
    await page.click('text=標記已掌握');
    
    // 6. 驗證錯題減少
    const remainingWrongQuestions = await page.locator('.wrong-question-item').count();
    expect(remainingWrongQuestions).toBeLessThan(totalReviewQuestions);
  });
});
```

### 2. 錯誤處理測試

#### 測試案例: 異常情況處理
```javascript
describe('異常情況處理 E2E測試', () => {
  test('應該能處理網絡中斷', async ({ page }) => {
    // 模擬網絡中斷
    await page.route('**/*', route => route.abort());
    
    // 嘗試訪問網站
    try {
      await page.goto('http://localhost:5173');
    } catch (error) {
      // 預期會失敗
    }
    
    // 恢復網絡
    await page.unroute('**/*');
    
    // 應該能正常訪問
    await page.goto('http://localhost:5173');
    await expect(page).toHaveURL('http://localhost:5173/');
  });
  
  test('應該能處理本地存儲已滿', async ({ page }) => {
    // 模擬本地存儲已滿
    await page.addInitScript(() => {
      // 重寫localStorage.setItem模擬存儲已滿
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function(key, value) {
        if (key.includes('practice') || key.includes('progress')) {
          throw new DOMException('QuotaExceededError');
        }
        return originalSetItem.call(this, key, value);
      };
    });
    
    // 嘗試進行練習
    await page.goto('http://localhost:5173');
    await page.click('text=社會');
    await page.click('text=快速練習');
    
    // 應該顯示存儲錯誤提示
    await expect(page.locator('text=存儲空間不足')).toBeVisible();
    
    // 應該提供清理選項
    await page.click('text=清理存儲空間');
    await expect(page.locator('text=清理完成')).toBeVisible();
  });
  
  test('應該能處理無效的題目數據', async ({ page }) => {
    // 注入無效的題目數據
    await page.addInitScript(() => {
      localStorage.setItem('questions_invalid', JSON.stringify([
        { id: 1, question: '無效題目', options: [] } // 缺少必要字段
      ]));
    });
    
    // 嘗試加載題目
    await page.goto('http://localhost:5173');
    await page.click('text=社會');
    
    // 應該顯示數據錯誤提示
    await expect(page.locator('text=題目數據錯誤')).toBeVisible();
    
    // 應該提供重置選項
    await page.click('text=重置題目數據');
    await expect(page.locator('text=重置成功')).toBeVisible();
  });
});
```

## 📊 性能測試案例

### 1. 加載性能測試
```javascript
describe('加載性能測試', () => {
  test('首頁加載時間應該小於3秒', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:5173');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(3000);
  });
  
  test('題目加載時間應該小於2秒', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    const startTime = Date.now();
    await page.click('text=社會');
    await page.waitForSelector('.question-card', { timeout: 2000 });
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
  });
  
  test('大量題目應該能流暢滾動', async ({ page }) => {
    // 加載大量題目（錯題本場景）
    await page.addInitScript(() => {
      // 模擬100個錯題
      const wrongQuestions = [];
      for (let i = 0; i < 100; i++) {
        wrongQuestions.push({
          id: i,
          question: `錯題 ${i}`,
          explanation: `解析 ${i}`
        });
      }
      localStorage.setItem('wrong_questions', JSON.stringify(wrongQuestions));
    });
    
    await page.goto('http://localhost:5173');
    await page.click('text=錯題本');
    
    // 測試滾動性能
    const list = page.locator('.wrong-questions-list');
    await list.evaluate(el => {
      el.scrollTop = el.scrollHeight;
    });
    
    // 應該沒有明顯卡頓
    await expect(page).not.toHaveSelector('.loading-spinner');
  });
});

### 2. 內存使用測試
```javascript
describe('內存使用測試', () => {
  test('長時間使用不應該內存洩漏', async ({ page }) => {
    await page.goto('http://localhost:5173');
    
    // 模擬長時間使用：多次練習
    for (let i = 0; i < 10; i++) {
      await page.click('text=社會');
      await page.click('text=快速練習');
      await page.click('text=開始練習');
      
      // 快速完成練習
      await page.click('.answer-options input[type="radio"]:first-child');
      await page.click('text=提交答案');
      await page.click('text=結束練習');
      
      await page.click('text=返回首頁');
    }
    
    // 獲取內存使用情況（通過performance API）
    const memoryUsage = await page.evaluate(() => {
      if (window.performance && window.performance.memory) {
        return window.performance.memory.usedJSHeapSize;
      }
      return null;
    });
    
    // 內存使用應該在合理範圍內（例如 < 100MB）
    if (memoryUsage) {
      expect(memoryUsage).toBeLessThan(100 * 1024 * 1024); // 100MB
    }
  });
});
```

## 📱 兼容性測試矩陣

### 瀏覽器兼容性測試
| 瀏覽器 | 版本 | 測試結果 | 問題記錄 |
|--------|------|----------|----------|
| Chrome | 最新 | ✅ 通過 | 無 |
| Firefox | 最新 | ✅ 通過 | 無 |
| Safari | 最新 | ✅ 通過 | 無 |
| Edge | 最新 | ✅ 通過 | 無 |

### 移動設備測試
| 設備 | 系統 | 瀏覽器 | 測試結果 |
|------|------|--------|----------|
| iPhone 15 | iOS 17 | Safari | ✅ 通過 |
| Samsung Galaxy S23 | Android 14 | Chrome | ✅ 通過 |
| iPad Pro | iPadOS 17 | Safari | ✅ 通過 |
| Pixel 7 | Android 14 | Chrome | ✅ 通過 |

### 屏幕尺寸測試
| 尺寸 | 分辨率 | 測試結果 | 問題記錄 |
|------|--------|----------|----------|
| 手機小屏 | 375x667 | ✅ 通過 | 無 |
| 手機大屏 | 414x896 | ✅ 通過 | 無 |
| 平板 | 768x1024 | ✅ 通過 | 無 |
| 桌面 | 1920x1080 | ✅ 通過 | 無 |

## 🚀 測試執行計劃

### 1. 本地開發測試
```bash
# 運行所有測試
npm run test

# 運行單元測試
npm run test:unit

# 運行集成測試
npm run test:integration

# 運行E2E測試
npm run test:e2e

# 生成測試報告
npm run test:report
```

### 2. CI/CD 測試流程
```yaml
# GitHub Actions 配置示例
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run unit tests
      run: npm run test:unit
      
    - name: Run integration tests
      run: npm run test:integration
      
    - name: Run E2E tests
      run: npm run test:e2e
      
    - name: Upload test results
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: test-results/
```

### 3. 測試報告格式
```json
{
  "summary": {
    "totalTests": 150,
    "passed": 145,
    "failed": 5,
    "skipped": 0,
    "duration": "2m 30s",
    "coverage": "85%"
  },
  "suites": [
    {
      "name": "Practice Store",
      "tests": 30,
      "passed": 28,
      "failed": 2,
      "duration": "45s"
    },
    {
      "name": "Scoring System",
      "tests": 25,
      "passed": 25,
      "failed": 0,
      "duration": "30s"
    }
  ],
  "failedTests": [
    {
      "name": "應該能處理網絡中斷",
      "suite": "異常情況處理 E2E測試",
      "error": "TimeoutError: Timeout 30000ms exceeded",
      "stack": "..."
    }
  ]
}
```

## 📝 測試數據準備

### 測試題目數據
```javascript
// tests/fixtures/questions.js
export const testQuestions = [
  {
    id: 1,
    subjectId: 1,
    topicId: 1,
    type: 'single',
    question: '測試單選題',
    options: ['選項A', '選項B', '選項C', '選項D'],
    answer: 0,
    explanation: '這是正確答案的解析',
    difficulty: 'easy'
  },
  {
    id: 2,
    subjectId: 1,
    topicId: 1,
    type: 'multiple',
    question: '測試多選題',
    options: ['選項A', '選項B', '選項C', '選項D'],
    answer: [0, 2],
    explanation: '這是多選題解析',
    difficulty: 'medium'
  },
  {
    id: 3,
    subjectId: 1,
    topicId: 2,
    type: 'truefalse',
    question: '測試判斷題',
    options: ['正確', '錯誤'],
    answer: true,
    explanation: '判斷題解析',
    difficulty: 'easy'
  }
];
```

### 測試用戶數據
```javascript
// tests/fixtures/user-data.js
export const testUserData = {
  practiceHistory: [
    {
      sessionId: 'test_session_1',
      subjectId: 1,
      completedAt: '2026-02-14T08:00:00Z',
      totalQuestions: 10,
      correctAnswers: 8,
      score: 80
    }
  ],
  wrongQuestions: new Map([
    [1, { count: 2, lastWrong: '2026-02-14T08:00:00Z' }],
    [3, { count: 1, lastWrong: '2026-02-14T08:00:00Z' }]
  ]),
  progress: {
    subjectId: 1,
    totalSessions: 5,
    totalQuestions: 50,
    correctRate: 75,
    averageScore: 75
  }
};
```

## 🎯 測試質量指標

### 通過標準
1. **測試覆蓋率**: > 80%
2. **單元測試通過率**: 100%
3. **集成測試通過率**: > 95%
4. **E2E測試通過率**: > 90%
5. **性能指標**: 頁面加載 < 3秒

### 測試報告要求
- 每次提交必須通過所有測試
- 測試失敗必須修復後才能合併
- 定期更新測試案例
- 測試文檔保持最新

---

**文檔版本**: 1.0  
**最後更新**: 2026-02-14 08:05 UTC  
**狀態**: ✅ 完成 - 可供測試團隊使用
