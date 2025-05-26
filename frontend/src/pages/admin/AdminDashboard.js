import { useState, useMemo, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useBuku } from "../../hooks/useBuku";
import { usePeminjaman } from "../../hooks/usePeminjaman";
import { FaSearch } from "react-icons/fa";
import "../../index.css";
import BottomNavAdmin from "../../components/BottomNavAdmin";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Validasi login dan role admin manual tanpa PrivateRoute
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return navigate("/login");
    try {
      const user = JSON.parse(userData);
      if (user.role?.toLowerCase() !== "admin") navigate("/login");
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const { bukus, addBuku, updateBuku, deleteBuku } = useBuku();
  const {
    peminjamans,
    loading: loadingPeminjaman,
    error: errorPeminjaman,
  } = usePeminjaman();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [kategori, setKategori] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCover("");
    setKategori("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    try {
      if (editId) {
        if (window.confirm("Apakah anda yakin ingin mengupdate data buku ini?")) {
          await updateBuku(editId, {
            nama_buku: title.trim(),
            nama_penulis: author.trim(),
            cover: cover.trim(),
            kategori: kategori.trim(),
          });
          resetForm();
        }
      } else {
        if (window.confirm("Apakah anda yakin ingin menambahkan buku baru?")) {
          await addBuku({
            nama_buku: title.trim(),
            nama_penulis: author.trim(),
            cover: cover.trim(),
            kategori: kategori.trim(),
            stok: 1,
          });
          resetForm();
        }
      }
    } catch (err) {
      alert('Terjadi kesalahan: ' + err.message);
    }
  };

  const startEdit = (buku) => {
    setEditId(buku.id);
    setTitle(buku.nama_buku);
    setAuthor(buku.nama_penulis);
    setCover(buku.cover || "");
    setKategori(buku.kategori || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus buku ini?")) {
      try {
        await deleteBuku(id);
        if (editId === id) resetForm();
      } catch (error) {
        alert("Gagal menghapus buku: " + error.message);
      }
    }
  };

  const totalDipinjam = peminjamans.reduce(
    (acc, pinjam) => acc + (pinjam.jumlah || 1),
    0
  );

  const filteredBukus = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return bukus.filter(
      (buku) =>
        buku.nama_buku.toLowerCase().includes(lowerSearch) ||
        buku.nama_penulis.toLowerCase().includes(lowerSearch)
    );
  }, [bukus, searchTerm]);

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>

      <div className="stat-cards">
        <div
          className="stat-card blue"
          style={{ background: "linear-gradient(135deg, #1976D2, #42A5F5)" }}
        >
          <div className="stat-label">Buku yang Dipinjam</div>
          <div className="stat-value">
            {loadingPeminjaman
              ? "Loading..."
              : errorPeminjaman
              ? "Error"
              : totalDipinjam}
          </div>
        </div>
      </div>

      <div
        className="search-bar-container"
        style={{ maxWidth: "400px", margin: "0 auto 1.5rem" }}
      >
        <FaSearch className="search-bar-icon" />
        <input
          type="text"
          placeholder="Cari buku berdasarkan judul atau penulis..."
          className="search-bar-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul Buku"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Penulis"
          className="form-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cover URL"
          className="form-input"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kategori"
          className="form-input"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        />
        <button type="submit" className="button-primary">
          {editId ? "Update" : "Tambah"}
        </button>
        {editId && (
          <button
            type="button"
            className="button-secondary"
            onClick={resetForm}
            style={{ marginLeft: "10px" }}
          >
            Batal
          </button>
        )}
      </form>

      <h3 className="admin-dashboard-title">Daftar Buku</h3>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredBukus.length > 0 ? (
              filteredBukus.map((buku) => (
                <tr key={buku.id}>
                  <td>{buku.nama_buku}</td>
                  <td>{buku.nama_penulis}</td>
                  <td>{buku.kategori || "-"}</td>
                  <td>
                    <button
                      className="table-button"
                      onClick={() => startEdit(buku)}
                    >
                      Edit
                    </button>{" "}
                    |{" "}
                    <button
                      className="table-button"
                      onClick={() => handleDelete(buku.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: "1rem" }}>
                  Tidak ada buku ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BottomNavAdmin />
    </div>
  );
}
