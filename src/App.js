// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import PinjamanPage from "./pages/user/PinjamanPage";
import KartuPage from "./pages/user/KartuPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/user" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="pinjaman" element={<PinjamanPage />} />
        <Route path="kartu" element={<KartuPage />} />
      </Route>
    </Routes>
  );
}

export default App;
