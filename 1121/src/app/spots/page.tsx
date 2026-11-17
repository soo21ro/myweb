import Header from "@/components/Header";
import {attractions} from "@/lib/data";
export default function SpotsPage(){return <><Header/><main className="container section"><span className="eyebrow">MIAOLI DISCOVERY</span><h1>景點探索</h1><p className="muted">苗栗周邊生活與文化探索。正式版可接入地圖及經核實的景點資料。</p><div className="cards">{attractions.map(a=><article className="card" key={a.name}><div className="food-art">{a.emoji}</div><span className="tag">{a.kind}</span><h3>{a.name}</h3><p className="muted">{a.detail}</p></article>)}</div></main></>}
