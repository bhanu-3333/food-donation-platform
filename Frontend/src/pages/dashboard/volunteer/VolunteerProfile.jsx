import React, { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerProfile({ volunteerId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!volunteerId) return;
    axios
      .get(`https://food-donation-platform-4.onrender.com/volunteer/${volunteerId}`)
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, [volunteerId]);

  if (!profile)
    return (
      <div className="bg-[#fefff4] rounded-xl p-6 border border-[#2d3b36]/10 text-center">
        <p
          className="text-[#525349] text-lg"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          Loading...
        </p>
      </div>
    );

  return (
    <div className="bg-[#fefff4] rounded-2xl p-8 border border-[#2d3b36]/10 max-w-3xl mx-auto shadow-sm">
      {/* 🧾 Header */}
      <div className="flex items-center gap-5 mb-4">
        <img
          src={
            profile.logoPath
              ? `http://localhost:5000${profile.logoPath}`
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt=""
          className="w-24 h-24 rounded-full object-cover border-2 border-[#2d3b36]/10"
        />
        <div>
          <h3
            className="text-3xl font-bold text-[#2d3b36] mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {profile.ngoName}
          </h3>
          <p
            className="text-[#525349]"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Making a difference every day 🌍
          </p>
        </div>
      </div>

      {/* 🧩 Details */}
      <div className="space-y-2 mt-4">
        <p
          className="text-[#525349]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <b className="text-[#2d3b36]">Representative:</b>{" "}
          {profile.representativeName}
        </p>
        <p
          className="text-[#525349]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <b className="text-[#2d3b36]">Email:</b> {profile.email}
        </p>
        <p
          className="text-[#525349]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <b className="text-[#2d3b36]">Contact:</b> {profile.contact}
        </p>
        <p
          className="text-[#525349]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          <b className="text-[#2d3b36]">Address:</b>{" "}
          {profile.location?.address || "Not available"}
        </p>
      </div>
    </div>
  );
}
