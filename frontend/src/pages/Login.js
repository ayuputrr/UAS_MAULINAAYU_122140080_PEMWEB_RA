import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../aset/logo.jpg';
import './LoginRegister.css';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
    setRole('user');
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isLogin ? '/api/login' : '/api/register';
      const body = isLogin ? { email, password } : { email, password, role };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'Terjadi kesalahan');
        setLoading(false);
        return;
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);

        if (data.user.role.toLowerCase() === 'admin') {
          navigate('/admin');
        } else if (data.user.role.toLowerCase() === 'user') {
          navigate('/user');
        } else {
          setError('Role tidak dikenali.');
        }
      } else {
        alert('Registrasi berhasil! Silakan login.');
        toggleMode();
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="background">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="blur" />
          <img src={logo} alt="Logo sekolah" />
        </div>

        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <div className="input-group">
            <input
              ref={passwordInputRef}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <img
              src={
                showPassword
                  ? 'https://cdn-icons-png.flaticon.com/512/159/159604.png'
                  : 'https://cdn-icons-png.flaticon.com/512/159/159605.png'
              }
              alt={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              className="password-toggle"
              onClick={handleTogglePassword}
              title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              draggable={false}
            />
          </div>

          {!isLogin && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Tunggu...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <button
          className="toggle-button"
          onClick={toggleMode}
          disabled={loading}
        >
          {isLogin ? 'Buat akun baru' : 'Kembali ke Login'}
        </button>
      </div>
    </div>
  );
}
