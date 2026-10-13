const products = [
 {id:1,name:"透明日常水壺",desc:"簡約透明設計，隨時看見剩餘水量。",price:399,category:"日常",tag:"人氣",color:"#b8d3c2",light:"#e4f0e6",dark:"#769c84",bg:"#eaf1e9",label:"daily<br>water",shape:"",tilt:"-5deg"},
 {id:2,name:"暖心保溫保冷瓶",desc:"適合上課、通勤與長時間外出使用。",price:1080,category:"保溫",tag:"保溫",color:"#dfbda1",light:"#f5e5d7",dark:"#b88765",bg:"#f4e9de",label:"warm<br>moments",shape:"slim",tilt:"5deg"},
 {id:3,name:"大容量運動水壺",desc:"2000ml 大容量，運動時補充水分更方便。",price:650,category:"運動",tag:"運動",color:"#9eb8d7",light:"#d9e6f3",dark:"#6c8eb8",bg:"#e6edf6",label:"move<br>more",shape:"sport",tilt:"-3deg"},
 {id:4,name:"清新玻璃水壺",desc:"清透外型，適合喜歡自然簡約風格的你。",price:780,category:"日常",tag:"玻璃",color:"#c2d7d3",light:"#edf6f2",dark:"#7fa7a0",bg:"#e6f0ed",label:"pure<br>life",shape:"glass",tilt:"4deg"},
 {id:5,name:"輕旅折疊水壺",desc:"可折疊設計，旅行收納輕鬆不占空間。",price:590,category:"旅行",tag:"旅行",color:"#d7c5e3",light:"#eee4f5",dark:"#a38ab8",bg:"#eee8f2",label:"go<br>light",shape:"fold",tilt:"-5deg"},
 {id:6,name:"隨手吸管水壺",desc:"單手即可飲用，日常使用快速又方便。",price:520,category:"日常",tag:"便利",color:"#e7c0c1",light:"#f8e6e6",dark:"#bd8588",bg:"#f5e9e8",label:"sip<br>happy",shape:"round",tilt:"4deg"},
 {id:7,name:"經典不鏽鋼保溫瓶",desc:"簡約俐落外型，適合每天使用。",price:1280,category:"保溫",tag:"耐用",color:"#c4c8c4",light:"#e8eae7",dark:"#8a918a",bg:"#ebedeb",label:"every<br>day",shape:"slim",tilt:"-3deg"},
 {id:8,name:"繽紛兒童水壺",desc:"可愛造型與方便提帶，適合日常使用。",price:450,category:"日常",tag:"親子",color:"#f0d18b",light:"#fff0c9",dark:"#c8a04b",bg:"#f7efd9",label:"little<br>star",shape:"kids",tilt:"5deg"},
 {id:9,name:"旅行濾芯水壺",desc:"濾芯概念設計，適合旅行與戶外使用。",price:1180,category:"旅行",tag:"濾水",color:"#b4c8db",light:"#e5edf5",dark:"#7d9bb6",bg:"#e7eef4",label:"fresh<br>trip",shape:"filter",tilt:"-4deg"},
 {id:10,name:"運動噴霧水壺",desc:"飲水與噴霧功能結合，戶外活動更加便利。",price:680,category:"運動",tag:"新品",color:"#b6d4cf",light:"#e2f0ec",dark:"#75a49b",bg:"#e5f0ec",label:"cool<br>down",shape:"mist",tilt:"3deg"}
];
const money = n => "NT$" + n.toLocaleString("zh-TW");
const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const toast = document.getElementById("toast");
let activeCategory = "全部";
let toastTimer;
let cart = {};
try { cart = JSON.parse(localStorage.getItem("everydayHydrationCart") || "{}") || {}; } catch(e) { cart = {}; }

function bottleMarkup(p, extraClass="") {
  return `<div class="product-bottle ${p.shape} ${extraClass}" style="--bottle-color:${p.color};--bottle-light:${p.light};--bottle-dark:${p.dark};--label-color:${p.shape==="glass"?"#54736b":"#ffffff"}"><span class="bottle-label">${p.label}</span></div>`;
}
function renderProducts() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const sort = document.getElementById("sortSelect").value;
  let list = products.filter(p => (activeCategory === "全部" || p.category === activeCategory) &&
    `${p.name} ${p.desc} ${p.category} ${p.tag}`.toLowerCase().includes(query));
  if(sort==="low") list.sort((a,b)=>a.price-b.price);
  if(sort==="high") list.sort((a,b)=>b.price-a.price);
  grid.innerHTML = list.map((p,i)=>`
    <article class="product-card" style="animation-delay:${Math.min(i*45,300)}ms">
      <div class="product-visual" style="background:${p.bg}" data-product="${p.id}" aria-label="${p.name}">
        <span class="product-badge">${p.tag}</span>${bottleMarkup(p)}
        <button class="quick-add" data-add="${p.id}">＋ 加入購物車</button>
      </div>
      <div class="product-info"><div class="product-meta"><span>${p.category}系列</span><span>✦ 4.9</span></div>
        <h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-small" data-add="${p.id}" aria-label="將${p.name}加入購物車">＋</button></div>
      </div>
    </article>`).join("");
  document.getElementById("emptyResults").hidden = list.length !== 0;
}
function saveCart(){ try { localStorage.setItem("everydayHydrationCart", JSON.stringify(cart)); } catch(e) {} }
function countItems(){ return Object.values(cart).reduce((sum,n)=>sum+n,0); }
function subtotal(){ return products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0); }
function updateCartCount(){
  const count=countItems(); cartCount.textContent=count; document.getElementById("drawerCount").textContent=`(${count})`;
}
function renderCart(){
  updateCartCount();
  const items=products.filter(p=>cart[p.id]);
  const container=document.getElementById("cartItems");
  if(!items.length){
    container.innerHTML=`<div class="cart-empty"><span>🛒</span><h3>購物車還是空的</h3><p>挑一款喜歡的水壺，開始你的日常補水吧！</p><button class="button button-dark" id="continueShopping">去逛逛</button></div>`;
  } else {
    container.innerHTML=items.map(p=>`<div class="cart-item">
      <div class="cart-thumb" style="background:${p.bg}">${bottleMarkup(p)}</div>
      <div><h4>${p.name}</h4><div class="cart-item-meta">${money(p.price)}</div>
        <div class="qty-control"><button data-qty="${p.id}" data-delta="-1" aria-label="減少數量">−</button><span>${cart[p.id]}</span><button data-qty="${p.id}" data-delta="1" aria-label="增加數量">＋</button></div>
      </div><div class="cart-item-right"><strong>${money(p.price*cart[p.id])}</strong><button class="remove-item" data-remove="${p.id}">移除</button></div>
    </div>`).join("");
  }
  const sub=subtotal(), shipping=sub===0?80:(sub>=1000?0:80);
  document.getElementById("cartSubtotal").textContent=money(sub);
  document.getElementById("shippingCost").textContent=shipping===0?"免費":money(shipping);
  document.getElementById("cartTotal").textContent=money(sub+shipping);
  document.getElementById("shippingProgress").style.width=Math.min(sub/1000*100,100)+"%";
  document.getElementById("shippingMessage").textContent=sub>=1000?"太棒了！你已享有免運優惠":`再買 ${money(1000-sub)} 即享免運`;
  saveCart();
}
function openCart(){cartDrawer.classList.add("open");cartOverlay.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");cartOverlay.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
function showToast(text){document.getElementById("toastText").textContent=text;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}
function flyAnimation(button, product){
  const target=cartCount.getBoundingClientRect();
  const source=button.getBoundingClientRect();
  const flyer=document.createElement("div");flyer.className="fly-item";
  flyer.style.left=(source.left+source.width/2-17)+"px";flyer.style.top=(source.top+source.height/2-17)+"px";
  flyer.style.width="34px";flyer.style.height="34px";flyer.style.background=product.color;
  flyer.style.border="2px solid "+product.dark;flyer.style.boxShadow="0 5px 12px #26352d25";
  flyer.style.setProperty("--fly-x",(target.left+target.width/2-source.left-source.width/2)+"px");
  flyer.style.setProperty("--fly-y",(target.top+target.height/2-source.top-source.height/2)+"px");
  document.body.appendChild(flyer);flyer.addEventListener("animationend",()=>flyer.remove(),{once:true});
  cartCount.classList.remove("bump");void cartCount.offsetWidth;cartCount.classList.add("bump");
}
function confettiBurst(button){
  const rect=button.getBoundingClientRect();
  for(let i=0;i<7;i++){
    const bit=document.createElement("i");bit.className="confetti";
    bit.style.left=(rect.left+rect.width/2)+"px";bit.style.top=(rect.top+rect.height/2)+"px";
    bit.style.background=["#d88b5b","#9dbb98","#e5c77e","#b6cbe0"][i%4];
    bit.style.setProperty("--cx",(Math.random()*100-50)+"px");bit.style.setProperty("--cy",(Math.random()*-85-15)+"px");
    document.body.appendChild(bit);bit.addEventListener("animationend",()=>bit.remove(),{once:true});
  }
}
function addToCart(id, button){
  const p=products.find(item=>item.id===Number(id));if(!p)return;
  cart[p.id]=(cart[p.id]||0)+1;
  renderCart();flyAnimation(button,p);confettiBurst(button);showToast(`${p.name} 已加入購物車`);
  button.classList.add("added");setTimeout(()=>button.classList.remove("added"),450);
}
grid.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");
  if(add){e.preventDefault();addToCart(add.dataset.add,add);return;}
});
document.getElementById("categoryPills").addEventListener("click",e=>{
  const pill=e.target.closest("[data-category]");if(!pill)return;
  activeCategory=pill.dataset.category;
  document.querySelectorAll(".pill").forEach(el=>el.classList.toggle("active",el===pill));
  renderProducts();
});
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("sortSelect").addEventListener("change",renderProducts);
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.getElementById("cartItems").addEventListener("click",e=>{
  const qty=e.target.closest("[data-qty]"),remove=e.target.closest("[data-remove]");
  if(qty){const id=qty.dataset.qty;cart[id]=(cart[id]||0)+Number(qty.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart();}
  if(remove){delete cart[remove.dataset.remove];renderCart();showToast("商品已從購物車移除");}
  if(e.target.closest("#continueShopping"))closeCart();
});
document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(countItems()===0){showToast("購物車目前是空的");return;}
  showToast("這是教學展示網站，尚未串接付款功能");
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
renderProducts();renderCart();
