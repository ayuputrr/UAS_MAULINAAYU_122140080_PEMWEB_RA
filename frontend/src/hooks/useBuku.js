import { useState, useEffect } from "react";
import axios from "axios";

export function useBuku() {
  const [bukus, setBukus] = useState([]);

 
  const fetchBukus = async () => {
    try {
      const res = await axios.get("/buku"); 
      setBukus(res.data.buku);
    } catch (err) {
      console.error("Gagal fetch buku:", err);
    }
  };

  const addBuku = async (data) => {
    try {
      const res = await axios.post("/buku/create", data);
      if (res.data.status === "success") {
        fetchBukus(); 
      } else {
        console.error("Gagal tambah buku:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal tambah buku:", err);
    }
  };

 
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


  useEffect(() => {
    fetchBukus();
  }, []);

  return { bukus, addBuku, updateBuku, deleteBuku };
}
