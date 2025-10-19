import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VolunteerFoodList from "./volunteer/VolunteerFoodList";
import VolunteerMap from "./volunteer/VolunteerMap";
import VolunteerProfile from "./volunteer/VolunteerProfile";
import axios from "axios";

// Import icons as images
import FoodListIcon from "../../assets/post-food.png";
import MapIcon from "../../assets/map.png";
import ProfileIcon from "../../assets/profile.png";

export default function DashboardVolunteer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("list");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/api/dashboard/volunteer/${id}`)
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, [id]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className="w-80 flex flex-col justify-between p-8 shadow-lg"
        style={{ backgroundColor: "#e9f4dc" }}
      >
        {/* Top Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <img
              src={
                profile?.logoPath
                  ? `http://localhost:5000${profile.logoPath}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-40 h-50 rounded-full object-cover mx-auto border-2 border-[#2d3b36]/20 shadow-sm"
            />
            <p
              className="mt-3 text-lg font-semibold"
              style={{ color: "#2d3b36", fontFamily: "Inter, sans-serif" }}
            >
              {profile?.ngoName || "Volunteer NGO"}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full flex flex-col gap-3 mt-8">
            <button
              onClick={() => setActive("list")}
              className="w-full py-3 px-5 rounded-lg text-left text-lg transition-all duration-200 hover:bg-[#f8fee5] flex items-center gap-3"
              style={{
                backgroundColor: active === "list" ? "#f8fee5" : "transparent",
                color: "#2d3b36",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
              }}
            >
              <img src={FoodListIcon} alt="Food List" className="w-11 h-25" />
              Food List
            </button>

            <button
              onClick={() => setActive("map")}
              className="w-full py-3 px-5 rounded-lg text-left text-lg transition-all duration-200 hover:bg-[#f8fee5] flex items-center gap-3"
              style={{
                backgroundColor: active === "map" ? "#f8fee5" : "transparent",
                color: "#2d3b36",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
              }}
            >
              <img src={MapIcon} alt="Map View" className="w-11 h-25" />
              Map View
            </button>

            <button
              onClick={() => setActive("profile")}
              className="w-full py-3 px-5 rounded-lg text-left text-lg transition-all duration-200 hover:bg-[#f8fee5] flex items-center gap-3"
              style={{
                backgroundColor:
                  active === "profile" ? "#f8fee5" : "transparent",
                color: "#2d3b36",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
              }}
            >
              <img src={ProfileIcon} alt="Profile" className="w-12 h-25" />
              Profile
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-[#2d3b36]/20 pt-5 mt-8 text-center">
          <p
            className="text-base font-semibold"
            style={{
              color: "#2d3b36",
              fontFamily: "Inter, sans-serif",
            }}
          >
            © 2025 Volunteer Dashboard
          </p>
          <p
            className="text-sm mt-1"
            style={{
              color: "#525349",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Connecting communities through food.
          </p>

          <button
            className="mt-4 text-sm font-medium hover:underline"
            style={{
              color: "#2d3b36",
              fontFamily: "Inter, sans-serif",
            }}
            onClick={() => navigate("/")}
          >
            ⬅️ Go to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8" style={{ backgroundColor: "#fefff4" }}>
        {active === "list" && <VolunteerFoodList volunteerId={id} />}
        {active === "map" && <VolunteerMap />}
        {active === "profile" && <VolunteerProfile volunteerId={id} />}
      </div>
    </div>
  );
}
