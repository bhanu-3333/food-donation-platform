import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerFoodList(){
  const [foods, setFoods] = useState([]);
  const user = JSON.parse(localStorage.getItem("fd_user") || "{}");

  useEffect(()=> {
    axios.get("http://localhost:5000/api/food/available")
      .then(res=>setFoods(res.data))
      .catch(()=>{});
  }, []);

  async function acceptFood(id){
    if(!user?.id) return alert("Login as volunteer");
    try{
      await axios.post(`http://localhost:5000/api/food/accept/${id}`, { volunteerId: user.id });
      alert("Accepted");
      setFoods(prev => prev.filter(f => f._id !== id));
    }catch(err){ alert("Failed to accept"); }
  }

  return (
    <div>
      <h2>Available Food</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:12}}>
        {foods.map(f => (
          <div key={f._id} className="card">
            {f.imagePath && <img src={`http://localhost:5000${f.imagePath}`} alt="" style={{width:'100%',height:160,objectFit:'cover',borderRadius:8}} />}
            <h3>{f.foodName}</h3>
            <p className="small-muted">{f.description}</p>
            <p><strong>Restaurant:</strong> {f.restaurantName}</p>
            <button onClick={()=>acceptFood(f._id)} style={{padding:8,background:'#0b84ff',color:'white',border:'none',borderRadius:8}}>Accept</button>
          </div>
        ))}
      </div>
    </div>
  );
}
