import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";
import { connectTODatabase } from "../lib/db.js";

const router = express.Router();

// ===================== show all users =====================
router.get("/all-users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const db = await connectTODatabase();
    const [rows] = await db.query("SELECT id, username, email FROM users"); // include id
    res.status(200).json({ users: rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== Delete user =====================
router.delete(
  "/delete-user/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const db = await connectTODatabase();
      await db.query("DELETE FROM users WHERE id = ?", [userId]);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// fetch cars from the database 
router.get("/all-cars", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const db = await connectTODatabase();
    const [cars] = await db.query("SELECT id, name, price, image FROM cars");
    res.status(200).json({ cars });
  } catch (err) {
    console.error("Error fetching cars:", err); // <-- log actual error
    res.status(500).json({ message: "Server error" });
  }
});

// car delet korar jonno routes 
router.delete("/delete-car/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const carId = req.params.id;
    const db = await connectTODatabase();
    await db.query("DELETE FROM cars WHERE id = ?", [carId]);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error("Error fetching cars:", err); // <-- log actual error
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
