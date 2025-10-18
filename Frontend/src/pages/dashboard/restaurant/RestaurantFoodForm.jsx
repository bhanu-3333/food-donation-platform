import React, { useState } from "react";
import axios from "axios";

export default function RestaurantFoodForm(){
  const user = JSON.parse(localStorage.getItem("fd_user") || "{}");
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  function useMyLocation(){
    if(!navigator.geolocation) return alert("Not supported");
    navigator.geolocation.getCurrentPosition(pos => {
      setLat(pos.coords.latitude); setLng(pos.coords.longitude);
      alert("Location attached");
    }, ()=>alert("Failed"));
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!user?.id) return alert("Login first");
    const data = new FormData();
    data.append('restaurantId', user.id);
    data.append('restaurantName', user.name);
    data.append('foodName', foodName);
    data.append('description', description);
    if(image) data.append('image', image);
    if(lat) data.append('lat', lat);
    if(lng) data.append('lng', lng);

    try{
      const res = await axios.post("http://localhost:5000/api/food/upload", data);
      alert("Uploaded");
      setFoodName(''); setDescription(''); setImage(null);
    }catch(err){ alert("Upload failed"); console.error(err); }
  }

  return (
    <div className="card" style={{maxWidth:720}}>
      <h2>Upload Food</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Food name" value={foodName} onChange={e=>setFoodName(e.target.value)} className="input" required/>
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="input" />
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        <div style={{display:'flex', gap:8}}>
          <button type="button" onClick={useMyLocation}>📍 Use My Location</button>
          <input placeholder="Latitude" value={lat} onChange={e=>setLat(e.target.value)} className="input" />
          <input placeholder="Longitude" value={lng} onChange={e=>setLng(e.target.value)} className="input" />
        </div>
        <button style={{padding:10, background:'#16a34a', color:'white', border:'none', borderRadius:8}}>Upload Food</button>
      </form>
    </div>
  );
}
