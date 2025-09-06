import express from "express";
import { signup, login, getDashboard } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard/:email", getDashboard); // simple dashboard by email

export default router;
