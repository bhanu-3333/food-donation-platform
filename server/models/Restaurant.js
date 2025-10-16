import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  foodType: { type: String },
  availabilityTime: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String }
  },
  imagePath: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Restaurant", RestaurantSchema);
