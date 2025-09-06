import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Auth/Dashboard";
import MyListings from "./pages/MyListings";
import ProductDetail from "./components/Products/ProductDetail";
import AddProduct from "./components/Products/AddProduct";
import Cart from "./components/Cart/Cart";
import PreviousPurchases from "./components/Orders/PreviousPurchases";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/purchases" element={<PreviousPurchases />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
