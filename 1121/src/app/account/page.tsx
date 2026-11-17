import Link from "next/link";
import Header from "@/components/Header";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function AccountPage(){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
 if(!user)redirect("/login");
 return <><Header/><main className="container section"><div className="card"><span className="eyebrow">MEMBER CENTER</span><h1>會員中心</h1><p>登入帳號：{user.email}</p><p className="muted">角色外觀、好友與個人資料功能將在後續版本擴充。</p><form action="/auth/signout" method="post"><button className="btn">登出</button></form><p><Link className="price" href="/orders">查看我的訂單 →</Link></p></div></main></>;
}
