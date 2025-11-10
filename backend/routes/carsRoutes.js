import express from "express";
import multer from "multer";
import { connectTODatabase } from "../lib/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ================= Multer setup =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= Token verification middleware =================
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= POST /cars/add =================
router.post("/add", verifyToken, upload.single("image"), async (req, res) => {
  const { name, model, price, description } = req.body;
  const image = req.file?.filename; // stored filename
  const userId = req.userId;

  if (!name || !model || !price || !description || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await connectTODatabase();
    await db.query(
      "INSERT INTO cars (user_id, name, model, price, description, image) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, name, model, price, description, image]
    );
    res.status(201).json({ message: "Car posted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
