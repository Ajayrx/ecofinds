const API_URL = "http://localhost:5000/api";

export const api = {
  signup: (data: any) =>
    fetch(`${API_URL}/auth/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),

  login: (data: any) =>
    fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),

  getProducts: () => fetch(`${API_URL}/products`).then((res) => res.json()),
};
