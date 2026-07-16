import express from "express";
import cors from "cors";
import { connectTODatabase } from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const isAdminBootstrap = (email, password) =>
  email?.toLowerCase() === "admin@gmail.com" && password === "123Admin";

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
    const role = isAdminBootstrap(email, password) ? "admin" : "user";

    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role],
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
    let [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0 && isAdminBootstrap(email, password)) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        ["admin", email, hashedPassword, "admin"],
      );
      [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not exists" });
    }

    const storedPassword = rows[0].password;
    let isMatch = false;

    if (storedPassword) {
      try {
        isMatch = await bcrypt.compare(password, storedPassword);
      } catch {
        isMatch = false;
      }
    }

    if (!isMatch && storedPassword === password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("UPDATE users SET password = ? WHERE id = ?", [
        hashedPassword,
        rows[0].id,
      ]);
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    const normalizedEmail = (rows[0].email || "").toLowerCase();
    const normalizedPassword = password || "";
    const isBootstrapAdmin =
      normalizedEmail === "admin@gmail.com" &&
      normalizedPassword === "123Admin";

    if (
      (isBootstrapAdmin || rows[0].role === "admin") &&
      rows[0].role !== "admin"
    ) {
      await db.query("UPDATE users SET role = 'admin' WHERE id = ?", [
        rows[0].id,
      ]);
      rows[0].role = "admin";
    }

    // ✅ Include role in token
    const token = jwt.sign(
      { id: rows[0].id, role: rows[0].role }, // role include
      process.env.JWT_KEY,
      { expiresIn: "5h" },
    );

    // Send token AND username in response
    res.status(201).json({
      message: "Login successful",
      token: token,
      id: rows[0].id, // ✅ Add this
      name: rows[0].username,
      role: rows[0].role,
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
