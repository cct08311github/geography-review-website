#!/bin/bash

echo "🔍 檢查 GitHub Pages 部署狀態"
echo "======================================"

# 檢查倉庫信息
echo "📦 倉庫信息:"
echo "  - 名稱: geography-review-website"
echo "  - 所有者: cct08311github"
echo "  - URL: https://github.com/cct08311github/geography-review-website"

echo ""
echo "🚀 部署狀態:"

# 檢查 GitHub Actions 運行狀態
echo "正在檢查 GitHub Actions 狀態..."
RUNS=$(gh run list --workflow=deploy.yml --limit=3 --json status,conclusion,createdAt,url 2>/dev/null || echo "[]")

if [ "$RUNS" != "[]" ]; then
    echo "  ✅ GitHub Actions 工作流已配置"
    
    # 解析最新運行狀態
    LATEST_RUN=$(echo "$RUNS" | jq -r '.[0] | "狀態: \(.status), 結果: \(.conclusion // "進行中"), 時間: \(.createdAt)"' 2>/dev/null || echo "狀態: 檢查中")
    echo "  📊 最新運行: $LATEST_RUN"
else
    echo "  ⚠️  GitHub Actions 工作流未找到或未運行"
fi

echo ""
echo "🌐 預計訪問網址:"
echo "  - https://cct08311github.github.io/geography-review-website/"
echo ""
echo "📁 倉庫內容:"
echo "  - 源代碼: 完整 Vue.js 3 項目"
echo "  - 數據: 台灣地理10大主題 + 200+題目"
echo "  - 部署: GitHub Pages 自動部署"
echo ""
echo "⏳ 部署完成時間:"
echo "  - GitHub Actions 通常需要 2-5 分鐘完成部署"
echo "  - 首次部署可能需要稍長時間"
echo ""
echo "🔧 手動檢查步驟:"
echo "  1. 訪問 https://github.com/cct08311github/geography-review-website/actions"
echo "  2. 查看最新的 'Deploy to GitHub Pages' 工作流"
echo "  3. 等待狀態變為 'completed'"
echo "  4. 訪問 https://cct08311github.github.io/geography-review-website/"
echo ""
echo "📞 問題排查:"
echo "  - 如果網站無法訪問，請等待幾分鐘後重試"
echo "  - 檢查 GitHub Actions 是否有錯誤"
echo "  - 確保倉庫設置中已啟用 GitHub Pages"
echo ""
echo "✅ 部署流程已完成初始化!"