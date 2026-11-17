import Header from "@/components/Header";
import PixelCampus from "@/components/PixelCampus";

export default function CampusPage(){return <><Header/><main className="container section">
  <span className="eyebrow">2D PIXEL WORLD</span><h1>虛擬校園</h1>
  <p className="muted">使用方向鍵或 WASD 移動角色。這是第一階段單人示範地圖；多人同步與即時聊天需登入並完成 Supabase 設定後擴充。</p>
  <PixelCampus/>
</main></>}
