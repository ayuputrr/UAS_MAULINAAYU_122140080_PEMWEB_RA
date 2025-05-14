export default function ModalPinjam({ book, onConfirm, onClose }) {
    if (!book) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-2">Konfirmasi Peminjaman</h2>
          <p className="mb-4">
            Apakah kamu yakin ingin meminjam buku <span className="font-bold">{book.title}</span>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={onConfirm}
            >
              Pinjam
            </button>
          </div>
        </div>
      </div>
    );
  }
  