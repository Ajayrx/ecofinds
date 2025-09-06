import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user) return <p className="p-6">Please login first.</p>;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Basic validation
    if (!username.trim() || !email.trim()) {
      setError("Username and Email cannot be empty");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      // For now, we'll just update context
      setUser({ username, email });
      setMessage("Profile updated successfully!");
      setEditing(false);

      // Optionally, make a PUT request to backend here
      // await fetch("http://localhost:5000/api/auth/update", { ... });
    } catch (err) {
      setError("Update failed. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard</h2>

      {message && (
        <p className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</p>
      )}
      {error && (
        <p className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</p>
      )}

      {!editing ? (
        <div className="space-y-2">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setError("");
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
