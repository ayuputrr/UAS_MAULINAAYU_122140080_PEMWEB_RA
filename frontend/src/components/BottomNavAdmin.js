import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../aset/logo.jpg"; // path sudah benar
import "./bottomNav.css";

export default function TopNavAdmin() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <>
   
      <div className="top-nav-container">
        
        <img
          src={logo}
          alt="Logo"
          className="top-nav-logo"
          onClick={() => navigate("/admin")}
          style={{ cursor: "pointer" }}
        />

        {/* Tombol kanan dibungkus wrapper */}
        <div className="top-nav-buttons-wrapper">
          <button onClick={() => navigate("/admin")} className="top-nav-button">
            Dashboard
          </button>

          <button onClick={() => navigate("/admin/laporan")} className="top-nav-button">
            Laporan
          </button>

          <button onClick={() => setShowLogoutConfirm(true)} className="top-nav-button">
            Keluar
          </button>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogoutConfirm && (
        <div className="logout-modal-container">
          <div className="logout-modal">
            <h2 className="logout-modal-title">Yakin ingin keluar?</h2>
            <div className="logout-modal-actions">
              <button onClick={handleLogout} className="logout-modal-button">
                Ya, Keluar
              </button>
              <button onClick={() => setShowLogoutConfirm(false)} className="logout-modal-cancel">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
