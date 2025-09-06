// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, username }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Signup failed");
//         setLoading(false);
//         return;
//       }

//       alert(data.message || "Signup successful!");
//       navigate("/login");
//     } catch (err) {
//       setError("Network error. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

//         {error && (
//           <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full p-3 rounded text-white font-semibold ${
//             loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading ? "Signing up..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// }
