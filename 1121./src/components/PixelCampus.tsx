"use client";
import {useEffect,useState} from "react";

export default function PixelCampus(){
  const [pos,setPos]=useState({x:2,y:2});
  useEffect(()=>{
    function move(e:KeyboardEvent){
      const key=e.key.toLowerCase();
      if(!["arrowup","arrowdown","arrowleft","arrowright","w","a","s","d"].includes(key))return;
      e.preventDefault();
      setPos(p=>({x:Math.max(0,Math.min(9,p.x+((key==="arrowright"||key==="d")?1:(key==="arrowleft"||key==="a")?-1:0)),y:Math.max(0,Math.min(5,p.y+((key==="arrowdown"||key==="s")?1:(key==="arrowup"||key==="w")?-1:0)))}));
    }
    window.addEventListener("keydown",move);return()=>window.removeEventListener("keydown",move);
  },[]);
  const tiles=Array.from({length:60},(_,i)=>i);
  return <div className="card" style={{marginTop:20}}>
    <div style={{display:"flex",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}><strong>🌳 聯大像素廣場</strong><span className="muted">座標：{pos.x+1}, {pos.y+1}</span></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(10,1fr)",gap:3,background:"#426b52",padding:5,borderRadius:12,marginTop:16}}>
      {tiles.map(i=><div key={i} style={{aspectRatio:"1",display:"grid",placeItems:"center",background:(i%10===4||Math.floor(i/10)===3)?"#d9c99a":(i%7===0?"#77a96e":"#9bc681"),fontSize:"clamp(14px,3vw,27px)",borderRadius:3}}>{pos.x===i%10&&pos.y===Math.floor(i/10)?"🧑🏻‍🎓":i===14?"🏫":i===38?"🍜":i===7||i===52?"🌳":""}</div>)}
    </div>
    <p className="muted">🧑🏻‍🎓 你的角色　🏫 教學區　🍜 美食街　🌳 樹木</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,56px)",justifyContent:"center",gap:6}}>
      <span/><button className="btn secondary" onClick={()=>setPos(p=>({...p,y:Math.max(0,p.y-1)}))}>↑</button><span/>
      <button className="btn secondary" onClick={()=>setPos(p=>({...p,x:Math.max(0,p.x-1)}))}>←</button>
      <button className="btn secondary" onClick={()=>setPos({x:2,y:2})}>⌂</button>
      <button className="btn secondary" onClick={()=>setPos(p=>({...p,x:Math.min(9,p.x+1)}))}>→</button>
      <span/><button className="btn secondary" onClick={()=>setPos(p=>({...p,y:Math.min(5,p.y+1)}))}>↓</button><span/>
    </div>
  </div>;
}
