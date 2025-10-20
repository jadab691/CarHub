import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import carRoute from "./routes/car.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 4000;

const URI = process.env.mongoDBURI;

//connect to MongoDB
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error :", error);
}

//define routes
app.use("/car", carRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
