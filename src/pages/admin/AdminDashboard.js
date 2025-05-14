import { useState } from "react";
import useBookManager from "../../hooks/useBookManager";
import BottomNavAdmin from "../../components/BottomNavAdmin";
import { useCategoryManager } from "../../hooks/useCategoryManager";


export default function AdminDashboard() {
  const {
    books,
    borrowed,
    addBook,
    deleteBook,
    updateBook,
    markAsReturned,
  } = useBookManager();

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategoryManager();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [editInput, setEditInput] = useState("");

  const totalBooks = books.length;
  const availableBooks = books.filter((b) => b.available).length;
  const borrowedBooks = borrowed.filter((b) => !b.returned);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;

    if (editId) {
      updateBook(editId, { title, author });
      setEditId(null);
    } else {
      addBook({
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
          <p className="text-2xl font-bold text-blue-700">{borrowedBooks.length}</p>
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
          <thead className="bg-gray-100">
            <tr>
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
                  <button onClick={() => startEdit(book)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => deleteBook(book.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Validasi Pengembalian Buku */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Validasi Pengembalian Buku</h3>
        {borrowedBooks.length === 0 ? (
          <p className="text-gray-500">Tidak ada buku yang perlu divalidasi.</p>
        ) : (
          <div className="space-y-2">
            {borrowedBooks.map((book) => (
              <div key={book.id} className="flex justify-between items-center bg-gray-50 border p-3 rounded">
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-gray-600">oleh {book.author}</p>
                </div>
                <button
                  onClick={() => markAsReturned(book.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Tandai Dikembalikan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Laporan Mingguan */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Laporan Peminjaman (7 Hari Terakhir)</h3>
        <ul className="text-sm space-y-2">
          {borrowed
            .filter((book) => {
              const now = new Date();
              const date = new Date(book.borrowDate ?? now);
              const days = (now - date) / (1000 * 60 * 60 * 24);
              return days <= 7;
            })
            .map((book) => (
              <li key={book.id} className="border-b pb-1">
                <strong>{book.title}</strong> oleh {book.author}
                <br />
                Dipinjam: {book.borrowDate?.split("T")[0] || "-"} —{" "}
                {book.returned ? "✅ Dikembalikan" : "⏳ Belum"}
              </li>
            ))}
        </ul>
      </div>

      {/* CRUD Kategori Buku */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Kategori Buku</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!newCategory.trim() || categories.includes(newCategory)) return;
            addCategory(newCategory.trim());
            setNewCategory("");
          }}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            placeholder="Tambah kategori baru"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tambah
          </button>
        </form>

        <ul className="space-y-2 text-sm">
          {categories.map((cat) => (
            <li key={cat} className="flex justify-between items-center border-b py-1">
              {editingCategory === cat ? (
                <>
                  <input
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    className="border p-1 rounded w-full mr-2"
                  />
                  <button
                    onClick={() => {
                      updateCategory(cat, editInput.trim());
                      setEditingCategory("");
                    }}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Simpan
                  </button>
                </>
              ) : (
                <>
                  <span className="text-gray-700">{cat}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setEditInput(cat);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <BottomNavAdmin />
    </div>
  );
}
