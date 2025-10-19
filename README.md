# Food Donation Platform

A MERN stack application that connects **restaurants** with **volunteers** to reduce food waste through real-time food sharing and donation tracking.

---

## 🖼️ Project Preview

![Banner](https://github.com/bhanu-3333/food-donation-platform/raw/main/Frontend/src/assets/banner.png)
![Login](https://github.com/bhanu-3333/food-donation-platform/blob/main/Frontend/src/assets/login.png)


---

## Overview

This platform enables restaurants to **donate surplus food** and volunteers to **find and collect nearby donations** through an interactive map system.

The application supports **role-based dashboards** with restaurant and volunteer views, allowing seamless coordination and communication.

---

##Tech Stack

**Frontend:** React.js, React Router, Axios, Leaflet  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer  
**Other Tools:** JWT Authentication, Geolocation APIs, CORS  

---

##Features

### For Restaurants
- Add food donation posts with image upload and live location.  
- View your posted donations under “My Posts.”  
- Track volunteer acceptance status in real-time.  
- View your profile information fetched from signup data.

###  For Volunteers
- Access an interactive map with all nearby restaurant donations.  
- View donation details and accept available food posts.  
- Accepted donations appear under your dashboard for tracking.

###  Common Features
- Role-based login and signup.  
- Profile sidebar with user info.  
- Clean dashboard-style layout for both users.  

---

##  Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/bhanu-3333/food-donation-platform.git

2️⃣ Setup the Backend

cd food-donation-platform/server

npm install

npm start

Make sure MongoDB is running locally or provide your Atlas URI in .env:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000

3️⃣ Setup the Frontend

cd ../client

npm install

npm run dev
