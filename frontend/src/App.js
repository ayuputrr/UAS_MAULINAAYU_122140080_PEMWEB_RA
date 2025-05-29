import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LaporanPage from "./pages/admin/LaporanPage";
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import PinjamanPage from "./pages/user/PinjamanPage";
import FavoritPage from "./pages/user/FavoritPage";
import "./index.css"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="laporan" element={<LaporanPage />} />
      </Route>

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="pinjaman" element={<PinjamanPage />} />
        <Route path="favorit" element={<FavoritPage />} />
      </Route>
    </Routes>
  );
}
