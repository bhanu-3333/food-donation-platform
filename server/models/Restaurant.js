import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  foodType: String,
  availabilityTime: String,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  imagePath: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Restaurant", RestaurantSchema);
