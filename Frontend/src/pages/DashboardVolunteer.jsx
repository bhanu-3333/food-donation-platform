import React from "react";

export default function DashboardVolunteer() {
  const user = JSON.parse(localStorage.getItem("fd_user") || "{}");
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome, {user.name || "Volunteer/NGO"} 🤝</h2>
        <p className="small-muted">View nearby food posts and accept pickups from restaurants.</p>
        <div style={{ marginTop: 20 }}>
          <p><strong>Quick Actions</strong></p>
          <ul>
            <li>View Nearby Posts (map)</li>
            <li>Active Pickups</li>
            <li>Delivery History</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
