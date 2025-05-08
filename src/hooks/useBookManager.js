import { useState, useEffect, useMemo, useCallback } from "react";
import { books as initialBooks } from "../data/books";

export default function useBookManager() {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem("books");
    return stored ? JSON.parse(stored) : initialBooks;
  });

  const [borrowed, setBorrowed] = useState(() => {
    const stored = localStorage.getItem("borrowed");
    return stored ? JSON.parse(stored) : [];
  });

  // Simpan ke localStorage setiap kali data berubah
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("borrowed", JSON.stringify(borrowed));
  }, [borrowed]);

  // Pinjam buku
  const borrowBook = useCallback((book) => {
    if (!book.available) return;

    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...b, available: false } : b
    );

    setBooks(updatedBooks);
    setBorrowed((prev) => [...prev, { ...book, available: false }]);
  }, [books]);

  // Kembalikan buku
  const returnBook = useCallback((id) => {
    const updatedBooks = books.map((b) =>
      b.id === id ? { ...b, available: true } : b
    );

    const updatedBorrowed = borrowed.filter((b) => b.id !== id);

    setBooks(updatedBooks);
    setBorrowed(updatedBorrowed);
  }, [books, borrowed]);

  // Tambah buku
  const addBook = (newBook) => {
    setBooks([
      ...books,
      { ...newBook, id: Date.now(), available: true }
    ]);
  };

  // Hapus buku
  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
    setBorrowed(borrowed.filter((b) => b.id !== id));
  };

  // Buku yang tersedia
  const availableBooks = useMemo(() => {
    return books.filter((b) => b.available);
  }, [books]);

  return {
    books,
    borrowed,
    availableBooks,
    borrowBook,
    returnBook,
    addBook,
    deleteBook,
  };
}
