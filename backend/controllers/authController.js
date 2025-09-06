import fs from "fs-extra";

const usersFile = "./data/users.json";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  let users = await fs.readJson(usersFile).catch(() => []);

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = { id: Date.now(), username, email, password };
  users.push(newUser);

  await fs.writeJson(usersFile, users, { spaces: 2 });
  res.json({ message: "User registered", user: newUser });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let users = await fs.readJson(usersFile).catch(() => []);

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
};
