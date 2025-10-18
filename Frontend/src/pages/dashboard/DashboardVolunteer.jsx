// client/src/pages/dashboard/DashboardVolunteer.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/*
  DashboardVolunteer.jsx
  - Shows sidebar with profile & quick actions
  - Map of available foods (leaflet)
  - List of available food cards (acceptable)
  - List of accepted foods by this volunteer
  - Assumes 'fd_user' in localStorage: { id, name, email, role, imagePath }
  - Uses backend endpoints:
      GET  /api/food/available
      POST /api/food/accept/:foodId   body: { volunteerId }
      GET  /api/food/restaurant/:id   (restaurant's foods)
      GET  /api/dashboard/volunteer/:id  (profile)
  - Image URLs are served at: http://localhost:5000<imagePath>
*/

const SERVER = "http://localhost:5000";

const defaultCenter = [13.0827, 80.2707]; // fallback (Chennai)

const volunteerMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function DashboardVolunteer() {
  const [availableFoods, setAvailableFoods] = useState([]);
  const [acceptedFoods, setAcceptedFoods] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  // load user from localStorage (set at login)
  const stored = localStorage.getItem("fd_user");
  const user = stored ? JSON.parse(stored) : null; // { id, name, email, role, imagePath }

  useEffect(() => {
    fetchAvailable();
    if (user?.id) fetchAcceptedByMe(user.id);
    if (user?.id) fetchProfile(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch all available food posts
  const fetchAvailable = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${SERVER}/api/food/available`);
      setAvailableFoods(res.data || []);
    } catch (err) {
      console.error("fetchAvailable error", err);
      alert("Could not load available food posts.");
    } finally {
      setLoading(false);
    }
  };

  // fetch accepted foods by this volunteer (status accepted & acceptedBy = user.id)
  const fetchAcceptedByMe = async (volunteerId) => {
    try {
      const res = await axios.get(`${SERVER}/api/food/available`); // we'll filter locally since endpoint simple
      const all = res.data || [];
      const accepted = all.filter((f) => f.status === "accepted" && f.acceptedBy === volunteerId);
      // if acceptedBy stored as ObjectId (populated), adjust filter:
      // const accepted = all.filter(f => f.status === "accepted" && f.acceptedBy && f.acceptedBy._id === volunteerId);
      setAcceptedFoods(accepted);
    } catch (err) {
      console.error("fetchAcceptedByMe error", err);
    }
  };

  // fetch volunteer profile from dashboard route
  const fetchProfile = async (id) => {
    try {
      const res = await axios.get(`${SERVER}/api/dashboard/volunteer/${id}`);
      setProfile(res.data);
    } catch (err) {
      console.error("fetchProfile error", err);
    }
  };

  // accept food
  const handleAccept = async (foodId) => {
    if (!user?.id) return alert("Please login as a volunteer to accept.");
    try {
      const res = await axios.post(`${SERVER}/api/food/accept/${foodId}`, { volunteerId: user.id });
      if (res.data?.success || res.status === 200) {
        alert("You accepted this donation. Please contact the restaurant for pickup details.");
        // refresh lists
        await fetchAvailable();
        await fetchAcceptedByMe(user.id);
      } else {
        alert(res.data?.message || "Failed to accept");
      }
    } catch (err) {
      console.error("accept error", err);
      alert(err.response?.data?.message || "Error accepting donation");
    }
  };

  // helper to get image url if exists
  const toImageUrl = (path) => (path ? `${SERVER}${path}` : null);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f6f9" }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: "#0b74e6", color: "white", padding: 20, boxSizing: "border-box" }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ margin: 0 }}>Volunteer Panel</h2>
          <p style={{ marginTop: 6, opacity: 0.9 }}>{user?.name || "Guest"}</p>
        </div>

        <button
          onClick={() => setShowProfile((s) => !s)}
          className="sidebar-btn"
          style={{ width: "100%", marginBottom: 10, padding: 10, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.06)", color: "white" }}
        >
          {showProfile ? "Hide Profile" : "Show Profile"}
        </button>

        <button
          onClick={fetchAvailable}
          className="sidebar-btn"
          style={{ width: "100%", marginBottom: 10, padding: 10, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.06)", color: "white" }}
        >
          Refresh Available
        </button>

        <button
          onClick={() => { setAvailableFoods([]); fetchAvailable(); }}
          className="sidebar-btn"
          style={{ width: "100%", marginBottom: 10, padding: 10, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.06)", color: "white" }}
        >
          Clear & Reload
        </button>

        <div style={{ marginTop: "auto", fontSize: 13, opacity: 0.9 }}>
          <div>Logged in as: <strong>{user?.email || "Not logged in"}</strong></div>
          <div style={{ marginTop: 12 }}>© {new Date().getFullYear()} MealBridge</div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 20 }}>
        {showProfile ? (
          <section style={{ marginBottom: 18 }}>
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ marginTop: 0 }}>My Profile</h3>
              {profile ? (
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  {profile.logoPath || profile.imagePath ? (
                    <img src={toImageUrl(profile.logoPath || profile.imagePath)} alt="profile" style={{ width: 96, height: 72, objectFit: "cover", borderRadius: 8 }} />
                  ) : null}
                  <div>
                    <div><strong>{profile.name}</strong></div>
                    <div>{profile.representativeName || profile.ownerName}</div>
                    <div>{profile.contact}</div>
                    <div style={{ marginTop: 8, color: "#555" }}>{profile.email}</div>
                    <div style={{ marginTop: 8 }}>{profile.location?.address || "Location not set"}</div>
                  </div>
                </div>
              ) : (
                <div>Loading profile...</div>
              )}
            </div>
          </section>
        ) : null}

        <section style={{ marginBottom: 18 }}>
          <h2 style={{ margin: "8px 0 12px" }}>Map — Available Food Donations</h2>
          <div style={{ height: 440 }}>
            <MapContainer
              whenCreated={(map) => (mapRef.current = map)}
              center={availableFoods.length && availableFoods[0]?.location?.lat ? [availableFoods[0].location.lat, availableFoods[0].location.lng] : defaultCenter}
              zoom={12}
              style={{ height: "100%", width: "100%", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
              {availableFoods.map((f) => {
                const lat = f.location?.lat;
                const lng = f.location?.lng;
                if (!lat || !lng) return null;
                return (
                  <Marker key={f._id} position={[lat, lng]} icon={volunteerMarkerIcon}>
                    <Popup minWidth={220}>
                      <div style={{ maxWidth: 220 }}>
                        <strong>{f.foodName || "Food"}</strong>
                        <div style={{ fontSize: 13, color: "#444", marginTop: 6 }}>{f.description || f.foodDescription || ""}</div>
                        {f.imagePath ? (
                          <img src={`${SERVER}${f.imagePath}`} alt="food" style={{ width: "100%", marginTop: 8, borderRadius: 6 }} />
                        ) : null}
                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                          <button
                            onClick={() => handleAccept(f._id)}
                            style={{ padding: "6px 8px", background: "#059669", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
                          >
                            Accept
                          </button>
                          <small style={{ alignSelf: "center" }}>{f.restaurantName}</small>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </section>

        <section style={{ marginBottom: 18 }}>
          <h3 style={{ marginBottom: 10 }}>Available Donations</h3>
          {loading ? <div>Loading...</div> : null}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
            {availableFoods.length === 0 && !loading ? (
              <div className="card">No available donations right now.</div>
            ) : (
              availableFoods.map((f) => (
                <div key={f._id} className="card" style={{ padding: 12 }}>
                  {f.imagePath && <img src={`${SERVER}${f.imagePath}`} alt="food" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }} />}
                  <h4 style={{ margin: "8px 0 6px" }}>{f.foodName || f.foodDescription?.slice(0, 30) || "Food"}</h4>
                  <p style={{ margin: 0, color: "#444" }}>{f.description || f.foodDescription || ""}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
                    <button onClick={() => handleAccept(f._id)} style={{ padding: "8px 10px", background: "#0b84ff", color: "white", border: "none", borderRadius: 6 }}>Accept</button>
                    <small style={{ alignSelf: "center" }}>{f.restaurantName}</small>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: 10 }}>My Accepted Pickups</h3>
          <div style={{ display: "grid", gap: 12 }}>
            {acceptedFoods.length === 0 ? (
              <div className="card">No accepted pickups yet.</div>
            ) : (
              acceptedFoods.map((f) => (
                <div key={f._id} className="card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {f.imagePath && <img src={`${SERVER}${f.imagePath}`} alt="" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }} />}
                  <div>
                    <div style={{ fontWeight: 700 }}>{f.foodName || f.foodDescription}</div>
                    <div style={{ fontSize: 13, color: "#555" }}>{f.description || ""}</div>
                    <div style={{ fontSize: 13, marginTop: 6 }}><strong>Restaurant:</strong> {f.restaurantName}</div>
                    <div style={{ fontSize: 13 }}><strong>Status:</strong> {f.status}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
