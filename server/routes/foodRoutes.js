import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// create food (restaurant)
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { restaurantId, name, description, quantity, latitude, longitude, address } = req.body;
    if (!restaurantId || !name || !description) return res.status(400).json({ message: "Missing fields" });

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(400).json({ message: "Restaurant not found" });

    const food = new Food({
      restaurantId,
      restaurantName: restaurant.restaurantName,
      name,
      description,
      quantity,
      imagePath: req.file ? `/uploads/${req.file.filename}` : undefined,
      location: {
        lat: latitude ? parseFloat(latitude) : (restaurant.location?.lat || undefined),
        lng: longitude ? parseFloat(longitude) : (restaurant.location?.lng || undefined),
        address: address || restaurant.location?.address || ""
      },
      status: "Pending"
    });
    await food.save();
    res.json({ message: "Food created", food });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get all available posts (pending)
router.get("/all", async (req, res) => {
  try {
    const foods = await Food.find({ status: "Pending" }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// accept a food
router.post("/accept/:id", async (req, res) => {
  try {
    const { volunteerId } = req.body;
    if (!volunteerId) return res.status(400).json({ message: "Missing volunteerId" });

    const vol = await Volunteer.findById(volunteerId);
    if (!vol) return res.status(404).json({ message: "Volunteer not found" });

    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    if (food.status !== "Pending") return res.status(400).json({ message: "Food already accepted" });

    food.status = "Accepted";
    food.acceptedBy = vol._id;
    food.acceptedByName = vol.ngoName;
    await food.save();

    res.json({ message: "Accepted", food });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get foods of a restaurant (for My Posts)
router.get("/restaurant/:id", async (req, res) => {
  try {
    const foods = await Food.find({ restaurantId: req.params.id }).sort({ createdAt: -1 }).populate("acceptedBy", "ngoName logoPath");
    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
