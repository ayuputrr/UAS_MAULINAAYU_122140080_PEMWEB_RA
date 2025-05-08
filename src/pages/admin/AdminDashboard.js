import { useState } from "react";
import useBookManager from "../../hooks/useBookManager";
import BottomNavAdmin from "../../components/BottomNavAdmin"; // ✅ tambahkan ini

export default function AdminDashboard() {
  const {
    books,
    borrowed,
    handleAdd,
    handleDelete,
    handleUpdate,
  } = useBookManager();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState(null);

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.available).length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;

    if (editId) {
      handleUpdate(editId, { title, author });
      setEditId(null);
    } else {
      handleAdd({
        title,
        author,
        category: "Umum",
        cover: "https://via.placeholder.com/100x150?text=Book",
        available: true,
      });
    }

    setTitle("");
    setAuthor("");
  };

  const startEdit = (book) => {
    setEditId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Dashboard Admin</h2>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Total Buku</p>
          <p className="text-2xl font-bold text-blue-700">{totalBooks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Tersedia</p>
          <p className="text-2xl font-bold text-blue-700">{availableBooks}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-600">Dipinjam</p>
          <p className="text-2xl font-bold text-blue-700">{borrowed.length}</p>
        </div>
      </div>

      {/* Tambah/Edit Buku */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">{editId ? "Edit Buku" : "Tambah Buku"}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            placeholder="Judul Buku"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            placeholder="Penulis"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update" : "Tambah"}
          </button>
        </form>
      </div>

      {/* Daftar Buku */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Daftar Buku</h3>
        <table className="w-full text-sm table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">Judul</th>
              <th className="p-2 border-b">Penulis</th>
              <th className="p-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="p-2 border-b">{book.title}</td>
                <td className="p-2 border-b">{book.author}</td>
                <td className="p-2 border-b space-x-2">
                  <button
                    onClick={() => startEdit(book)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Daftar Buku Dipinjam */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Daftar Buku Dipinjam</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">Judul</th>
              <th className="p-2 border-b">Penulis</th>
            </tr>
          </thead>
          <tbody>
            {borrowed.length > 0 ? (
              borrowed.map((book) => (
                <tr key={book.id}>
                  <td className="p-2 border-b">{book.title}</td>
                  <td className="p-2 border-b">{book.author}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-2 text-center text-gray-500">
                  Belum ada buku dipinjam.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Navbar Admin */}
      <BottomNavAdmin />
    </div>
  );
}
