import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const endpoint = isLogin ? "login" : "signup";
    const body: any = isLogin
      ? { email, password }
      : { email, password, username: displayName };

    try {
      const res = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        navigate(isLogin ? "/dashboard" : "/login");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          EcoFinds
        </h1>

        {/* Toggle */}
        <div className="flex justify-center mb-6 bg-gray-200 rounded-full p-1">
          <button
            className={`flex-1 py-2 rounded-full transition-colors ${
              isLogin ? "bg-green-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-full transition-colors ${
              !isLogin ? "bg-green-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Display Name</label>
              <input
                type="text"
                placeholder="Enter your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
              required
            />
            <span
              className="absolute right-2 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {!isLogin && (
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full hover:opacity-90 transition"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
