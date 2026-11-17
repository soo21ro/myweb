import Header from "@/components/Header";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function OrdersPage(){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");
 const {data:orders,error}=await supabase.from("orders").select("id,status,total_amount,note,created_at,order_items(item_name,unit_price,quantity)").eq("user_id",user.id).order("created_at",{ascending:false});
 return <><Header/><main className="container section"><h1>我的訂單</h1>{error?<p className="notice">讀取失敗：{error.message}。請確認已執行資料庫 SQL。</p>:!orders?.length?<p className="muted">目前還沒有訂單。</p>:<div className="cards">{orders.map(o=><article className="card" key={o.id}><strong>訂單 #{o.id.slice(0,8)}</strong><p className="muted">{new Date(o.created_at).toLocaleString("zh-TW")}</p><p>狀態：{({pending:"待店家確認",accepted:"已接單",preparing:"製作中",ready:"可取餐",completed:"已完成",cancelled:"已取消"} as Record<string,string>)[o.status]||o.status}</p>{o.order_items?.map((it:any,i:number)=><p className="muted" key={i}>{it.item_name} × {it.quantity}　NT$ {it.unit_price*it.quantity}</p>)}<strong className="price">總計 NT$ {o.total_amount}</strong></article>)}</div>}</main></>;
}
