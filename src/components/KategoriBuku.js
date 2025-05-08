import { useState } from "react";
import useBookManager from "../hooks/useBookManager";
import ModalPinjam from "./ModalPinjam"; // Tambahkan

export default function KategoriBuku({ books }) {
  const categories = [...new Set(books.map((book) => book.category))];
  const { borrowBook } = useBookManager();
  const [selectedBook, setSelectedBook] = useState(null);

  const handleConfirm = () => {
    borrowBook(selectedBook);
    setSelectedBook(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Kategori Buku</h3>

      {categories.map((cat) => {
        const bukuKategori = books.filter((book) => book.category === cat);

        return (
          <div key={cat}>
            <h4 className="text-blue-600 font-semibold mb-2">{cat}</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {bukuKategori.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded shadow w-32 shrink-0"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-36 object-cover rounded-t"
                  />
                  <div className="p-2 text-center flex flex-col justify-between h-[130px]">
                    <p className="text-sm font-medium">{book.title}</p>
                    <button
                      onClick={() => setSelectedBook(book)}
                      className={`mt-2 text-white text-sm px-2 py-1 rounded ${
                        book.available
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!book.available}
                    >
                      {book.available ? "Pinjam" : "Tidak Tersedia"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal muncul saat buku dipilih */}
      <ModalPinjam
        book={selectedBook}
        onConfirm={handleConfirm}
        onClose={() => setSelectedBook(null)}
      />
    </div>
  );
}
