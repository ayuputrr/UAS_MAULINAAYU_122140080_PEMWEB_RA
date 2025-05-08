import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner rounded-t-xl z-50">
      <div className="flex justify-around items-center py-2 text-sm">
        <button onClick={() => navigate("/user")} className="text-blue-600 flex flex-col items-center">
          <span>🏠</span>
          Beranda
        </button>
        <button onClick={() => navigate("/user/pinjaman")} className="text-gray-600 flex flex-col items-center">
          <span>📚</span>
          Pinjaman
        </button>
        <button onClick={() => navigate("/user/kartu")} className="text-gray-600 flex flex-col items-center">
          <span>💳</span>
          Kartu
        </button>
        <button onClick={() => navigate("/login")} className="text-gray-600 flex flex-col items-center">
          <span>👤</span>
          Profil
        </button>
      </div>
    </div>
  );
}
