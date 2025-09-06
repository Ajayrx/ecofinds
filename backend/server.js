import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`🚀 Backend running at http://localhost:\${PORT}\`));
