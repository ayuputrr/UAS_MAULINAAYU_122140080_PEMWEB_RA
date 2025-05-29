import BottomNavAdmin from '../../components/BottomNavAdmin'; 
import React, { useState, useMemo } from "react";
import { usePeminjaman } from "../../hooks/usePeminjaman";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./LaporanPage.css";

export default function LaporanPage() {
  const { peminjamans = [], loading, error, updatePeminjaman, deletePeminjaman } = usePeminjaman();
  const [searchTerm, setSearchTerm] = useState("");

  const groupedBooks = useMemo(() => {
    const map = {};
    for (const book of peminjamans) {
      const key = `${book.buku_id}-${book.returned ? "returned" : "notreturned"}`;
      if (!map[key]) {
        map[key] = { ...book, jumlah: 0, returned: book.returned, peminjaman_ids: [] };
      }
      map[key].jumlah += book.jumlah || 1;
      map[key].peminjaman_ids.push(book.id);
    }
    return Object.values(map);
  }, [peminjamans]);

  const filteredBooks = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return groupedBooks.filter((book) =>
      book.nama_buku.toLowerCase().includes(lowerSearch)
    );
  }, [groupedBooks, searchTerm]);

  const totalDipinjam = filteredBooks.reduce(
    (acc, book) => acc + (book.jumlah || 1),
    0
  );

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Laporan Buku Dipinjam", 14, 22);

    doc.setFontSize(12);
    doc.text(`Total Buku Dipinjam: ${totalDipinjam}`, 14, 30);

    const tableColumn = ["Judul Buku", "Status", "Jumlah"];
    const tableRows = filteredBooks.map((book) => [
      book.nama_buku,
      book.returned ? "Sudah Dikembalikan" : "Belum Dikembalikan",
      book.jumlah?.toString() || "1",
    ]);

    autoTable(doc, {
      startY: 36,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("laporan_buku_dipinjam.pdf");
  };

  const handleReturn = async (book) => {
    try {
      await updatePeminjaman(book.id, { returned: true });
      alert(`Buku "${book.nama_buku}" telah ditandai sudah dikembalikan.`);
    } catch {
      alert("Gagal memperbarui status pengembalian.");
    }
  };

  const handleDelete = async (book) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus semua peminjaman untuk "${book.nama_buku}"?`)) return;
    try {
      for (const id of book.peminjaman_ids) {
        await deletePeminjaman(id);
      }
      alert(`Semua peminjaman untuk buku "${book.nama_buku}" berhasil dihapus.`);
    } catch {
      alert("Gagal menghapus peminjaman.");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading data...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Laporan Buku Dipinjam</h2>

      <div className="search-input-container">
        <input
          type="text"
          placeholder="Cari berdasarkan judul buku..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <p className="total-dipinjam">
        Total Buku Dipinjam: <strong>{totalDipinjam}</strong>
      </p>

      <div className="export-button-container">
        <button onClick={exportToPDF} className="export-button">
          Export ke PDF
        </button>
      </div>

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: "center" }}>Tidak ada buku yang sedang dipinjam.</p>
      ) : (
        <ul className="books-list">
          {filteredBooks.map((book) => (
            <li key={`${book.buku_id}-${book.returned}`} className="book-item">
              {book.cover && (
                <img
                  src={book.cover}
                  alt={book.nama_buku}
                  className="book-cover"
                />
              )}
              <div className="book-info">
                <span className="book-title">{book.nama_buku}</span>
                <br />
                <span>Jumlah: {book.jumlah || 1}</span>
              </div>
              <div className="actions">
                <span
                  className={`status-text ${
                    book.returned ? "status-returned" : "status-not-returned"
                  }`}
                >
                  {book.returned ? "✔ Sudah Dikembalikan" : "❌ Belum Dikembalikan"}
                </span>

                {!book.returned && (
                  <button
                    onClick={() => handleReturn(book)}
                    className="action-button return-button"
                    title="Tandai sudah dikembalikan"
                  >
                    Kembalikan
                  </button>
                )}

                <button
                  onClick={() => handleDelete(book)}
                  className="action-button delete-button"
                  title="Hapus semua peminjaman buku ini"
                >
                  Hapus Semua
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <BottomNavAdmin />
    </div>
  );
}
