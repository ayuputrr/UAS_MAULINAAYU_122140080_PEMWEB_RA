import React from "react";
import HeaderUser from "../../components/HeaderUser";
import { useFavorit } from "../../hooks/useFavorit";
import "./FavoritPage.css";  // import CSS eksternal

export default function FavoritPage() {
  const { favorits, loading, error, deleteFavorit } = useFavorit();

  if (loading) return <p>Loading favorit...</p>;
  if (error) return <p>Error: {error.message || error.toString()}</p>;

  const handleDelete = (id) => {
    if (window.confirm("Yakin hapus favorit ini?")) {
      deleteFavorit(id).catch(() => alert("Gagal hapus favorit"));
    }
  };

  return (
    <div>
      <HeaderUser name="User" />
      <h1 style={{ textAlign: "center", marginTop: 20 }}>Buku Favorit Anda</h1>
      {favorits.length === 0 ? (
        <p className="favorit-empty-text">Belum ada buku favorit.</p>
      ) : (
        <ul className="favorit-container">
          {favorits.map((fav) => (
            <li key={fav.id} className="favorit-item">
              <img src={fav.cover} alt={fav.nama_buku} className="favorit-image" />
              <div className="favorit-info">
                <strong className="favorit-title">{fav.nama_buku}</strong>
                <p className="favorit-author">oleh {fav.nama_penulis}</p>
                <button 
                  onClick={() => handleDelete(fav.id)} 
                  className="favorit-delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
