# Open Voter — 政治人物履歷檔案系統（Person Profile System）

## 目標

建立以「政治人物」為核心的跨屆履約追蹤架構。讓選民能從任意年份的候選人頁面，一鍵連結到該人物的完整歷屆政見檔案，判斷其政見可信度。

---

## 📦 資料結構

### `data/persons.json`（新檔案）

```json
{
  "persons": {
    "lai_ching-te": {
      "name": "賴清德",
      "party": "民主進步黨",
      "elections": [
        {
          "year": 2024,
          "type": "總統大選",
          "role": "候選人",
          "result": "當選",
          "runningMate": "蕭美琴",
          "pledgeSource": "internal:2024_president_lai",
          "pageUrl": "/open_voter/pages/2024/president_lai.html",
          "pledgeCount": 12,
          "completedCount": 2
        },
        {
          "year": 2020,
          "type": "總統大選",
          "role": "副總統候選人",
          "result": "當選",
          "runningMate": "蔡英文",
          "pledgeSource": "internal:2020_president_lai",
          "pageUrl": null,
          "pledgeCount": 8,
          "completedCount": 5
        }
      ]
    },
    "hou_you-yi": {
      "name": "侯友宜",
      "party": "中國國民黨",
      "elections": [
        {
          "year": 2024,
          "type": "總統大選",
          "role": "候選人",
          "result": "未當選",
          "runningMate": "趙少康",
          "pledgeSource": "internal:2024_president_hou",
          "pageUrl": "/open_voter/pages/2024/president_hou.html",
          "pledgeCount": 10,
          "completedCount": 0
        },
        {
          "year": 2018,
          "type": "新北市長",
          "role": "候選人",
          "result": "當選",
          "runningMate": null,
          "pledgeSource": "internal:2018_new_taipei_hou",
          "pageUrl": null,
          "pledgeCount": 15,
          "completedCount": 8
        }
      ]
    }
    // ... 其他人物
  }
}
```

### `data/candidates.json` 中各候選人政見的 `id` 對應

在 `candidates.json` 的每個候選人政見區塊加入 `personId` 欄位，連結到 `persons.json`。

---

## 🌐 頁面架構

### 1. 人物總覽頁 `/open_voter/persons.html`

- 所有政治人物卡片列表（依年份/政黨篩選）
- 每張卡片顯示：姓名、黨籍、歷屆選舉記錄簡覽、總達成率雷達指數
- 點擊卡片進入個人履歷檔案頁

### 2. 個人履歷檔案頁 `/open_voter/person/{id}.html`

（可用 URL 參數如 `?id=lai_ching-te` 動態render，或預先產生靜態頁）

**內容區塊：**

#### A. 人物基本資訊
- 姓名、黨籍、出生年份
- 選舉經歷時間軸（年份、地點、職位、當選/落選）

#### B. 跨屆政見履約總覽
- 圓環進度圖：歷年總達成率
- 各屆達成率長條圖並列比較
- 各分類（能源、國防...）在歷屆的達成雷達圖

#### C. 歷屆政見詳情（折疊區塊）
- 每屆一個折疊區，展開後顯示該屆所有政見與狀態
- 引用候選人頁面的原始資料（從 `persons.json` 的 `pledgeSource` 讀取）

#### D. 可信度評估指標
- 「平均達成率」：所有年份的平均
- 「最佳領域」：達成率最高的分類
- 「待加強領域」：達成率最低的分類
- 「跳票紀錄」：狀態為「未達成」的政見數

#### E. 外部連結
- 連結到各年份的原始候選人頁面

---

## 🔗 連結整合

### 從候選人頁面新增「人物檔案」按鈕

在每個候選人頁面（如 `president_lai.html`）的候選人抬頭區塊，加入：

```html
<a href="/open_voter/person/lai_ching-te.html" class="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
  📋 查看完整履歷檔案
</a>
```

### 從年份頁面識別有檔案的人物

在 `pages/index.html`、`pages/2024.html`、`pages/2026.html` 中，候選人卡片上顯示「📋 有歷屆記錄」標籤。

---

## 📝 實作範圍（第一階段 MVP）

1. ✅ 建立 `data/persons.json`，至少包含：
   - 2024 總統候選人（賴清德、侯友宜、柯文哲）
   - 2026 部分縣長候選人（例如台中市江啟臣、何欣純）

2. ✅ 建立 `persons.html` 人物總覽頁

3. ✅ 建立 `person.html` 個人檔案頁（通用模板，URL 參數切換）

4. ✅ 在 2024 總統候選人頁面（`president_lai.html`、`president_hou.html`、`president_ko.html`）加入「查看完整履歷檔案」連結

5. ✅ 預留 Chart.js 視覺化（跨屆進度圖、雷達圖）

---

## ⚠️ 技術備註

- 使用 Chart.js 達成視覺化（CDN 已引入）
- 現有 `candidates.json` 政見資料作為 `pledgeSource`，**不重複儲存政見內容**
- `persons.json` 只存放「人物中索引」，指向 `candidates.json` 的具體政見
- HTML 中使用 `/open_voter/` 路徑前綴（GitHub Pages 子目錄相容性）

---

## ✅ 交付檢查清單

- [ ] `data/persons.json` 建立完成
- [ ] `pages/persons.html` 人物總覽頁完成
- [ ] `pages/person.html` 個人檔案頁完成（URL 參數驅動）
- [ ] 2024 總統三人頁面加入「人物檔案」連結
- [ ] 視覺化圖表呈現正常
- [ ] 無簡體字，相關文字一律使用繁體
