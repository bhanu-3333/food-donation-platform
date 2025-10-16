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
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: '#eff5e1' }}>
      <div className="w-full rounded-xl shadow-lg p-6 my-8 transition-all duration-300 hover:shadow-xl animate-fadeIn" style={{ maxWidth: 720, backgroundColor: '#fefff4', borderColor: '#2d3b36', borderWidth: '1px' }}>
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#2d3b36' }}>Restaurant Registration</h2>
        
        <div className="space-y-4">
          <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Restaurant Name</label>
            <input 
              name="restaurantName" 
              className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
              value={form.restaurantName} 
              onChange={handleChange} 
              required 
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.15s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Owner / Manager Name</label>
            <input 
              name="ownerName" 
              className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
              value={form.ownerName} 
              onChange={handleChange} 
              required 
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Contact Number</label>
            <input 
              name="contact" 
              className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
              value={form.contact} 
              onChange={handleChange} 
              required 
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.25s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Email</label>
            <input 
              name="email" 
              className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
              value={form.email} 
              onChange={handleChange} 
              type="email" 
              required 
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideIn" style={{ animationDelay: '0.3s' }}>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Password</label>
              <input 
                name="password" 
                className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
                value={form.password} 
                onChange={handleChange} 
                type="password" 
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '1px',
                  color: '#2d3b36'
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Confirm Password</label>
              <input 
                name="confirmPassword" 
                className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                type="password" 
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '1px',
                  color: '#2d3b36'
                }}
              />
            </div>
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.35s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Type of Food</label>
            <select 
              name="foodType" 
              value={form.foodType} 
              onChange={handleChange} 
              className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2"
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            >
              <option>Veg</option>
              <option>Non-Veg</option>
              <option>Both</option>
            </select>
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Usual Food Availability Time</label>
            <input 
              name="time" 
              className="w-full px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
              placeholder="e.g., 8 PM - 10 PM" 
              value={form.time} 
              onChange={handleChange}
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.45s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Attach Location</label>
            <div className="flex flex-col md:flex-row gap-2">
              <button 
                type="button" 
                onClick={getCurrentLocation}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  backgroundColor: '#f8fee5',
                  color: '#2d3b36',
                  borderColor: '#2d3b36',
                  borderWidth: '1px'
                }}
              >
                📍 Use My Current Location
              </button>
              <input 
                className="flex-1 px-3 py-2 rounded-lg transition-all duration-200 focus:ring-2" 
                name="address" 
                placeholder="Or enter address manually" 
                value={form.address} 
                onChange={handleChange}
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '1px',
                  color: '#2d3b36'
                }}
              />
            </div>
            {coords.lat && (
              <p className="text-sm mt-2 animate-fadeIn" style={{ color: '#525349' }}>
                Lat: {coords.lat} — Lng: {coords.lng}
              </p>
            )}
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.5s' }}>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Upload Restaurant Image / Logo (optional)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={e => setImageFile(e.target.files[0])}
              className="w-full px-3 py-2 rounded-lg transition-all duration-200"
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />
          </div>

          <div className="animate-slideIn" style={{ animationDelay: '0.55s' }}>
            <label className="flex items-center gap-2 text-sm" style={{ color: '#2d3b36' }}>
              <input type="checkbox" required className="rounded" />
              I agree to Food Safety Terms
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-slideIn" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={handleSubmit}
              className="flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg"
              style={{ 
                background: "#2d3b36", 
                color: "#fefff4", 
                border: "none" 
              }}
            >
              Register Restaurant
            </button>
            <button 
              type="button" 
              onClick={() => handleNavigate("/")}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#f8fee5',
                color: '#2d3b36',
                borderColor: '#2d3b36',
                borderWidth: '1px'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}