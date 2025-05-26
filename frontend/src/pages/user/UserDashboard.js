import React, { useState, useEffect, useRef } from "react";
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

  const [visibleCategories, setVisibleCategories] = useState({});

  const filteredBooks = bukus.filter((book) =>
    book.nama_buku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = filteredBooks.reduce((acc, book) => {
    const kategori = book.kategori || "Lainnya";
    if (!acc[kategori]) acc[kategori] = [];
    acc[kategori].push(book);
    return acc;
  }, {});

  const categoryRefs = useRef({});

  // Intersection Observer tetap untuk animasi masuk
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-category");
            setVisibleCategories((prev) => ({ ...prev, [key]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.keys(groupedByCategory).forEach((kategori) => {
      const el = categoryRefs.current[kategori];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [groupedByCategory]);

  // State dan ref untuk deteksi arah scroll
  const [scrollDirection, setScrollDirection] = useState("none");
  const lastScrollTop = useRef(0);

  useEffect(() => {
    function onScroll() {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop.current) {
        setScrollDirection("down");
      } else if (currentScrollTop < lastScrollTop.current) {
        setScrollDirection("up");
      }
      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; // Prevent negative scroll
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
    <>
      <style>{`
        .category-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.85s ease, transform 0.85s ease;
        }
        .category-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .user-dashboard-content {
          transition: transform 0.3s ease;
        }

        .user-dashboard-content.scroll-up {
          transform: translateY(-20px);
        }

        .user-dashboard-content.scroll-down {
          transform: translateY(20px);
        }

        /* Styling tambahan untuk modal, tombol dsb... */
      `}</style>

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

        <div
          className={`user-dashboard-content ${
            scrollDirection === "up"
              ? "scroll-up"
              : scrollDirection === "down"
              ? "scroll-down"
              : ""
          }`}
        >
          {Object.entries(groupedByCategory).map(([kategori, books]) => (
            <div
              key={kategori}
              data-category={kategori}
              ref={(el) => (categoryRefs.current[kategori] = el)}
              className={`category-section ${visibleCategories[kategori] ? "visible" : ""}`}
            >
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
    </>
  );
}
