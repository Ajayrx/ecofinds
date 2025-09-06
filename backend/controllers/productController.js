import fs from "fs-extra";

const productsFile = "./data/products.json";

export const getProducts = async (req, res) => {
  const products = await fs.readJson(productsFile).catch(() => []);
  res.json(products);
};

export const addProduct = async (req, res) => {
  const { title, description, category, price, image } = req.body;
  let products = await fs.readJson(productsFile).catch(() => []);

  const newProduct = { id: Date.now(), title, description, category, price, image };
  products.push(newProduct);

  await fs.writeJson(productsFile, products, { spaces: 2 });
  res.json({ message: "Product added", product: newProduct });
};
