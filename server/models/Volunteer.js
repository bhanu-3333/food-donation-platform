import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  ngoName: { type: String, required: true },
  representativeName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationIdPath: String,
  volunteersCount: Number,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  logoPath: String,
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Volunteer", VolunteerSchema);
