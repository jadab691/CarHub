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

export default router;
