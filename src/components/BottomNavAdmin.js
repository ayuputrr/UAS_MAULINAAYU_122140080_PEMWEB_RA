import { useNavigate } from "react-router-dom";

export default function BottomNavAdmin() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner rounded-t-xl z-50">
      <div className="flex justify-around items-center py-2 text-sm">
        <button
          onClick={() => navigate("/admin")}
          className="text-blue-600 flex flex-col items-center"
        >
          <span>📊</span>
          Dashboard
        </button>
        <button
          onClick={() => navigate("/admin/buku")}
          className="text-gray-600 flex flex-col items-center"
        >
          <span>📚</span>
          Kelola Buku
        </button>
        <button
          onClick={() => navigate("/login")}
          className="text-gray-600 flex flex-col items-center"
        >
          <span>🚪</span>
          Keluar
        </button>
      </div>
    </div>
  );
}
