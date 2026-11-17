# UNU LIFE｜聯大生活圈

以國立聯合大學為中心的美食、景點、訂餐與 2D 像素虛擬校園網站。使用 Next.js App Router、TypeScript、Supabase 與 Vercel。

## 目前專案包含

- 響應式首頁、附近美食、景點探索
- 示範餐廳與菜單資料（不是實際合作店家）
- 會員註冊、登入、登出（Supabase Auth）
- 訂餐購物數量、備註、送出訂單、會員訂單列表
- 2D 像素風格校園地圖、鍵盤 WASD/方向鍵及手機方向按鈕
- Supabase schema 與基本 RLS policies

## 尚待完成才可正式營運

目前虛擬校園是單人互動原型；多人即時角色同步、即時聊天室、好友、角色造型編輯及管理後台尚未完成。訂餐目前是「送單到資料庫」原型，沒有店家接單後台、即時庫存、正式付款或外送派單。上線前必須與真實店家合作、核實菜單價格/營業時間/取餐方式，並完成伺服器端價格計算、店家權限、訂單狀態管理與安全測試。

## 本機啟動

需求：Node.js 20.9 以上。

```bash
npm install
cp .env.example .env.local
npm run dev
```

Windows PowerShell 可使用：

```powershell
Copy-Item .env.example .env.local
```

開啟 http://localhost:3000

## Supabase 設定

1. 到 https://supabase.com 建立專案。
2. 在 Project Settings > API 找到 Project URL 與 anon/public key。
3. 填入 `.env.local` 的 `NEXT_PUBLIC_SUPABASE_URL` 與 `NEXT_PUBLIC_SUPABASE_ANON_KEY`。
4. 開啟 Supabase SQL Editor，執行 `supabase/schema.sql`。
5. 在 Authentication > URL Configuration 設定 Site URL：
   - 本機：`http://localhost:3000`
   - 部署後：你的 Vercel 網址
6. Redirect URLs 加入 `http://localhost:3000/auth/callback` 及 `https://你的網域/auth/callback`。

只使用 anon/public key。**絕對不要將 Supabase service_role key 放進 NEXT_PUBLIC_ 變數或提交到 GitHub。**

## GitHub 上傳

在專案資料夾執行：

```bash
git init
git add .
git commit -m "Initial UNU LIFE website"
git branch -M main
git remote add origin https://github.com/你的帳號/你的Repository.git
git push -u origin main
```

先在 GitHub 建立一個空的 Repository，再執行上述命令。

## Vercel 部署

1. 登入 https://vercel.com，選擇 Add New > Project。
2. Import 你的 GitHub Repository。
3. Framework Preset 選 Next.js。
4. 在 Environment Variables 加入：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. 按 Deploy。
6. 把 Vercel 網址加到 Supabase Authentication 的 Site URL 與 Redirect URLs。

之後每次 push 到 GitHub main，Vercel 就會自動重新部署。

## 建議 Codex 開發順序

1. 先完成 `npm install`、Supabase 環境變數及首頁測試。
2. 建立店家管理後台：店家帳號、店家擁有權、菜單 CRUD、營業狀態。
3. 把示範資料改成 Supabase 真實資料。
4. 建立安全的訂單 API/RPC：伺服器查詢菜單價格、計算總額、建立訂單，避免前端竄改價格。
5. 建立店家訂單管理：接受、拒絕、製作中、可取餐、完成。
6. 加入 Supabase Realtime：聊天室訊息與虛擬角色位置同步。
7. 加入會員暱稱、角色造型、封鎖/檢舉/聊天室管理。
8. 完成手機、桌面、權限與資安測試。

## 給 Codex 的開發規則

請先閱讀整份 README、`supabase/schema.sql` 和現有程式碼，再逐項實作。不要一次重寫整個專案。每次完成一個功能後執行 `npm run build`，修正 TypeScript 與 build 錯誤。所有資料庫寫入都要考慮登入狀態、RLS 與伺服器端驗證；不得把 service_role key 放在前端。
