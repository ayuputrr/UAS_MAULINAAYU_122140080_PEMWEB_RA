import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null); // ref untuk input password
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

  // Fungsi toggle password yang jaga fokus input
  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
    // setelah state toggle, fokus input password kembali
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <style>{`
        .container {
          max-width: 400px;
          margin: 40px auto;
          padding: 20px 30px;
          border-radius: 8px;
          background-color: #f8f9fa;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 24px;
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
          font-family: inherit;
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
          width: 24px;
          height: 24px;
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

      <div className="container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <div className="input-group">
            <input
              ref={passwordInputRef} // pasang ref di sini
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <img
              src={showPassword
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
              onChange={e => setRole(e.target.value)}
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
    </>
  );
}
