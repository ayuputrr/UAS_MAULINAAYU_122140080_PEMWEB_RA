import React from "react";
import HeaderUser from "../../components/HeaderUser";
import { usePeminjaman } from "../../hooks/usePeminjaman";
import "../../index.css";

export default function PinjamanPage() {
  const {
    peminjamans,
    loading,
    error,
    updatePeminjaman,
  } = usePeminjaman();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const grouped = peminjamans.reduce((acc, item) => {
    const key = `${item.buku_id}-${item.returned ? "returned" : "notreturned"}`;
    if (!acc[key]) {
      acc[key] = {
        buku_id: item.buku_id,
        nama_buku: item.nama_buku,
        cover: item.cover,
        jumlah: 0,
        peminjaman_ids: [],
        returned_status: item.returned,
      };
    }
    acc[key].jumlah += item.jumlah || 1;
    acc[key].peminjaman_ids.push(item.id);
    return acc;
  }, {});

  const groupedArray = Object.values(grouped);

  const toggleReturnedStatus = async (peminjamanIds, currentStatus) => {
    const newStatus = !currentStatus;
    if (
      !window.confirm(
        `Tandai semua buku ini sebagai ${
          newStatus ? "Sudah Dikembalikan" : "Belum Dikembalikan"
        }?`
      )
    )
      return;

    try {
      for (const id of peminjamanIds) {
        await updatePeminjaman(id, { returned: newStatus });
      }
      alert(
        `Status peminjaman berhasil diubah menjadi "${
          newStatus ? "Sudah Dikembalikan" : "Belum Dikembalikan"
        }"`
      );
    } catch {
      alert("Gagal mengubah status pengembalian");
    }
  };

  return (
    <div>
      <HeaderUser />
      <div className="pinjaman-container" style={{ maxWidth: 600, margin: "auto" }}>
        <h2
          className="pinjaman-title"
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "#2b6cb0",
            fontWeight: "700",
            fontSize: "1.5rem",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Buku yang Dipinjam
        </h2>
        {groupedArray.length === 0 ? (
          <p className="no-books-text" style={{ textAlign: "center" }}>
            Belum ada buku yang dipinjam.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {groupedArray.map((item) => (
              <div
                key={`${item.buku_id}-${item.returned_status}`}
                style={{
                  display: "flex",
                  gap: 20,
                  padding: 16,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  borderRadius: 8,
                  backgroundColor: "white",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.cover}
                  alt={item.nama_buku}
                  style={{ width: 100, height: 130, objectFit: "cover", borderRadius: 4 }}
                />
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "bold" }}>
                    {item.nama_buku}
                  </h3>
                  <p style={{ margin: "8px 0", color: "#555" }}>
                    Jumlah: {item.jumlah}
                    <br />
                    Status:{" "}
                    <strong>
                      {item.returned_status ? "Sudah Dikembalikan" : "Sedang Dipinjam"}
                    </strong>
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() =>
                        toggleReturnedStatus(item.peminjaman_ids, item.returned_status)
                      }
                      style={{
                        backgroundColor: item.returned_status ? "#38a169" : "#3182ce",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 12px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      {item.returned_status ? "Batalkan Pengembalian" : "Tandai Sudah Dikembalikan"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
