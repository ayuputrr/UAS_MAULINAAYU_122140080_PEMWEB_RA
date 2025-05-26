import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/");
  };

  return (
    <>
      <div className="bottom-nav-container">
        <div className="bottom-nav-buttons">
          <button
            onClick={() => navigate("/user")}
            className="bottom-nav-button bottom-nav-button-inactive"
          >
            <span>🏠</span>
            Beranda
          </button>

          <button
            onClick={() => navigate("/user/pinjaman")}
            className="bottom-nav-button bottom-nav-button-inactive"
          >
            <span>📚</span>
            Pinjaman
          </button>

          {/* ✅ Tambahkan tombol Favorit */}
          <button
            onClick={() => navigate("/user/favorit")}
            className="bottom-nav-button bottom-nav-button-inactive"
          >
            <span>⭐</span>
            Favorit
          </button>

          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="bottom-nav-button bottom-nav-logout"
          >
            <span>🚪</span>
            Keluar
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="logout-modal-container">
          <div className="logout-modal">
            <h2 className="logout-modal-title">Yakin ingin keluar?</h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleLogout}
                className="logout-modal-button"
              >
                Ya, Keluar
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="logout-modal-cancel"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
