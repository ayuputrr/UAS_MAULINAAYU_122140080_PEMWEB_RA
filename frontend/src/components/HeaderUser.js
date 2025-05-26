// src/components/HeaderUser.js
export default function HeaderUser({ name }) {
  return (
    <div className="header-user-container">
      <div className="header-user-content">
        <div className="header-user-text">
          <h2 className="header-user-name">Hi!👋</h2>
          <p className="header-user-target">Selamat Datang di Pustaka</p>
        </div>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="header-user-avatar"
        />
      </div>
    </div>
  );
}
