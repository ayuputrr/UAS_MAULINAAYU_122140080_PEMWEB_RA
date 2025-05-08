// src/pages/Login.js
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Masuk sebagai:</h1>
      <button
        onClick={() => handleLogin("user")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 hover:bg-blue-600"
      >
        Pengguna
      </button>
      <button
        onClick={() => handleLogin("admin")}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Admin
      </button>
    </div>
  );
}
