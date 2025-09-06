import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/auth"); // redirect to combined login/signup
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">
        <Link to="/">EcoFinds</Link>
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Login / Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
