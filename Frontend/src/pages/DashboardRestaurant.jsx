import React from "react";

export default function DashboardRestaurant() {
  const user = JSON.parse(localStorage.getItem("fd_user") || "{}");
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user.name || "Restaurant Partner"} 🍽️</h2>
        <p className="small-muted">Post leftover food, manage posts and view pickups here.</p>
        <div style={{ marginTop: 20 }}>
          <p><strong>Quick Actions</strong></p>
          <ul>
            <li>Post Food (coming soon)</li>
            <li>View My Posts</li>
            <li>Impact Dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
