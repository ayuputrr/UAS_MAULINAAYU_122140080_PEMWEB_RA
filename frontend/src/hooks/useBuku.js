import { useState, useEffect } from "react";
import axios from "axios";

export function useBuku() {
  const [bukus, setBukus] = useState([]);

  // Ambil data buku dari backend
  const fetchBukus = async () => {
    try {
      const res = await axios.get("/buku"); // relative URL karena pakai proxy
      setBukus(res.data.buku);
    } catch (err) {
      console.error("Gagal fetch buku:", err);
    }
  };

  // Tambah buku baru
  const addBuku = async (data) => {
    try {
      const res = await axios.post("/buku/create", data);
      if (res.data.status === "success") {
        fetchBukus(); // refresh data setelah tambah sukses
      } else {
        console.error("Gagal tambah buku:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal tambah buku:", err);
    }
  };

  // Update buku berdasar ID
  const updateBuku = async (id, data) => {
    try {
      const res = await axios.put(`/buku/update/${id}`, data);
      if (res.data.status === "success") {
        fetchBukus();
      } else {
        console.error("Gagal update buku:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal update buku:", err);
    }
  };

  // Hapus buku berdasar ID
  const deleteBuku = async (id) => {
    try {
      const res = await axios.delete(`/buku/delete/${id}`);
      if (res.data.status === "success") {
        fetchBukus();
      } else {
        console.error("Gagal hapus buku:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal hapus buku:", err);
    }
  };

  // Fetch data buku saat pertama kali mount
  useEffect(() => {
    fetchBukus();
  }, []);

  return { bukus, addBuku, updateBuku, deleteBuku };
}
