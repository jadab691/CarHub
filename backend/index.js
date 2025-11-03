import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import carRoute from "./routes/car.routes.js";
import userRoute from "./routes/user.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;

const URI = process.env.MongoDBURI; // MONGO_URI

//connect to MongoDB
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB ");
} catch (error) {
  console.log("Error: ", error);
}

//define routes
app.use("/car", carRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
