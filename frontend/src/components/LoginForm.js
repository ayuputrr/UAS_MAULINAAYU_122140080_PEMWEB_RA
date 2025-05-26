import React from "react";

export default function LoginForm({
  isLogin,
  username,
  setUsername,
  password,
  setPassword,
  role,
  setRole,
  onSubmit,
  error,
  loading,
  toggleMode,
}) {
  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        {!isLogin && (
          <select value={role} onChange={e => setRole(e.target.value)} disabled={loading}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Tunggu..." : isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button onClick={toggleMode} disabled={loading}>
        {isLogin ? "Buat akun baru" : "Kembali ke Login"}
      </button>
    </div>
  );
}
