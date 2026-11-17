import Link from "next/link";
import Header from "@/components/Header";
import { restaurants } from "@/lib/data";

export default function FoodPage() {
  return <><Header/><main className="container section"><div className="section-head"><div><span className="eyebrow">FOOD DISCOVERY</span><h2 style={{marginTop:12}}>附近美食</h2><p>選擇店家，查看菜單並加入購物車。</p></div></div>
    <div className="notice">注意：目前店家與菜色均為開發示範資料，並非已合作或實際營業資訊。正式上線前請替換成已確認的店家資料。</div>
    <div className="cards" style={{marginTop:20}}>{restaurants.map(r=><article className="card" key={r.id}><div className="food-art">{r.image}</div><h3>{r.name}</h3><p className="muted">{r.category}・{r.distance}</p><p className="muted">{r.description}</p><Link className="btn" href={`/food/${r.id}`}>查看菜單與訂餐</Link></article>)}</div>
  </main></>;
}
