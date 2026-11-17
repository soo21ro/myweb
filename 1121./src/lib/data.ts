export type Restaurant = {
  id: string; name: string; category: string; description: string;
  distance: string; rating: string; image: string; tags: string[];
  menu: { id: string; name: string; price: number; description: string }[];
};

export const restaurants: Restaurant[] = [
  {
    id: "r1", name: "聯大暖心便當", category: "便當・飯食",
    description: "適合上課前後快速享用的日常餐點。此為示範店家資料。",
    distance: "校園周邊", rating: "新店家", image: "🍱", tags: ["快速取餐", "學生推薦"],
    menu: [
      { id: "m1", name: "香煎雞腿飯", price: 110, description: "示範菜色，實際供應以店家為準" },
      { id: "m2", name: "滷排骨飯", price: 100, description: "示範菜色，實際供應以店家為準" },
      { id: "m3", name: "季節蔬菜便當", price: 85, description: "示範菜色，實際供應以店家為準" }
    ]
  },
  {
    id: "r2", name: "像素咖哩研究所", category: "咖哩・簡餐",
    description: "濃郁咖哩與簡單套餐，適合朋友一起吃飯。此為示範店家資料。",
    distance: "校園周邊", rating: "新店家", image: "🍛", tags: ["多人聚餐", "人氣餐點"],
    menu: [
      { id: "m4", name: "日式炸雞咖哩", price: 125, description: "示範菜色，實際供應以店家為準" },
      { id: "m5", name: "蔬菜咖哩飯", price: 105, description: "示範菜色，實際供應以店家為準" },
      { id: "m6", name: "起司可樂餅咖哩", price: 120, description: "示範菜色，實際供應以店家為準" }
    ]
  },
  {
    id: "r3", name: "課間補給站", category: "飲料・點心",
    description: "下課後來杯飲料或小點心。此為示範店家資料。",
    distance: "校園周邊", rating: "新店家", image: "🧋", tags: ["飲料", "點心"],
    menu: [
      { id: "m7", name: "珍珠鮮奶茶", price: 65, description: "示範菜色，甜度冰量可備註" },
      { id: "m8", name: "冬瓜檸檬", price: 50, description: "示範菜色，甜度冰量可備註" },
      { id: "m9", name: "雞蛋糕", price: 45, description: "示範菜色，實際供應以店家為準" }
    ]
  }
];

export const attractions = [
  { name: "苗栗市區", kind: "城市散步", detail: "可安排在地小吃、街區散步與生活探索。", emoji: "🏘️" },
  { name: "客家文化主題景點", kind: "文化體驗", detail: "認識苗栗客家文化與地方特色；出發前請確認開放資訊。", emoji: "🏮" },
  { name: "自然步道與山景", kind: "戶外探索", detail: "適合安排半日輕旅行，留意天候與交通。", emoji: "🌿" }
];
