"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MenuItem = {id:string;name:string;price:number;description:string};
export default function OrderMenu({restaurantId,items}:{restaurantId:string;items:MenuItem[]}) {
  const [qty,setQty] = useState<Record<string,number>>({});
  const [note,setNote] = useState("");
  const [message,setMessage] = useState("");
  const [busy,setBusy] = useState(false);
  const total = items.reduce((sum,item)=>sum+(qty[item.id]||0)*item.price,0);
  async function submit() {
    const selected = items.filter(i=>(qty[i.id]||0)>0);
    if(!selected.length){setMessage("請先選擇餐點數量。");return;}
    setBusy(true);setMessage("");
    try {
      const supabase=createClient();
      const {data:{user}}=await supabase.auth.getUser();
      if(!user){setMessage("請先登入會員，再送出訂單。");setBusy(false);return;}
      const {data:order,error}=await supabase.from("orders").insert({
        user_id:user.id, restaurant_id:restaurantId, status:"pending",
        total_amount:total, note, payment_method:"pay_at_pickup"
      }).select("id").single();
      if(error) throw error;
      const rows=selected.map(i=>({order_id:order.id,menu_item_id:i.id,item_name:i.name,unit_price:i.price,quantity:qty[i.id]}));
      const {error:lineError}=await supabase.from("order_items").insert(rows);
      if(lineError) throw lineError;
      setMessage("訂單已送出！可至「我的訂單」查看狀態。");
      setQty({});setNote("");
    } catch(e) {
      setMessage(e instanceof Error ? e.message : "訂單送出失敗，請稍後再試。");
    } finally {setBusy(false);}
  }
  return <div style={{marginTop:24}}><h2>菜單</h2>
    {items.map(item=><div key={item.id} className="row-between" style={{padding:"14px 0",borderBottom:"1px solid var(--line)"}}>
      <div><strong>{item.name}</strong><div className="muted">{item.description}</div><span className="price">NT$ {item.price}</span></div>
      <div style={{display:"flex",alignItems:"center",gap:10}}><button className="btn secondary" onClick={()=>setQty(q=>({...q,[item.id]:Math.max(0,(q[item.id]||0)-1)}))}>−</button><strong>{qty[item.id]||0}</strong><button className="btn" onClick={()=>setQty(q=>({...q,[item.id]:(q[item.id]||0)+1}))}>＋</button></div>
    </div>)}
    <div className="field"><label>訂單備註（例如飲料甜度）</label><textarea rows={2} value={note} onChange={e=>setNote(e.target.value)} maxLength={300}/></div>
    <div className="row-between"><strong>合計</strong><strong className="price">NT$ {total}</strong></div>
    <p className="muted">付款方式：取餐時付款（示範流程）。實際取餐時間及付款方式需由合作店家確認。</p>
    <button className="btn" style={{width:"100%"}} disabled={busy} onClick={submit}>{busy?"送出中…":"確認送出訂單"}</button>
    {message&&<p role="status" className="notice" style={{marginTop:12}}>{message}</p>}
  </div>;
}
