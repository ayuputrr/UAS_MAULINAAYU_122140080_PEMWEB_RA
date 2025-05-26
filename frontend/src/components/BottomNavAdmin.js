import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNavAdmin() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/"); // Setelah logout, arahkan ke landing page atau login
  };

  return (
    <>
      <div className="bottom-nav-admin-container">
        <div className="bottom-nav-admin-buttons">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="bottom-nav-admin-button bottom-nav-button-inactive"
          >
            <span role="img" aria-label="dashboard">🏠</span>
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/laporan")}
            className="bottom-nav-admin-button bottom-nav-button-inactive"
          >
            <span role="img" aria-label="laporan">📚</span>
            Laporan
          </button>

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="bottom-nav-admin-button bottom-nav-logout"
          >
            <span role="img" aria-label="keluar">🚪</span>
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
                type="button"
                onClick={handleLogout}
                className="logout-modal-button"
              >
                Ya, Keluar
              </button>
              <button
                type="button"
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
