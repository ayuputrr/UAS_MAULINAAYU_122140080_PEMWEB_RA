import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    if (role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Login</h1>
        <p className="text-sm text-gray-600 mb-6">Silakan pilih peran login Anda:</p>

        <button
          onClick={() => handleLogin("user")}
          className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-600 transition"
        >
          Masuk sebagai Pengguna
        </button>
        <button
          onClick={() => handleLogin("admin")}
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Masuk sebagai Admin
        </button>
      </div>
    </div>
  );
}
