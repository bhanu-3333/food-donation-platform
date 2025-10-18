import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerProfile(){
  const user = JSON.parse(localStorage.getItem("fd_user") || "{}");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    axios.get(`http://localhost:5000/api/dashboard/volunteer/${user.id}`)
      .then(res=>setProfile(res.data))
      .catch(()=>{});
  }, [user]);

  if(!profile) return <div className="card">Loading profile...</div>;

  return (
    <div className="card">
      <h2>Profile</h2>
      {profile.logoPath && <img src={`http://localhost:5000${profile.logoPath}`} alt="logo" style={{width:120,height:80,objectFit:'cover',borderRadius:8}} />}
      <p><strong>NGO:</strong> {profile.name}</p>
      <p><strong>Rep:</strong> {profile.representativeName}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Address:</strong> {profile.location?.address || 'Not set'}</p>
    </div>
  );
}
