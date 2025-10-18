import React, { useState, useEffect } from "react";
import RestaurantProfile from "./restaurant/RestaurantProfile";
import RestaurantFoodForm from "./restaurant/RestaurantFoodForm";
import RestaurantMap from "./restaurant/RestaurantMap";
import axios from "axios";

export default function DashboardRestaurant(){
  const [active, setActive] = useState("form");
  const user = JSON.parse(localStorage.getItem("fd_user") || "{}");

  useEffect(()=> {
    // optional: fetch profile if needed
  },[]);

  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <aside style={{width:260, padding:20, background:'#064e3b', color:'white'}}>
        <div style={{marginBottom:24}}>
          <h3>🍽 Restaurant</h3>
          <p>{user.name}</p>
        </div>
        <button className={`sidebar-btn ${active==='profile'?'active':''}`} onClick={()=>setActive('profile')}>Profile</button>
        <button className={`sidebar-btn ${active==='form'?'active':''}`} onClick={()=>setActive('form')}>Upload Food</button>
        <button className={`sidebar-btn ${active==='map'?'active':''}`} onClick={()=>setActive('map')}>Map</button>
      </aside>

      <main style={{flex:1, padding:24}}>
        {active==='profile' && <RestaurantProfile />}
        {active==='form' && <RestaurantFoodForm />}
        {active==='map' && <RestaurantMap />}
      </main>
    </div>
  );
}
