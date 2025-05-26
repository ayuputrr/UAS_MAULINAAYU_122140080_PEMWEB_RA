import BottomNavAdmin from '../../components/BottomNavAdmin'; // sesuaikan path
import React, { useState, useMemo } from "react";
import { usePeminjaman } from "../../hooks/usePeminjaman";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function LaporanPage() {
  const { peminjamans = [], loading, error, updatePeminjaman, deletePeminjaman } = usePeminjaman();
  const [searchTerm, setSearchTerm] = useState("");

  // Group buku berdasarkan buku_id + status returned agar dipisah
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

  // Filter berdasarkan search term
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

  // Fungsi untuk ubah status returned
  const handleReturn = async (book) => {
    try {
      await updatePeminjaman(book.id, { returned: true });
      alert(`Buku "${book.nama_buku}" telah ditandai sudah dikembalikan.`);
    } catch {
      alert("Gagal memperbarui status pengembalian.");
    }
  };

  // Fungsi hapus semua peminjaman buku
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
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  return (
    <div className="admin-dashboard-container" style={{ paddingBottom: "80px" }}>
      <h2 className="admin-dashboard-title" style={{ textAlign: "center", marginBottom: "1rem" }}>
        Laporan Buku Dipinjam
      </h2>

      <div style={{ maxWidth: "400px", margin: "0 auto 1.5rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Cari berdasarkan judul buku..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        Total Buku Dipinjam: <strong>{totalDipinjam}</strong>
      </p>

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button
          onClick={exportToPDF}
          style={{
            padding: "0.5rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "0.5rem",
            border: "none",
            backgroundColor: "#1976D2",
            color: "#fff",
          }}
        >
          Export ke PDF
        </button>
      </div>

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: "center" }}>Tidak ada buku yang sedang dipinjam.</p>
      ) : (
        <ul
          className="books-list"
          style={{ maxWidth: "600px", margin: "0 auto", padding: 0, listStyle: "none" }}
        >
          {filteredBooks.map((book) => (
            <li
              key={`${book.buku_id}-${book.returned}`}
              className="book-item"
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                marginBottom: "1rem",
                borderBottom: "1px solid #eee",
                paddingBottom: "1rem",
              }}
            >
              {book.cover && (
                <img
                  src={book.cover}
                  alt={book.nama_buku}
                  style={{ width: "60px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                />
              )}
              <div className="book-info" style={{ flex: 1 }}>
                <span className="book-title" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {book.nama_buku}
                </span>
                <br />
                <span>Jumlah: {book.jumlah || 1}</span>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    color: book.returned ? "green" : "#e63946",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {book.returned ? "✔ Sudah Dikembalikan" : "❌ Belum Dikembalikan"}
                </span>

                {!book.returned && (
                  <button
                    onClick={() => handleReturn(book)}
                    style={{
                      padding: "0.3rem 0.75rem",
                      cursor: "pointer",
                      borderRadius: "0.3rem",
                      border: "none",
                      backgroundColor: "#2a9d8f",
                      color: "white",
                    }}
                    title="Tandai sudah dikembalikan"
                  >
                    Kembalikan
                  </button>
                )}

                {/* Tombol hapus semua peminjaman untuk buku ini */}
                <button
                  onClick={() => handleDelete(book)}
                  style={{
                    padding: "0.3rem 0.75rem",
                    cursor: "pointer",
                    borderRadius: "0.3rem",
                    border: "none",
                    backgroundColor: "#e53e3e",
                    color: "white",
                  }}
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
