// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-6 text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Selamat Datang di Pustaka App</h1>
      <p className="text-gray-600 mb-8">Kelola dan pinjam buku dengan mudah kapan saja.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
        >
          Masuk
        </button>
        <button
          onClick={() => navigate("/user")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded font-medium"
        >
          Lihat sebagai Tamu
        </button>
      </div>
    </div>
  );
}
