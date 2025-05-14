import { useState, useEffect, useMemo, useCallback } from "react";
import { books as initialBooks } from "../data/books";

export default function useBookManager() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem("books");
    return stored ? JSON.parse(stored) : initialBooks;
  });

  const [borrowed, setBorrowed] = useState(() => {
    const stored = localStorage.getItem("borrowed");
    const parsed = stored ? JSON.parse(stored) : [];
    return parsed.map(b => ({
      ...b,
      returned: b.returned ?? false,
    }));
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔁 Ambil data dari API saat pertama kali
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/books");
        if (!response.ok) {
          throw new Error("Gagal mengambil data buku dari server");
        }
        const data = await response.json();
        setBooks(data);
        localStorage.setItem("books", JSON.stringify(data));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // 💾 Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("borrowed", JSON.stringify(borrowed));
  }, [borrowed]);

  // ✅ Tambah buku (lokal + kirim ke backend)
  const addBook = async (newBook) => {
    const bookWithMeta = {
      ...newBook,
      id: Date.now(),
      available: true,
    };

    // Tambahkan ke state lokal dulu
    setBooks((prev) => [...prev, bookWithMeta]);

    // Kirim ke server
    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookWithMeta),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan buku ke server");
      }
    } catch (err) {
      console.error("POST error:", err);
      setError("Gagal menyimpan ke server");
    }
  };

  // ✅ Hapus buku
  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
    setBorrowed(borrowed.filter((b) => b.id !== id));
  };

  // ✅ Update buku
  const updateBook = (id, updatedData) => {
    setBooks(books.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  // ✅ Pinjam buku
  const borrowBook = useCallback((book) => {
    if (!book.available) return;

    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...b, available: false } : b
    );

    const borrowedBook = {
      ...book,
      available: false,
      returned: false,
      borrowDate: new Date().toISOString(),
    };

    setBooks(updatedBooks);
    setBorrowed((prev) => [...prev, borrowedBook]);
  }, [books]);

  // ✅ Kembalikan buku
  const markAsReturned = useCallback((id) => {
    const updatedBorrowed = borrowed.map((b) =>
      b.id === id ? { ...b, returned: true } : b
    );
    const updatedBooks = books.map((b) =>
      b.id === id ? { ...b, available: true } : b
    );

    setBorrowed(updatedBorrowed);
    setBooks(updatedBooks);
  }, [borrowed, books]);

  // ✅ Filter buku yang tersedia
  const availableBooks = useMemo(() => {
    return books.filter((b) => b.available);
  }, [books]);

  return {
    books,
    borrowed,
    availableBooks,
    loading,
    error,
    addBook,
    deleteBook,
    updateBook,
    borrowBook,
    markAsReturned,
    setBooks,
    setBorrowed,
  };
}
