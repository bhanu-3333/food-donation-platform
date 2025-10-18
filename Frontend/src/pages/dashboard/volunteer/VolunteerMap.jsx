import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

export default function VolunteerMap(){
  const [foods, setFoods] = useState([]);

  useEffect(()=> {
    axios.get("http://localhost:5000/api/food/available").then(res => setFoods(res.data));
  }, []);

  const center = foods.length ? [foods[0].location.lat || 11.0, foods[0].location.lng || 78.0] : [11.0,78.0];

  return (
    <div className="card">
      <h2>Map — Available Food</h2>
      <MapContainer center={center} zoom={13} style={{height:520}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {foods.map(f => (
          f.location?.lat && f.location?.lng && (
            <Marker key={f._id} position={[f.location.lat, f.location.lng]}>
              <Popup>
                <strong>{f.foodName}</strong><br/>
                {f.description}<br/>
                <img src={`http://localhost:5000${f.imagePath}`} alt="" style={{width:150}} />
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}
