import Link from "next/link";
import Header from "@/components/Header";
import { restaurants } from "@/lib/data";

export default function Home() {
  return <><Header/><main className="container">
    <section className="hero">
      <div><span className="eyebrow">🎮 國立聯合大學・學生生活探索</span>
        <h1>今天想去哪裡<br/><em>吃點好吃的？</em></h1>
        <p>從校園周邊美食到苗栗特色景點，還能走進 2D 像素虛擬校園，認識同學、一起探索聯大生活。</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:22}}>
          <Link className="btn" href="/food">開始找美食 →</Link><Link className="btn secondary" href="/campus">進入虛擬校園</Link>
        </div>
      </div>
      <div className="hero-art"><div className="pixel-scene"><span>🏫 🌳 🧑🏻‍🎓</span></div></div>
    </section>
    <section className="section">
      <div className="section-head"><div><h2>🍜 今日美食探索</h2><p>看看聯大生活圈有哪些好選擇</p></div><Link href="/food" className="price">查看全部 →</Link></div>
      <div className="cards">{restaurants.map(r=><article className="card" key={r.id}>
        <div className="food-art">{r.image}</div><h3>{r.name}</h3><p className="muted">{r.description}</p>
        <div className="tags">{r.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
        <Link className="btn secondary" href={`/food/${r.id}`}>查看菜單</Link>
      </article>)}</div>
    </section>
    <section className="section"><div className="game-panel">
      <div><span className="eyebrow">PIXEL CAMPUS</span><h2 style={{fontSize:28}}>你的角色，準備好出發了嗎？</h2>
        <p>打造專屬像素角色，在虛擬校園裡移動、探索地圖，與其他在線會員交流。</p>
        <Link className="btn" href="/campus">進入虛擬校園 →</Link></div>
      <div className="game-board"><span className="avatar">🧑🏻‍🎓</span></div>
    </div></section>
    <section className="section"><div className="section-head"><div><h2>📍 苗栗景點探索</h2><p>從校園出發，發現更多在地風景</p></div></div>
      <div className="cards"><article className="card"><div className="food-art">🏘️</div><h3>苗栗市區</h3><p className="muted">街區散步與在地小吃探索。</p></article><article className="card"><div className="food-art">🏮</div><h3>客家文化</h3><p className="muted">認識苗栗的客家文化與地方特色。</p></article><article className="card"><div className="food-art">🌿</div><h3>自然步道</h3><p className="muted">安排戶外半日小旅行，出發前確認天候。</p></article></div>
    </section>
  </main><footer className="container footer">UNU LIFE 聯大生活圈｜學生專題示範網站。店家、菜單及價格目前為示範資料，正式營運前須取得店家同意並核實資訊。</footer></>;
}
