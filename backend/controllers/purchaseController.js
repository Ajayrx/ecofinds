import fs from "fs";
import path from "path";

const purchasesFile = path.join(process.cwd(), "backend/data/purchases.json");

export const getPurchases = (req, res) => {
  const purchases = JSON.parse(fs.readFileSync(purchasesFile, "utf-8"));
  res.json(purchases[req.params.userId] || []);
};

export const addPurchase = (req, res) => {
  let purchases = JSON.parse(fs.readFileSync(purchasesFile, "utf-8"));
  if (!purchases[req.params.userId]) purchases[req.params.userId] = [];
  purchases[req.params.userId].push(req.body);
  fs.writeFileSync(purchasesFile, JSON.stringify(purchases, null, 2));
  res.json(purchases[req.params.userId]);
};
