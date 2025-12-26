import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Pulsegen
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Video Processing Platform
        </p>

        {/* Error */}
        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-gray-900 font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
