import express from "express";
import Restaurant from "../models/Restaurant.js";
import Volunteer from "../models/Volunteer.js";

const router = express.Router();

router.get("/restaurant/:id", async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id).select("-password");
    if (!r) return res.status(404).json({ message: "Not found" });
    res.json(r);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/volunteer/:id", async (req, res) => {
  try {
    const v = await Volunteer.findById(req.params.id).select("-password");
    if (!v) return res.status(404).json({ message: "Not found" });
    res.json(v);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
