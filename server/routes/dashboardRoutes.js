import express from "express";
import Restaurant from "../models/Restaurant.js";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

// For simplicity we fetch first user or by id param (you can add auth & use JWT)
router.get("/restaurant/:id", async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Not found" });
    res.json({
      id: r._id,
      name: r.restaurantName,
      ownerName: r.ownerName,
      contact: r.contact,
      email: r.email,
      location: r.location,
      imagePath: r.imagePath
    });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/volunteer/:id", async (req, res) => {
  try {
    const v = await Volunteer.findById(req.params.id);
    if (!v) return res.status(404).json({ message: "Not found" });
    res.json({
      id: v._id,
      name: v.ngoName,
      representativeName: v.representativeName,
      contact: v.contact,
      email: v.email,
      location: v.location,
      logoPath: v.logoPath
    });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

export default router;
