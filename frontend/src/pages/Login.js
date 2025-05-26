import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../aset/logo.jpg'; // sesuaikan path logo

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
    <>
      <style>{`
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: Arial, sans-serif;
        }
        .background {
          background-image: url('/background.jpg'); /* ganti sesuai file background-mu */
          background-size: cover;
          background-position: center;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .container {
          max-width: 400px;
          width: 100%;
          background-color: rgba(248, 249, 250, 0.9);
          border-radius: 8px;
          padding: 30px 30px 40px 30px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.3);
          text-align: center;
        }
        .logo-container {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto 30px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .logo-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: inherit;
          filter: blur(10px) brightness(0.7);
          z-index: 0;
        }
        .logo-container img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 1;
          border-radius: 50%;
        }
        h2 {
          margin-bottom: 20px;
          color: #333;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .input-group {
          position: relative;
          width: 100%;
        }
        input, select, button[type="submit"] {
          width: 100%;
          height: 44px;
          padding: 10px 14px;
          font-size: 16px;
          border-radius: 6px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        input::placeholder {
          color: #999;
        }
        input:focus, select:focus {
          outline: none;
          border-color: #4a90e2;
          box-shadow: 0 0 5px rgba(74,144,226,0.5);
        }
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          user-select: none;
          width: 20px;
          height: 20px;
        }
        button[type="submit"] {
          background-color: #4a90e2;
          color: white;
          border: none;
          font-weight: bold;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }
        button[type="submit"]:hover:not(:disabled) {
          background-color: #3b78d8;
        }
        button[type="submit"]:disabled {
          background-color: #a0c4f7;
          cursor: not-allowed;
        }
        .error {
          color: #e63946;
          font-weight: 600;
          text-align: center;
          margin-top: -8px;
        }
        .toggle-button {
          margin-top: 20px;
          background-color: #6c757d;
          border: none;
          color: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          width: 100%;
          text-align: center;
          padding: 10px 0;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }
        .toggle-button:hover:not(:disabled) {
          background-color: #5a6268;
          color: white;
          text-decoration: none;
        }
      `}</style>

      <div className="background">
        <div className="container">
          <div className="logo-container">
            <img src={logo} alt="blur" />
            <img src={logo} alt="Logo Universitas" />
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
    </>
  );
}
