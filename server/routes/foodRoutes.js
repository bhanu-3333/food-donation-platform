import express from "express";
import multer from "multer";
import Food from "../models/Food.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

// ensure uploads path exists (server.js already created, but safe)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Upload a food item (restaurant)
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { restaurantId, restaurantName, foodName, description, lat, lng } = req.body;
    const newFood = new Food({
      restaurantId,
      restaurantName,
      foodName,
      description,
      imagePath: req.file ? `/uploads/${req.file.filename}` : undefined,
      location: { lat: lat ? parseFloat(lat) : undefined, lng: lng ? parseFloat(lng) : undefined },
      status: "available"
    });
    await newFood.save();
    res.json({ success: true, message: "Food uploaded", food: newFood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// Get available foods
router.get("/available", async (req, res) => {
  try {
    const foods = await Food.find({ status: "available" }).sort({ createdAt: -1 });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

// Volunteer accepts food
router.post("/accept/:foodId", async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const food = await Food.findById(req.params.foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });
    if (food.status !== "available") return res.status(400).json({ message: "Already taken" });

    food.status = "accepted";
    food.acceptedBy = volunteerId;
    await food.save();
    res.json({ success: true, message: "Accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error accepting" });
  }
});

// Get restaurant's foods
router.get("/restaurant/:id", async (req, res) => {
  try {
    const foods = await Food.find({ restaurantId: req.params.id }).populate("acceptedBy");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

export default router;
