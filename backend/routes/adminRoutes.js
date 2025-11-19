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

// delet user routes

router.delete("/delete-user/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const db = await connectTODatabase();

    // 1️⃣ Fetch the user first
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    // 2️⃣ Prevent deleting admin
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot delete an admin user" });
    }

    // 3️⃣ Delete dependent rows
    await db.query("DELETE FROM buys WHERE user_id = ?", [userId]);
    await db.query("DELETE FROM cars WHERE user_id = ?", [userId]);

    // 4️⃣ Delete the user
    await db.query("DELETE FROM users WHERE id = ?", [userId]);

    res.status(200).json({ message: "User and all related data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


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

// Delete car route
router.delete("/delete-car/:id", verifyToken, verifyAdmin, async (req, res) => {
  const carId = req.params.id;

  try {
    const db = await connectTODatabase();

    // Attempt to delete the car
    await db.query("DELETE FROM cars WHERE id = ?", [carId]);

    return res.status(200).json({ message: "Car deleted successfully" });

  } catch (err) {
    console.error("Error deleting car:", err);

    // Foreign key constraint error: car has been purchased
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      return res.status(400).json({
        message: "Cannot delete this car because it has been purchased ."
      });
    }

    // Generic server error for other cases
    return res.status(500).json({
      message: "Server error while deleting car",
      error: err.message
    });
  }
});



export default router;
