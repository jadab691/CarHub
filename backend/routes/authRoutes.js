import express from "express";
import cors from "cors";
import { connectTODatabase } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ===================== Signup =====================
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body); // for debugging
  try {
    const db = await connectTODatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// ===================== Login =====================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body); // for debugging
  try {
    const db = await connectTODatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not exists" });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, {
      expiresIn: "3h",
    });

    // Send token AND username in response
    res.status(201).json({
      message: "Login successful",
      token: token,
      name: rows[0].username, // ✅ important for localStorage
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// ===================== Token verification middleware =====================
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

// ===================== Get user info =====================
router.get("/home", verifyToken, async (req, res) => {
  try {
    const db = await connectTODatabase();
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [
      req.userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not exists" });
    }

    res.status(201).json({ user: rows[0] }); // includes username & email
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
