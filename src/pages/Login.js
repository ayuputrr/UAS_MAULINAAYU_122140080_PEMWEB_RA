// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("siswa"); // "admin" atau "siswa"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "admin") {
      // Validasi login admin
      if (email === "admin@example.com" && password === "admin123") {
        navigate("/admin");
      } else {
        setError("Email atau password admin salah.");
      }
    } else {
      // Login atau Register siswa
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (isRegister) {
        // Proses registrasi siswa
        if (users.find((u) => u.email === email)) {
          setError("Email sudah terdaftar.");
        } else {
          const newUsers = [...users, { email, password }];
          localStorage.setItem("users", JSON.stringify(newUsers));
          navigate("/user");
        }
      } else {
        // Proses login siswa
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          navigate("/user");
        } else {
          setError("Email atau password siswa salah.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Login Perpustakaan</h2>

        {/* Pilih Role */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => {
              setRole("siswa");
              setIsRegister(false);
              setError("");
            }}
            className={`px-3 py-1 rounded ${
              role === "siswa"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Siswa
          </button>
          <button
            onClick={() => {
              setRole("admin");
              setIsRegister(false);
              setError("");
            }}
            className={`px-3 py-1 rounded ${
              role === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Admin
          </button>
        </div>

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
          >
            {role === "siswa" && isRegister ? "Daftar" : "Masuk"}
          </button>
        </form>

        {role === "siswa" && (
          <p className="mt-4 text-sm text-center text-gray-600">
            {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
              className="text-blue-600 hover:underline font-medium"
            >
              {isRegister ? "Login di sini" : "Daftar di sini"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
