import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VolunteerSignup() {
  const [form, setForm] = useState({
    ngoName: "", representativeName: "", contact: "", email: "", password: "", confirmPassword: "", volunteersCount: ""
  });
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [regFile, setRegFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function getCurrentLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      alert("Location attached");
    }, (err) => {
      console.error(err);
      alert("Location access denied or failed");
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match");

    const data = new FormData();
    data.append("ngoName", form.ngoName);
    data.append("representativeName", form.representativeName);
    data.append("contact", form.contact);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("confirmPassword", form.confirmPassword);
    data.append("volunteersCount", form.volunteersCount);
    if (coords.lat) {
      data.append("latitude", coords.lat);
      data.append("longitude", coords.lng);
    }
    if (regFile) data.append("registrationDoc", regFile);
    if (logoFile) data.append("logo", logoFile);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register/volunteer", {
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
        <h2>Volunteer / NGO Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>NGO / Committee Name</label>
          <input name="ngoName" className="input" value={form.ngoName} onChange={handleChange} required />

          <label>Representative Name</label>
          <input name="representativeName" className="input" value={form.representativeName} onChange={handleChange} required />

          <label>Contact Number</label>
          <input name="contact" className="input" value={form.contact} onChange={handleChange} required />

          <label>Email</label>
          <input name="email" className="input" type="email" value={form.email} onChange={handleChange} required />

          <label>Password</label>
          <input name="password" className="input" type="password" value={form.password} onChange={handleChange} required />

          <label>Confirm Password</label>
          <input name="confirmPassword" className="input" type="password" value={form.confirmPassword} onChange={handleChange} required />

          <label>NGO Registration ID / Certificate Upload</label>
          <input type="file" accept=".pdf,image/*" onChange={e => setRegFile(e.target.files[0])} required />

          <label>Number of Volunteers (optional)</label>
          <input name="volunteersCount" className="input" value={form.volunteersCount} onChange={handleChange} />

          <label>Attach Location</label>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={getCurrentLocation}>📍 Use My Current Location</button>
            <input className="input" name="address" placeholder="Or enter address manually" value={form.address} onChange={(e) => setForm(prev => ({...prev, address: e.target.value}))} />
          </div>
          {coords.lat && <p className="small-muted">Lat: {coords.lat} — Lng: {coords.lng}</p>}

          <label>Upload NGO Logo (optional)</label>
          <input type="file" accept="image/*" onChange={e => setLogoFile(e.target.files[0])} />

          <label><input type="checkbox" required /> I agree to Verification Terms</label>

          <div style={{ marginTop: 12 }}>
            <button style={{ padding: 10, borderRadius: 8, background: "#0a66c2", color: "white", border: "none" }}>Register NGO</button>
            <button type="button" onClick={() => navigate("/")} style={{ marginLeft: 8 }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
