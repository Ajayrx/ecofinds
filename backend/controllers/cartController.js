import fs from "fs";
import path from "path";

const cartsFile = path.join(process.cwd(), "backend/data/carts.json");

export const getCart = (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFile, "utf-8"));
  const cart = carts[req.params.userId] || [];
  res.json(cart);
};

export const addToCart = (req, res) => {
  let carts = JSON.parse(fs.readFileSync(cartsFile, "utf-8"));
  const { product } = req.body;
  if (!carts[req.params.userId]) carts[req.params.userId] = [];
  carts[req.params.userId].push(product);
  fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
  res.json(carts[req.params.userId]);
};

export const removeFromCart = (req, res) => {
  let carts = JSON.parse(fs.readFileSync(cartsFile, "utf-8"));
  if (!carts[req.params.userId]) return res.json([]);
  carts[req.params.userId] = carts[req.params.userId].filter((p) => p.id != req.params.productId);
  fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
  res.json(carts[req.params.userId]);
};
