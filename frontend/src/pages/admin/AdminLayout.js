import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const isLoggedIn = Boolean(localStorage.getItem("token")); // cek token di localStorage

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <header>Admin Navbar</header>
      <main>
        <Outlet /> {/* render halaman anak */}
      </main>
    </div>
  );
}
