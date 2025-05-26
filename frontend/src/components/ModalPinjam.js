// src/components/ModalPinjam.js
export default function ModalPinjam({ book, onConfirm, onClose }) {
  if (!book) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">Konfirmasi Peminjaman</h2>
        <p className="modal-description">
          Apakah kamu yakin ingin meminjam buku <span className="font-bold">{book.title}</span>?
        </p>
        <div className="modal-button-container">
          <button
            className="modal-button modal-button-cancel"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="modal-button modal-button-confirm"
            onClick={onConfirm}
          >
            Pinjam
          </button>
        </div>
      </div>
    </div>
  );
}
