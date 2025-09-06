import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();

// Allow requests from frontend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
