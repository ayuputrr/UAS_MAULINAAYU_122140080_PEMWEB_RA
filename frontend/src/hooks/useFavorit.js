import { useState, useEffect } from "react";
import axios from "axios";

export function useFavorit() {
  const [favorits, setFavorits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorits = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/favorit");
      setFavorits(res.data.favorit || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addFavorit = async (bukuId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("/favorit/create", { buku_id: bukuId });
      await fetchFavorits();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFavorit = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`/favorit/update/${id}`, data);
      setFavorits(prev =>
        prev.map(item => (item.id === id ? res.data.favorit : item))
      );
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorit = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/favorit/delete/${id}`);
      await fetchFavorits();
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorits();
  }, []);

  return {
    favorits,
    loading,
    error,
    addFavorit,
    updateFavorit,
    deleteFavorit,
  };
}
