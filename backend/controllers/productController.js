import fs from "fs";
import path from "path";

const dataFilePath = path.resolve("./data/products.json");

// Get all products
export const getProducts = (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error reading products file" });
  }
};

// Add new product
export const addProduct = (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    const products = JSON.parse(data);

    const newProduct = {
      id: Date.now(),
      ...req.body,
    };

    products.push(newProduct);
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

// Update product
export const updateProduct = (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    let products = JSON.parse(data);

    const productIndex = products.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
    };

    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));

    res.json(products[productIndex]);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete product
export const deleteProduct = (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    let products = JSON.parse(data);

    const filtered = products.filter(
      (p) => p.id !== parseInt(req.params.id)
    );

    if (filtered.length === products.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2));

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
