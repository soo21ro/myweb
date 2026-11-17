"use client";
import Link from "next/link";
import {useState} from "react";
import {createClient} from "@/lib/supabase/client";

export default function LoginPage(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [msg,setMsg]=useState("");const [mode,setMode]=useState<"login"|"signup">("login");const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setMsg("");try{
  const supabase=createClient();
  const result=mode==="login"?await supabase.auth.signInWithPassword({email,password}):await supabase.auth.signUp({email,password,options:{emailRedirectTo:`${location.origin}/auth/callback`}});
  if(result.error)throw result.error;
  setMsg(mode==="login"?"登入成功，請前往會員中心。":"註冊成功！若有啟用信箱驗證，請先收信完成驗證。");
 }catch(e){setMsg(e instanceof Error?e.message:"操作失敗");}finally{setBusy(false)}}
 return <main className="container"><div className="form-card"><Link href="/" className="logo">UNU<span>●</span>LIFE</Link><h1>{mode==="login"?"會員登入":"建立會員"}</h1><p className="muted">登入後即可使用會員訂餐與個人功能。</p>
 <form onSubmit={submit}><div className="field"><label>電子郵件</label><input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="field"><label>密碼（至少 8 個字元）</label><input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn" style={{width:"100%"}} disabled={busy}>{busy?"處理中…":mode==="login"?"登入":"註冊"}</button></form>
 {msg&&<p className="notice" style={{marginTop:12}}>{msg}</p>}
 <p className="muted" style={{marginTop:18}}>{mode==="login"?"還沒有帳號？":"已經有帳號？"} <button className="price" onClick={()=>setMode(mode==="login"?"signup":"login")}>{mode==="login"?"立即註冊":"返回登入"}</button></p>
 </div></main>;
}
