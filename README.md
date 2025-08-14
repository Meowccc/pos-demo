# POS 雙顯示器系統

這是一個使用 React + styled-components + React Router 開發的雙顯示器 POS 系統演示，支援營業員操作介面和客戶顯示器。

## 功能特色

- **雙顯示器支援**: 營業員操作介面和客戶顯示器
- **路由系統**: 使用 React Router 區分不同顯示器的路徑
- **即時通訊**: 使用 BroadcastChannel API 實現兩個顯示器之間的即時通訊
- **現代化 UI**: 使用 styled-components 打造美觀的使用者介面
- **響應式設計**: 適配不同螢幕尺寸
- **訂單管理**: 完整的訂單建立、查看和管理功能
- **除錯資訊**: 即時顯示連接狀態和通訊狀態
- **營業管理**: 結束營業功能和歡迎畫面
- **動畫效果**: 豐富的 CSS 動畫和視覺效果

## 技術架構

- **前端框架**: React 18
- **路由管理**: React Router DOM
- **樣式方案**: styled-components
- **通訊機制**: BroadcastChannel API

## 安裝與運行

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 在瀏覽器中開啟：
   - 首頁：http://localhost:3000
   - 營業員介面：http://localhost:3000/staff
   - 客戶顯示器：http://localhost:3000/customer

## 路由結構

- `/` - 首頁，提供導航選項
- `/staff` - 營業員操作介面
- `/customer` - 客戶顯示器
- `/*` - 自動重定向到首頁

## 使用方式

### 營業員操作介面 (/staff)

1. **查看訂單列表**: 左側顯示所有已建立的訂單
2. **建立新訂單**: 
   - 點擊右側的商品按鈕添加商品
   - 點擊「建立訂單」完成訂單建立
3. **選擇訂單**: 點擊訂單列表中的任一訂單，客戶顯示器會同步顯示
4. **清除訂單**: 點擊「清除」按鈕清除當前正在建立的訂單
5. **結束營業**: 點擊「結束營業」按鈕，客戶顯示器會顯示結束畫面
6. **連接狀態**: 左上角顯示與客戶顯示器的連接狀態
7. **除錯資訊**: 左下角顯示即時的通訊狀態

### 客戶顯示器 (/customer)

1. **歡迎畫面**: 系統啟動時顯示歡迎畫面，包含時間顯示
2. **即時顯示**: 自動接收營業員的操作訊息
3. **訂單資訊**: 顯示訂單編號、客戶名稱、品項和總金額
4. **建立中狀態**: 營業員添加商品時顯示特殊的建立中畫面
5. **結束營業**: 營業員點擊結束營業時顯示感謝畫面
6. **連接狀態**: 左上角顯示與營業員介面的連接狀態
7. **除錯資訊**: 左下角顯示即時的通訊狀態

## 顯示器狀態

### 客戶顯示器狀態流程：

1. **歡迎畫面** 👋
   - 系統啟動時顯示
   - 包含歡迎訊息和當前時間
   - 淡入動畫效果

2. **建立中訂單** 🔄
   - 營業員添加商品時顯示
   - 黃色漸層背景
   - 脈動動畫效果

3. **完成訂單** ✅
   - 訂單建立完成後顯示
   - 藍色邊框正常顯示
   - 完整訂單資訊

4. **營業結束** 🏪
   - 營業員點擊結束營業時顯示
   - 深色背景
   - 滑入動畫效果

## 通訊機制

### BroadcastChannel API

系統使用 BroadcastChannel API 實現兩個顯示器之間的即時通訊：

- **通道名稱**: `pos_channel`
- **通訊方式**: 原生跨標籤頁/視窗通訊
- **即時性**: 真正的即時雙向通訊
- **效能**: 最佳效能，無需輪詢

### 訊息類型
- `NEW_ORDER`: 新訂單建立
- `SELECT_ORDER`: 選擇現有訂單
- `BUILDING_ORDER`: 正在建立訂單
- `CLEAR_ORDER`: 清除訂單
- `END_SESSION`: 結束營業

### 通訊流程
```
營業員介面 → BroadcastChannel → 客戶顯示器
     ↓              ↓              ↓
   發送訊息    即時傳遞      立即顯示
```

## 雙顯示器測試

要測試雙顯示器功能，您可以：

1. **開啟兩個瀏覽器視窗**:
   - 一個視窗開啟 http://localhost:3000/staff
   - 另一個視窗開啟 http://localhost:3000/customer

2. **開啟兩個瀏覽器標籤**:
   - 一個標籤開啟 /staff 路徑
   - 另一個標籤開啟 /customer 路徑

3. **使用不同瀏覽器**:
   - 一個瀏覽器開啟營業員介面
   - 另一個瀏覽器開啟客戶介面

## 除錯功能

系統提供即時的除錯資訊：

- **連接狀態**: 顯示是否成功建立 BroadcastChannel 連接
- **通訊狀態**: 顯示訊息發送和接收的狀態
- **錯誤處理**: 當通訊失敗時會顯示錯誤資訊

## 動畫效果

### CSS 動畫
- **淡入效果**: 歡迎畫面載入時
- **脈動效果**: 建立中訂單的視覺提示
- **彈跳效果**: 歡迎圖標的活潑動畫
- **滑入效果**: 營業結束畫面的轉場
- **搖晃效果**: 營業結束圖標的強調

## 項目結構

```
src/
├── components/
│   ├── StaffDisplay.js    # 營業員操作介面
│   └── CustomerDisplay.js # 客戶顯示器
├── services/
│   └── CommunicationService.js # 通訊服務
├── App.js                 # 主應用組件 (包含路由)
└── index.js              # 應用入口
```

## 自定義配置

### 修改商品列表
在 `StaffDisplay.js` 中修改 `products` 陣列：

```javascript
const products = [
  { name: '商品名稱', price: 價格 },
  // 添加更多商品...
];
```

### 修改樣式
使用 styled-components 自定義樣式，所有樣式都在對應的組件文件中定義。

### 修改路由
在 `App.js` 中修改路由配置：

```javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/staff" element={<StaffDisplay />} />
  <Route path="/customer" element={<CustomerDisplay />} />
</Routes>
```

### 修改歡迎訊息
在 `CustomerDisplay.js` 中修改歡迎畫面的內容：

```javascript
<WelcomeTitle>自定義歡迎標題</WelcomeTitle>
<WelcomeSubtitle>自定義歡迎副標題</WelcomeSubtitle>
```

### 自定義通訊服務
在 `CommunicationService.js` 中可以：
- 修改 BroadcastChannel 通道名稱
- 自定義錯誤處理邏輯
- 添加訊息驗證機制

## 瀏覽器支援

### BroadcastChannel API 支援

| 瀏覽器 | 版本 | 支援狀態 |
|--------|------|----------|
| Chrome | 54+ | ✅ |
| Firefox | 38+ | ✅ |
| Safari | 15.4+ | ✅ |
| Edge | 79+ | ✅ |
| IE | 所有版本 | ❌ |

## 注意事項

1. **BroadcastChannel API 需要 HTTPS 環境或 localhost**
2. **確保兩個顯示器使用相同的域名和端口**
3. **建議使用現代瀏覽器以獲得最佳體驗**
4. **某些企業環境可能限制 BroadcastChannel 的使用**

## 開發說明

這個專案展示了如何使用現代 Web 技術實現雙顯示器 POS 系統，包含：

- React Router 路由管理
- BroadcastChannel API 即時通訊
- styled-components 樣式管理
- 響應式設計
- 錯誤處理機制
- 豐富的動畫效果
- 完整的營業管理功能

可以作為實際 POS 系統開發的參考範例。 