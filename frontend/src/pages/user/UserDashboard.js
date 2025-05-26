import React, { useState } from "react";
import HeaderUser from "../../components/HeaderUser";
import SearchBar from "../../components/SearchBar";
import BukuPopuler from "../../components/BukuPopuler";
import BottomNav from "../../components/BottomNav";
import { useBuku } from "../../hooks/useBuku";
import { useFavorit } from "../../hooks/useFavorit";
import { usePeminjaman } from "../../hooks/usePeminjaman";

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { bukus } = useBuku();
  const { addFavorit } = useFavorit();
  const { createPeminjaman } = usePeminjaman();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBook, setModalBook] = useState(null);
  const [jumlahPinjam, setJumlahPinjam] = useState(1);

  const filteredBooks = bukus.filter((book) =>
    book.nama_buku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = filteredBooks.reduce((acc, book) => {
    const kategori = book.kategori || "Lainnya";
    if (!acc[kategori]) acc[kategori] = [];
    acc[kategori].push(book);
    return acc;
  }, {});

  const openPinjamModal = (book) => {
    setModalBook(book);
    setJumlahPinjam(1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalBook(null);
  };

  const handleJumlahChange = (value) => {
    const num = Math.max(1, Number(value) || 1);
    setJumlahPinjam(num);
  };

  const handlePinjamSubmit = async () => {
    try {
      // Kirim jumlahPinjam juga ke backend
      await createPeminjaman(modalBook.id, jumlahPinjam);
      alert(`📚 Buku ${modalBook.nama_buku} berhasil dipinjam sebanyak ${jumlahPinjam} eksemplar!`);
      closeModal();
    } catch {
      alert("Gagal meminjam buku");
    }
  };

  const handleAddFavorit = (book) => {
    addFavorit(book.id)
      .then(() => alert(`"${book.nama_buku}" berhasil ditambahkan ke favorit!`))
      .catch(() => alert("Gagal menambahkan favorit."));
  };

  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-header">
        <HeaderUser name="Jokol" />
        <div className="search-bar-container">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="user-dashboard-content">
        {Object.entries(groupedByCategory).map(([kategori, books]) => (
          <div key={kategori} className="category-section">
            <h2 className="category-title">{kategori}</h2>
            <BukuPopuler
              books={books}
              onAddFavorit={handleAddFavorit}
              onPinjam={openPinjamModal}
            />
          </div>
        ))}
      </div>

      {/* Modal Pinjam Buku */}
      {modalVisible && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Pinjam Buku</h3>
            <p className="modal-book-title"><strong>{modalBook?.nama_buku}</strong></p>

            <div className="jumlah-controls">
              <button
                onClick={() => setJumlahPinjam((j) => (j > 1 ? j - 1 : 1))}
                aria-label="Kurangi jumlah"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={jumlahPinjam}
                onChange={(e) => handleJumlahChange(e.target.value)}
              />
              <button
                onClick={() => setJumlahPinjam((j) => j + 1)}
                aria-label="Tambah jumlah"
              >
                +
              </button>
            </div>

            <div className="modal-actions">
              <button onClick={handlePinjamSubmit} className="btn-pinjam">
                Pinjam
              </button>
              <button onClick={closeModal} className="btn-batal">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-nav-container">
        <BottomNav />
      </div>
    </div>
  );
}
