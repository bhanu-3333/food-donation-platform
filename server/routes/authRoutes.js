import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Restaurant from "../models/Restaurant.js";
import Volunteer from "../models/Volunteer.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Setup multer upload to server/uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = file.fieldname + "-" + Date.now();
    cb(null, base + ext);
  },
});
const upload = multer({ storage });

// ---------- Restaurant registration ----------
router.post("/register/restaurant", upload.single("image"), async (req, res) => {
  try {
    const {
      restaurantName,
      ownerName,
      contact,
      email,
      password,
      confirmPassword,
      foodType,
      time,
      address,
      latitude,
      longitude
    } = req.body;

    if (!restaurantName || !ownerName || !contact || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existing = await Restaurant.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const newRestaurant = new Restaurant({
      restaurantName,
      ownerName,
      contact,
      email,
      password: hashed,
      foodType,
      availabilityTime: time,
      location: {
        lat: latitude ? parseFloat(latitude) : undefined,
        lng: longitude ? parseFloat(longitude) : undefined,
        address: address || ""
      },
      imagePath: req.file ? `/uploads/${req.file.filename}` : undefined
    });

    await newRestaurant.save();
    res.json({ message: "Restaurant registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------- Volunteer / NGO registration ----------
router.post("/register/volunteer", upload.fields([
  { name: "registrationDoc", maxCount: 1 },
  { name: "logo", maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      ngoName,
      representativeName,
      contact,
      email,
      password,
      confirmPassword,
      volunteersCount,
      address,
      latitude,
      longitude
    } = req.body;

    if (!ngoName || !representativeName || !contact || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const regFile = req.files && req.files.registrationDoc && req.files.registrationDoc[0];
    const logoFile = req.files && req.files.logo && req.files.logo[0];

    const newVolunteer = new Volunteer({
      ngoName,
      representativeName,
      contact,
      email,
      password: hashed,
      volunteersCount: volunteersCount ? parseInt(volunteersCount) : undefined,
      location: {
        lat: latitude ? parseFloat(latitude) : undefined,
        lng: longitude ? parseFloat(longitude) : undefined,
        address: address || ""
      },
      registrationIdPath: regFile ? `/uploads/${regFile.filename}` : undefined,
      logoPath: logoFile ? `/uploads/${logoFile.filename}` : undefined
    });

    await newVolunteer.save();
    res.json({ message: "Volunteer/NGO registered successfully. Awaiting verification." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------- Login for both ----------
router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    if (!email || !password || !userType)
      return res.status(400).json({ message: "Missing fields" });

    let user;
    if (userType === "restaurant") {
      user = await Restaurant.findOne({ email });
    } else {
      user = await Volunteer.findOne({ email });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    // generate JWT token (optional)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: userType },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: userType === "restaurant" ? user.restaurantName : user.ngoName,
        email: user.email,
        role: userType
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
