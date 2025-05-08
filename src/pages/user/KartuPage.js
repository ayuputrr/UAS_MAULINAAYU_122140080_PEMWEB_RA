// src/pages/user/KartuPage.js
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react"; // ✅ FIXED import
import { useReactToPrint } from "react-to-print";
import BottomNav from "../../components/BottomNav";

export default function KartuPage() {
  const componentRef = useRef();

  const user = {
    name: "Jokol",
    id: "USR00123",
    kelas: "XII IPA 1",
    bergabung: "2022-07-15",
    status: "Aktif",
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Kartu Anggota - ${user.name}`,
  });

  return (
    <div className="bg-gray-100 min-h-screen pb-24 p-4">
      <h1 className="text-xl font-bold text-blue-800 mb-4">Kartu Anggota</h1>

      <div
        ref={componentRef}
        className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto text-center space-y-3"
      >
        <QRCodeSVG value={user.id} size={96} />
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.kelas}</p>

        <div className="text-left text-sm mt-3 space-y-1">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Bergabung:</strong> {new Date(user.bergabung).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className="text-green-600">{user.status}</span></p>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Cetak Kartu
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
