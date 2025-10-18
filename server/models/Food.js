import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  restaurantName: String,
  foodName: String,
  description: String,
  imagePath: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, default: "available" }, // available | accepted
  acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", default: null },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Food", FoodSchema);
