import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const usersFilePath = path.join(__dirname, "data", "users.json");

// Helper: read users
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) fs.writeFileSync(usersFilePath, "[]");
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
};

// Helper: save users
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const signup = (req, res) => {
  const { email, password, username } = req.body;
  const users = readUsers();

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: Date.now(), email, username, password };
  users.push(newUser);
  saveUsers(users);

  res.json({ message: "User registered successfully", user: newUser });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
};

export const getDashboard = (req, res) => {
  const { email } = req.params;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
};
