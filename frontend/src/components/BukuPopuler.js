import React from "react";
import "./BukuPopuler.css";  

export default function BukuPopuler({ books, onAddFavorit, onPinjam }) {
  return (
    <div className="buku-populer-container">
      <div className="buku-list-container">
        {books.map((book) => (
          <div key={book.id} className="buku-item">
            <img src={book.cover} alt={book.nama_buku} className="buku-image" />
            <div className="buku-info">
              <p className="buku-title">{book.nama_buku}</p>
            </div>
            <div className="buku-buttons">
              <button
                onClick={() => onPinjam(book)}
                className="buku-button"
              >
                Pinjam
              </button>
              <button
                onClick={() => onAddFavorit(book)}
                className="buku-button buku-button-favorit"
              >
                Favorit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
