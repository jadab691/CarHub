import express from "express";
import getCar from "../controller/car.controller.js";

const router = express.Router();

router.get("/", getCar);

export default router;

