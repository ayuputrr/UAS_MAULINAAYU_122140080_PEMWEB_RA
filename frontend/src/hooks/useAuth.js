import { useState } from 'react';
import axios from 'axios';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // State untuk user detail yang di-fetch by id
  const [fetchedUser, setFetchedUser] = useState(null);
  const [fetchedUserLoading, setFetchedUserLoading] = useState(false);
  const [fetchedUserError, setFetchedUserError] = useState(null);

  async function register({ email, password, role }) {
    setError(null);
    setLoading(true);
    try {
      await axios.post('/api/register', { email, password, role });
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  }

  async function login({ email, password }) {
    setError(null);
    setLoading(true);
    try {
      const { data } = await axios.post('/api/login', { email, password });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('role', data.user.role);
      return data.user;
    } catch (err) {
      setError(err.response?.data?.error || 'Login gagal');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

  // Fetch user detail berdasarkan ID
  async function fetchUserById(id) {
    setFetchedUserLoading(true);
    setFetchedUserError(null);
    try {
      const { data } = await axios.get(`/api/users/${id}`);
      setFetchedUser(data.user || null);
      return data.user;
    } catch (err) {
      setFetchedUserError(err.response?.data?.error || 'Gagal mengambil data user');
      setFetchedUser(null);
      return null;
    } finally {
      setFetchedUserLoading(false);
    }
  }

  return {
    user,
    error,
    loading,
    register,
    login,
    logout,
    fetchedUser,
    fetchedUserLoading,
    fetchedUserError,
    fetchUserById,
  };
}
