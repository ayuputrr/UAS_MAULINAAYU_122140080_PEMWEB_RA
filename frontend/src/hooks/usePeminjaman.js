import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePeminjaman() {
  const [peminjamans, setPeminjamans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPeminjamans = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/peminjaman');
      setPeminjamans(res.data.peminjaman);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Tambah parameter jumlah di createPeminjaman
  const createPeminjaman = async (bukuId, jumlah) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/peminjaman/create', { buku_id: bukuId, jumlah });
      await fetchPeminjamans();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePeminjaman = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/peminjaman/delete/${id}`);
      await fetchPeminjamans();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePeminjaman = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`/api/peminjaman/update/${id}`, data);
      setPeminjamans(prev => prev.map(item => item.id === id ? res.data.peminjaman : item));
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeminjamans();
  }, []);

  return {
    peminjamans,
    loading,
    error,
    createPeminjaman,
    deletePeminjaman,
    updatePeminjaman,
  };
}
