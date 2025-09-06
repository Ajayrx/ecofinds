import express from "express";
import { getPurchases, addPurchase } from "../controllers/purchaseController.js";

const router = express.Router();

router.get("/:userId", getPurchases);
router.post("/:userId", addPurchase);

export default router;
