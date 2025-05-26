import React from "react";

export default function BukuPopuler({ books, onAddFavorit, onPinjam }) {
  return (
    <>
      <style>{`
        .buku-populer-container {
          padding: 8px;
        }
        .buku-list-container {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 8px;
        }
        /* Custom scrollbar untuk WebKit */
        .buku-list-container::-webkit-scrollbar {
          height: 8px;
        }
        .buku-list-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .buku-list-container::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .buku-list-container::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .buku-item {
          flex: 0 0 auto; /* supaya item tidak mengecil */
          width: 220px;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          background: white;
          box-sizing: border-box;
        }
        .buku-image {
          max-height: 200px;
          width: auto;
          object-fit: contain;
          border-radius: 4px;
          margin-bottom: 8px;
          display: block;
        }
        .buku-info {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 8px;
        }
        .buku-title {
          font-weight: bold;
          font-size: 14px;
          height: 40px;
          overflow: hidden;
          margin: 0;
        }
        .buku-buttons {
          display: flex;
          gap: 12px;
          width: 100%;
          justify-content: center;
          box-sizing: border-box;
          margin-top: -37px;
        }
        .buku-button {
          padding: 8px 12px;
          background-color: #2978f0;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 15px;
          flex: 1;
          max-width: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: border-box;
          transition: background-color 0.3s ease;
        }
        .buku-button-favorit {
          background-color: #f0a500;
        }
        .buku-button:hover {
          opacity: 0.9;
        }
      `}</style>

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
    </>
  );
}
