import React from "react";
import HeaderUser from "../../components/HeaderUser";
import { usePeminjaman } from "../../hooks/usePeminjaman";
import "./PinjamanPage.css";

export default function PinjamanPage() {
  const { peminjamans, loading, error, updatePeminjaman } = usePeminjaman();

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
      <div className="pinjaman-container">
        <h2 className="pinjaman-title">Buku yang Dipinjam</h2>
        {groupedArray.length === 0 ? (
          <p className="no-books-text">Belum ada buku yang dipinjam.</p>
        ) : (
          <div className="pinjaman-list">
            {groupedArray.map((item) => (
              <div key={`${item.buku_id}-${item.returned_status}`} className="pinjaman-item">
                <img
                  src={item.cover}
                  alt={item.nama_buku}
                  className="pinjaman-image"
                />
                <div className="pinjaman-info">
                  <h3 className="pinjaman-nama">{item.nama_buku}</h3>
                  <p className="pinjaman-detail">
                    Jumlah: {item.jumlah}
                    <br />
                    Status:{" "}
                    <strong>
                      {item.returned_status ? "Sudah Dikembalikan" : "Sedang Dipinjam"}
                    </strong>
                  </p>
                  <div>
                    <button
                      onClick={() =>
                        toggleReturnedStatus(item.peminjaman_ids, item.returned_status)
                      }
                      className={`pinjaman-button ${
                        item.returned_status ? "returned" : ""
                      }`}
                    >
                      {item.returned_status
                        ? "Batalkan Pengembalian"
                        : "Tandai Sudah Dikembalikan"}
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
