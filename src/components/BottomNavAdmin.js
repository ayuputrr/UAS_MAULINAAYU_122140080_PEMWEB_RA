import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BottomNavAdmin() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/"); // langsung kembali ke landing page
  };

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner rounded-t-xl z-50">
        <div className="flex justify-around items-center py-2 text-sm">
          <button
            onClick={() => navigate("/admin")}
            className="flex flex-col items-center text-blue-600"
          >
            <span role="img" aria-label="dashboard">📊</span>
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/books")}
            className="flex flex-col items-center text-gray-600"
          >
            <span role="img" aria-label="books">📚</span>
            Kelola Buku
          </button>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex flex-col items-center text-orange-600"
          >
            <span role="img" aria-label="logout">🚪</span>
            Keluar
          </button>
        </div>
      </div>

      {/* Popup Konfirmasi Keluar */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-center">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Yakin ingin keluar?
            </h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                Ya, Keluar
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="text-red-500 hover:underline text-sm font-medium"
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
