import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  ngoName: { type: String, required: true },
  representativeName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationIdPath: { type: String }, // file path to uploaded registration doc
  volunteersCount: { type: Number },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String }
  },
  logoPath: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Volunteer", VolunteerSchema);
