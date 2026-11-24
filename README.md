# 莓好大湖｜觀光草莓園網站

以 React、Vite、Tailwind CSS 與 Lucide React 建置的行動優先單頁網站。預約、果況、季節模式、購物車與模擬訂單都保存在瀏覽器 `localStorage`，重新整理後仍會保留。

## 本地啟動

需要 Node.js 18 或更新版本。

```bash
npm install
npm run dev
```

開啟終端機顯示的本機網址即可預覽。正式建置：

```bash
npm run build
npm run preview
```

## Render 部署（Static Site）

1. 將專案推送到 GitHub。
2. 在 Render 建立 **Static Site** 並連結此 GitHub repository。
3. Build Command：`npm install && npm run build`
4. Publish Directory：`dist`
5. 部署即可。`public/_redirects` 已設定 SPA fallback，重新整理頁面時會回到首頁。

此專案不需要環境變數或外部資料庫。網站圖片使用 Unsplash 圖片網址；地圖使用 Google Maps embed。請在正式營運前替換園區地址、電話、LINE 官方帳號與實際檢驗報告資訊。管理台是免密碼的本機展示流程，資料只會保存在使用者目前的瀏覽器，不會跨裝置同步；金流亦為模擬流程。

## 主要功能

- 即時果況、斤價、開放品種與旺季／淡季模式管理
- 採果時段預約與電子憑證展示
- 低溫宅配商品、購物車、免運門檻與模擬結帳
- 預約清單與訂單管理
- 園區介紹、交通地圖、周邊景點、FAQ 與行動版固定預約按鈕
