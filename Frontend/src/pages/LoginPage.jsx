import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userType, setUserType] = useState(null); // "restaurant" or "volunteer"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!userType) return alert("Select login type");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType })
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Login failed");

      // store token (optional)
      localStorage.setItem("fd_token", data.token);
      localStorage.setItem("fd_user", JSON.stringify(data.user));

      // redirect based on role
      if (userType === "restaurant") navigate("/restaurant-dashboard");
      else navigate("/volunteer-dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-9" style={{ backgroundColor: '#eff5e1' }}>
      <div className="card w-full rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl" style={{ maxWidth: 560, margin: "0 auto", backgroundColor: '#fefff4', borderColor: '#2d3b36', borderWidth: '1px' }}>
        <h2 className="text-4xl font-bold   ml-12 mb-2" style={{ color: '#2d3b36' }}>Welcome to MealBridge</h2>
        <p className="small-muted text-lg " style={{ color: '#525349' }}>Login as Restaurant or Volunteer/NGO</p>

        <div className="flex gap-2 mt-3 mb-2">
          <button
            onClick={() => setUserType("restaurant")}
            className="flex-1 p-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-105"
            style={{
              border: userType === "restaurant" ? "2px solid #2d3b36" : "2px solid #525349",
              background: userType === "restaurant" ? "#f8fee5" : "#fefff4",
              color: '#2d3b36'
            }}
          >
            🍴 Restaurant
          </button>
          <button
            onClick={() => setUserType("volunteer")}
            className="flex-1 p-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-105"
            style={{
              border: userType === "volunteer" ? "2px solid #2d3b36" : "2px solid #525349",
              background: userType === "volunteer" ? "#f8fee5" : "#fefff4",
              color: '#2d3b36'
            }}
          >
            🤝 Volunteer / NGO
          </button>
        </div>

        {!userType ? (
          <p className="small-muted text-sm mt-2" style={{ color: '#525349' }}>Select a role to open the login form</p>
        ) : (
          <div className="mt-3 animate-slideIn">
            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Email</label>
            <input 
              className="input w-full px-3 py-2 mb-3 rounded-lg transition-all duration-200 focus:ring-2" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />

            <label className="block text-sm font-medium mb-1" style={{ color: '#2d3b36' }}>Password</label>
            <input 
              className="input w-full px-3 py-2 mb-3 rounded-lg transition-all duration-200 focus:ring-2" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              style={{ 
                backgroundColor: '#fefff4',
                borderColor: '#2d3b36',
                borderWidth: '1px',
                color: '#2d3b36'
              }}
            />

            <button 
              onClick={handleLogin}
              className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg"
              style={{ 
                background: "#2d3b36", 
                color: "#fefff4", 
                border: "none" 
              }}
            >
              Login
            </button>
          </div>
        )}

        <div className="mt-3">
          <p className="small-muted text-sm mb-2" style={{ color: '#525349' }}>New here?</p>
          <div className="flex gap-2">
           <button 
  onClick={() => navigate("/restaurant-signup")}
  className="flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
  style={{
    backgroundColor: '#f8fee5',
    color: '#2d3b36',
    borderColor: '#2d3b36',
    borderWidth: '1px'
  }}
>
  Register as Restaurant
</button>
<button 
  onClick={() => navigate("/volunteer-signup")}
  className="flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
  style={{
    backgroundColor: '#f8fee5',
    color: '#2d3b36',
    borderColor: '#2d3b36',
    borderWidth: '1px'
  }}
>
  Register as Volunteer
</button>

          </div>
        </div>
      </div>
      
      <style>{`
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
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}