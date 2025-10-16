import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RestaurantSignup() {
  const [form, setForm] = useState({
    restaurantName: "", ownerName: "", contact: "", email: "", password: "", confirmPassword: "",
    foodType: "Both", time: "", address: ""
  });
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      alert("Location attached: " + pos.coords.latitude + ", " + pos.coords.longitude);
    }, (err) => {
      console.error(err);
      alert("Location access denied or failed");
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");

    const data = new FormData();
    data.append("restaurantName", form.restaurantName);
    data.append("ownerName", form.ownerName);
    data.append("contact", form.contact);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("confirmPassword", form.confirmPassword);
    data.append("foodType", form.foodType);
    data.append("time", form.time);
    data.append("address", form.address);
    if (coords.lat) {
      data.append("latitude", coords.lat);
      data.append("longitude", coords.lng);
    }
    if (imageFile) data.append("image", imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register/restaurant", {
        method: "POST",
        body: data
      });
      const resData = await res.json();
      if (!res.ok) return alert(resData.message || "Sign up failed");
      alert(resData.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2>Restaurant Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>Restaurant Name</label>
          <input name="restaurantName" className="input" value={form.restaurantName} onChange={handleChange} required />

          <label>Owner / Manager Name</label>
          <input name="ownerName" className="input" value={form.ownerName} onChange={handleChange} required />

          <label>Contact Number</label>
          <input name="contact" className="input" value={form.contact} onChange={handleChange} required />

          <label>Email</label>
          <input name="email" className="input" value={form.email} onChange={handleChange} type="email" required />

          <label>Password</label>
          <input name="password" className="input" value={form.password} onChange={handleChange} type="password" required />

          <label>Confirm Password</label>
          <input name="confirmPassword" className="input" value={form.confirmPassword} onChange={handleChange} type="password" required />

          <label>Type of Food</label>
          <select name="foodType" value={form.foodType} onChange={handleChange} className="input">
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Both</option>
          </select>

          <label>Usual Food Availability Time</label>
          <input name="time" className="input" placeholder="e.g., 8 PM - 10 PM" value={form.time} onChange={handleChange} />

          <label>Attach Location</label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={getCurrentLocation}>📍 Use My Current Location</button>
            <input className="input" name="address" placeholder="Or enter address manually" value={form.address} onChange={handleChange} />
          </div>
          {coords.lat && <p className="small-muted">Lat: {coords.lat} — Lng: {coords.lng}</p>}

          <label>Upload Restaurant Image / Logo (optional)</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />

          <label><input type="checkbox" required /> I agree to Food Safety Terms</label>

          <div style={{ marginTop: 12 }}>
            <button style={{ padding: 10, borderRadius: 8, background: "#0a66c2", color: "white", border: "none" }}>Register Restaurant</button>
            <button type="button" onClick={() => navigate("/")} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
