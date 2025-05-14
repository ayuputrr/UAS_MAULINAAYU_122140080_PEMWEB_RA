import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // ✅ TAMBAHKAN INI

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutConfirm(false);
    navigate("/"); // Arahkan ke landing page
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner rounded-t-xl z-50">
        <div className="flex justify-around items-center py-2 text-sm">
          <button
            onClick={() => navigate("/user")}
            className="text-blue-600 flex flex-col items-center"
          >
            <span>🏠</span>
            Beranda
          </button>
          <button
            onClick={() => navigate("/user/pinjaman")}
            className="text-gray-600 flex flex-col items-center"
          >
            <span>📚</span>
            Pinjaman
          </button>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-orange-600 flex flex-col items-center"
          >
            <span>🚪</span>
            Keluar
          </button>
        </div>
      </div>

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
