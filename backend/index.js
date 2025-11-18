import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import carsRouter from "./routes/carsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/cars", carsRouter);
app.use("/uploads", express.static("uploads"));
app.use("/admin", adminRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});




