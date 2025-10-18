import React, { useState } from "react";

export default function VolunteerSignup() {
  const [ngoName, setNgoName] = useState("");
  const [representativeName, setRepresentativeName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [volunteersCount, setVolunteersCount] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [registrationDoc, setRegistrationDoc] = useState(null);
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("ngoName", ngoName);
    formData.append("representativeName", representativeName);
    formData.append("contact", contact);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("volunteersCount", volunteersCount);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    if (registrationDoc) formData.append("registrationDoc", registrationDoc);
    if (logo) formData.append("logo", logo);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register/volunteer",
        {
          method: "POST",
          body: formData, // ⚠️ don't use JSON.stringify here
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Volunteer/NGO registered successfully!");
        // clear form after successful submission
        setNgoName("");
        setRepresentativeName("");
        setContact("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setVolunteersCount("");
        setAddress("");
        setLatitude("");
        setLongitude("");
        setRegistrationDoc(null);
        setLogo(null);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="signup-container">
      <h2>Volunteer / NGO Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          placeholder="NGO Name"
          value={ngoName}
          onChange={(e) => setNgoName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Representative Name"
          value={representativeName}
          onChange={(e) => setRepresentativeName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Volunteers Count"
          value={volunteersCount}
          onChange={(e) => setVolunteersCount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <label>Upload Registration Document</label>
        <input
          type="file"
          onChange={(e) => setRegistrationDoc(e.target.files[0])}
          required
        />

        <label>Upload NGO Logo</label>
        <input
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
