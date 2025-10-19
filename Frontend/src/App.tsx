import React from "react";
import { Routes, Route } from "react-router-dom"
import { Desktop } from "./screens/Desktop/Desktop";
import LoginPage from "./pages/LoginPage";
import RestaurantSignup from "./pages/RestaurantSignup";
import VolunteerSignup from "./pages/VolunteerSignup";
import DashboardRestaurant from "./pages/dashboard/DashboardRestaurant";
import DashboardVolunteer from "./pages/dashboard/DashboardVolunteer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/login" element={<LoginPage />} />
    <Route path="/signup/volunteer" element={<VolunteerSignup />} />
<Route path="/signup/restaurant" element={<RestaurantSignup />} />

  <Route path="/dashboard/restaurant/:id" element={<DashboardRestaurant/>} />
      <Route path="/dashboard/volunteer/:id" element={<DashboardVolunteer/>} />
    </Routes>
  );
}
