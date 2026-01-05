import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantFoodForm from "./restaurant/RestaurantFoodForm";
import RestaurantMyPosts from "./restaurant/RestaurantMyPosts";
import RestaurantProfile from "./restaurant/RestaurantProfile";
import axios from "axios";

// Import icons as images
import MyPostsIcon from "../../assets/my-posts.png";
import PostFoodIcon from "../../assets/post-food.png";
import ProfileIcon from "../../assets/profile.png";

export default function DashboardRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState("post");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://food-donation-platform-4.onrender.com/restaurant/${id}`)
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, [id]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className="w-80 flex flex-col justify-between p-8 shadow-lg"
        style={{ backgroundColor: "#eff5e1" }}
      >
        {/* Top Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <img
              src={
                profile?.imagePath
                  ? `http://localhost:5000${profile.imagePath}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="p"
              className="w-40 h-50 rounded-full object-cover mx-auto border-2 border-[#2d3b36]/20 shadow-sm"
            />
            <p
              className="mt-3 text-lg font-semibold"
              style={{ color: "#2d3b36", fontFamily: "Inter, sans-serif" }}
            >
              {profile?.restaurantName}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full flex flex-col gap-3 mt-8">
            <button
              onClick={() => setActive("myposts")}
              className="w-full py-3 px-5 rounded-lg text-left text-lg transition-all duration-200 hover:bg-[#f8fee5] flex items-center gap-3"
              style={{
                backgroundColor: active === "myposts" ? "#f8fee5" : "transparent",
                color: "#2d3b36",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
              }}
            >
              <img src={MyPostsIcon} alt="My Posts" className="w-11 h-25" />
              My Posts
            </button>

            <button
              onClick={() => setActive("post")}
              className="w-full py-3 px-5 rounded-lg text-left text-lg transition-all duration-200 hover:bg-[#f8fee5] flex items-center gap-3"
              style={{
                backgroundColor: active === "post" ? "#f8fee5" : "transparent",
                color: "#2d3b36",
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
              }}
            >
              <img src={PostFoodIcon} alt="Post Food" className="w-10 h-25" />
              Post Food
            </button>

            <button
              onClick={() => setActive("profile")}
              className="w-full py-3 px-5 rounded-lg text-left text-lg transition-all duration-200 hover:bg-[#f8fee5] flex items-center gap-3"
              style={{
                backgroundColor: active === "profile" ? "#f8fee5" : "transparent",
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
            © 2025 FoodShare
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
        {active === "myposts" && <RestaurantMyPosts restaurantId={id} />}
        {active === "post" && <RestaurantFoodForm restaurantId={id} />}
        {active === "profile" && <RestaurantProfile restaurantId={id} />}
      </div>
    </div>
  );
}
