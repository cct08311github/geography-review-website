# 國中會考總複習系統

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

## 🌟 專案簡介

這是一個為國中三年級學生設計的**國中會考總複習系統**，提供完整的5大科目（國文、英語、數學、自然、社會）複習方案。系統包含模擬會考、智能錯題本、題目隨機化等先進功能，幫助學生高效準備會考。專案使用現代化的前端技術棧開發。

## 🚀 線上演示

**網站已部署至 GitHub Pages：**
👉 **[https://cct08311github.github.io/geography-review-website/](https://cct08311github.github.io/geography-review-website/)**

## 📋 功能特色

### 🎯 核心功能
1. **總複習系統首頁** - 5大科目導航與功能介紹
2. **模擬會考系統** - 正式考試題數與時間模擬
3. **科目專項練習** - 國文、英語、數學、自然、社會分科練習
4. **智能錯題本** - 自動記錄錯題，提供針對性複習
5. **題目隨機化** - 每次練習題目和選項順序都不同

### 📚 學習內容
- **5大科目完整覆蓋**：國文、英語、數學、自然、社會
- **科目主題細分**：每個科目3-5個重點主題
- **會考重點整理**：近5年考試趨勢與重點分析
- **智能學習路徑**：根據錯題分析推薦學習內容

### 🧪 練習系統
- **1000+題目庫目標**：5大科目完整題庫（持續擴充中）
- **模擬會考模式**：正式考試環境模擬
- **即時評分系統**：測驗後立即查看結果與解析
- **難度分級系統**：基礎、進階、挑戰三個等級
- **題目隨機化**：避免死記硬背，真正掌握知識

### 📊 智能功能
- **錯題自動記錄**：答錯題目自動加入錯題本
- **弱點科目分析**：統計各科目錯誤率，找出學習弱點
- **學習進度追蹤**：主題完成度、測驗成績分析
- **數據持久化**：LocalStorage自動保存學習數據

## 🛠 技術棧

- **前端框架**: Vue.js 3.4.0
- **UI 框架**: Vuetify 3.5.0
- **狀態管理**: Pinia 2.1.0
- **路由管理**: Vue Router 4.2.0
- **構建工具**: Vite 5.0.0
- **部署平台**: GitHub Pages
- **圖標庫**: Material Design Icons

## 📁 專案結構

```
geography-review-website/
├── src/
│   ├── views/              # 頁面組件
│   │   ├── HomeView.vue    # 首頁
│   │   ├── StudyView.vue   # 學習中心（地理）
│   │   ├── PracticeView.vue # 練習中心（地理）
│   │   ├── NewPracticeView.vue # 總複習系統主界面
│   │   ├── SubjectPracticeView.vue # 科目練習頁面
│   │   ├── ExamTakingView.vue # 模擬考試頁面
│   │   ├── WrongAnswerReviewView.vue # 錯題本頁面
│   │   ├── ProgressView.vue # 進度報告
│   │   └── SettingsView.vue # 設定頁面
│   ├── data/               # 數據文件
│   │   ├── subjects.js     # 5大科目定義
│   │   ├── question-manager.js # 題目管理系統
│   │   ├── taiwan-geography.js # 台灣地理數據
│   │   ├── quizzes.js      # 基礎練習題庫
│   │   └── expanded-geography-quizzes.js # 擴充地理題庫
│   ├── store/              # 狀態管理
│   │   └── progress.js     # 進度狀態
│   ├── router/             # 路由配置
│   │   └── index.js
│   ├── App.vue             # 根組件
│   └── main.js             # 入口文件
├── public/                 # 靜態資源
├── .github/workflows/      # GitHub Actions
│   └── deploy.yml          # 部署配置
├── vite.config.js          # Vite 配置
├── package.json           # 依賴配置
├── README.md              # 項目說明
└── NEW_FEATURES_REPORT.md # 新功能報告
```

## 🚀 本地開發

### 環境要求
- Node.js 18+ 
- npm 9+

### 安裝與運行
```bash
# 克隆項目
git clone https://github.com/cct08311github/geography-review-website.git
cd geography-review-website

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build

# 預覽構建結果
npm run preview
```

### 開發服務器
- 本地地址：http://localhost:5173/
- 熱重載：支持
- ESLint：集成

## 📦 部署

### GitHub Pages 自動部署
項目配置了 GitHub Actions 工作流，當代碼推送到 `main` 分支時會自動部署到 GitHub Pages。

部署流程：
1. 代碼推送到 `main` 分支
2. GitHub Actions 觸發構建
3. 構建 Vue.js 應用
4. 部署到 GitHub Pages
5. 網站自動更新

### 手動部署
```bash
# 構建項目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 🎨 設計特色

### 響應式設計
- 適配手機、平板、桌面設備
- 自適應佈局
- 觸摸友好界面

### 用戶體驗
- 直觀的導航系統
- 清晰的視覺層次
- 流暢的頁面過渡
- 即時反饋機制

### 無障礙設計
- 語義化 HTML 結構
- 鍵盤導航支持
- 對比度符合 WCAG 標準

## 📈 專案時間線

### 第一階段：地理會考複習網站
- **啟動時間**: 2026年2月13日
- **開發時長**: 24小時緊急交付
- **完成時間**: 2026年2月14日
- **主要功能**: 台灣地理10大主題 + 200+題目

### 第二階段：國中會考總複習系統
- **升級時間**: 2026年2月14日
- **開發時長**: 2小時快速升級
- **完成時間**: 2026年2月14日
- **主要功能**: 5大科目 + 模擬會考 + 智能錯題本 + 題目隨機化

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request 來改進項目！

1. Fork 本項目
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 許可證

本項目採用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 🙏 致謝

- 感謝 Vue.js 團隊提供的優秀框架
- 感謝 Vuetify 團隊提供的精美 UI 組件
- 感謝 GitHub 提供的免費部署平台
- 感謝所有貢獻者和用戶的反饋

## 📞 聯繫方式

如有問題或建議，請通過以下方式聯繫：

- GitHub Issues: [問題反饋](https://github.com/cct08311github/geography-review-website/issues)
- 電子郵件: cct08311github@gmail.com

---

**專案狀態**: 🚀 已升級為國中會考總複習系統  
**系統版本**: v2.0.0  
**最後更新**: 2026年2月14日  
**核心功能**: 5大科目總複習 + 模擬會考 + 智能錯題本