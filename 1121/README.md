# UNU LIFE｜聯大生活圈

Next.js + TypeScript + Supabase 專案，手機/桌面響應式。

## 功能
- 首頁、美食分類/菜單、苗栗景點展示
- Supabase Auth 會員登入/註冊/登出
- 購物車、備註、訂單送出與會員訂單列表
- 訂單由 PostgreSQL RPC 查詢菜單價格並計算總額，避免前端竄改價格
- 2D 像素校園、方向鍵/WASD/觸控移動
- Supabase Realtime 廣播角色位置、即時聊天室
- 店家訂單管理頁及店家狀態更新 RPC

## 重要限制
店家與餐點是虛構示範資料，不代表真實合作店家。多人同步及聊天需設定 Supabase Realtime。店家後台需先核實店家身分，再由管理者在 `restaurants.owner_id` 綁定店家帳號 UUID。這個版本沒有線上刷卡、外送派單、退款、庫存、完整店家菜單 CRUD，也尚未完成聊天室檢舉/封鎖管理介面；因此目前是可繼續開發的功能原型，不可直接當正式商業訂餐服務營運。

## 本機啟動
需求 Node.js 20.9+。
```bash
npm install
cp .env.example .env.local
npm run dev
```
Windows PowerShell 複製環境檔：`Copy-Item .env.example .env.local`。開啟 http://localhost:3000 。

## Supabase
1. 建立 Supabase 專案：https://supabase.com
2. Project Settings > API 複製 Project URL 與 anon/public key，填入 `.env.local` 的 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`。
3. SQL Editor 執行 `supabase/schema.sql`。
4. Authentication > URL Configuration 設定 Site URL 與 Redirect URLs：本機 `http://localhost:3000`、部署後 Vercel 網址，以及 `/auth/callback`。
5. Database > Replication 開啟 `chat_messages` 的 Realtime/Postgres Changes。
6. 店家完成核實後，才可將 `restaurants.owner_id` 設成該店家帳號 UUID。

**絕不可將 service_role key 放進前端、NEXT_PUBLIC_ 變數或 GitHub。**

## GitHub / Vercel
GitHub 建立空 Repository，在專案資料夾執行：
```bash
git init
git add .
git commit -m "Build UNU LIFE"
git branch -M main
git remote add origin https://github.com/你的帳號/你的Repository.git
git push -u origin main
```
Vercel Import Git Repository，選 Next.js，加入上述兩個環境變數後 Deploy。每次 push 到 main 會自動部署。
