// src/pages/UserLayout.jsx
import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

export default function UserLayout() {
  return (
    <div className="user-layout-container">
      <Outlet />
      <div className="bottom-nav-container">
        <BottomNav />
      </div>
    </div>
  );
}
