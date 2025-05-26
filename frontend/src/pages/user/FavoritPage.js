import React from "react";
import HeaderUser from "../../components/HeaderUser";
import { useFavorit } from "../../hooks/useFavorit";
import "../../index.css";  // Import global CSS

export default function FavoritPage() {
  const {
    favorits,
    loading,
    error,
    deleteFavorit,
  } = useFavorit();

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
        <p style={{ textAlign: "center" }}>Belum ada buku favorit.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, maxWidth: 600, margin: "20px auto" }}>
          {favorits.map((fav) => (
            <li 
              key={fav.id} 
              style={{ 
                marginBottom: "1.5rem", 
                padding: "1rem", 
                border: "1px solid #ddd", 
                borderRadius: 8, 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <img 
                src={fav.cover} 
                alt={fav.nama_buku} 
                style={{ width: 100, height: 140, objectFit: "cover", borderRadius: 8 }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong style={{ fontSize: 18 }}>{fav.nama_buku}</strong>
                <p style={{ margin: "0.5rem 0" }}>oleh {fav.nama_penulis}</p>
                <button 
                  onClick={() => handleDelete(fav.id)} 
                  style={{ 
                    padding: "0.5rem 1rem", 
                    backgroundColor: "#e53e3e", 
                    color: "white", 
                    border: "none", 
                    borderRadius: 4, 
                    cursor: "pointer" 
                  }}
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
