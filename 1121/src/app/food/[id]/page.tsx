import Header from "@/components/Header";
import { restaurants } from "@/lib/data";
import OrderMenu from "@/components/OrderMenu";
import { notFound } from "next/navigation";

export default async function RestaurantPage({ params }: { params: Promise<{id:string}> }) {
  const { id } = await params;
  const restaurant = restaurants.find(r => r.id === id);
  if (!restaurant) notFound();
  return <><Header/><main className="container section"><div className="card">
    <div className="food-art" style={{height:160}}>{restaurant.image}</div><span className="eyebrow">{restaurant.category}</span>
    <h1>{restaurant.name}</h1><p className="muted">{restaurant.description}</p>
    <OrderMenu restaurantId={restaurant.id} items={restaurant.menu}/>
  </div></main></>;
}
