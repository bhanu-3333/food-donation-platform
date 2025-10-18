// App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Desktop } from "./screens/Desktop/Desktop";
 // default landing page
import LoginPage from "./pages/LoginPage";
import RestaurantSignup from "./pages/RestaurantSignup";
import VolunteerSignup from "./pages/VolunteerSignup";
import DashboardRestaurant from "./pages/dashboard/DashboardRestaurant";
import DashboardVolunteer from "./pages/dashboard/DashboardVolunteer";

export default function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Desktop />} />

      {/* Login / Signup */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/restaurant-signup" element={<RestaurantSignup />} />
      <Route path="/volunteer-signup" element={<VolunteerSignup />} />

      {/* Dashboards */}
      <Route path="/restaurant-dashboard" element={<DashboardRestaurant />} />
      <Route path="/volunteer-dashboard" element={<DashboardVolunteer />} />
    </Routes>
  );
}
