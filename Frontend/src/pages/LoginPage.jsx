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
    <div className="container">
      <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
        <h2>Welcome to MealBridge</h2>
        <p className="small-muted">Login as Restaurant or Volunteer/NGO</p>

        <div style={{ display: "flex", gap: 10, marginTop: 12, marginBottom: 10 }}>
          <button
            onClick={() => setUserType("restaurant")}
            style={{
              padding: 10,
              borderRadius: 8,
              border: userType === "restaurant" ? "2px solid #0a66c2" : "1px solid #ddd",
              background: userType === "restaurant" ? "#eaf4ff" : "#fff"
            }}
          >
            🍴 Restaurant
          </button>
          <button
            onClick={() => setUserType("volunteer")}
            style={{
              padding: 10,
              borderRadius: 8,
              border: userType === "volunteer" ? "2px solid #0a66c2" : "1px solid #ddd",
              background: userType === "volunteer" ? "#eaf4ff" : "#fff"
            }}
          >
            🤝 Volunteer / NGO
          </button>
        </div>

        {!userType ? (
          <p className="small-muted">Select a role to open the login form</p>
        ) : (
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />

            <label>Password</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />

            <button style={{ padding: "10px 16px", borderRadius: 8, background: "#0a66c2", color: "white", border: "none" }}>Login</button>
          </form>
        )}

        <div style={{ marginTop: 14 }}>
          <p className="small-muted">New here?</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => navigate("/restaurant-signup")}>Register as Restaurant</button>
            <button onClick={() => navigate("/volunteer-signup")}>Register as Volunteer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
