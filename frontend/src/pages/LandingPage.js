// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Selamat Datang di Pustaka App</h1>
      <p className="landing-text">Kelola dan pinjam buku dengan mudah kapan saja.</p>
      <div className="landing-buttons sm:flex-row">
        <button
          onClick={() => navigate("/login")}
          className="landing-button landing-button-primary"
        >
          Masuk
        </button>
        <button
          onClick={() => navigate("/user")}
          className="landing-button landing-button-secondary"
        >
          Lihat sebagai Tamu
        </button>
      </div>
    </div>
  );
}
