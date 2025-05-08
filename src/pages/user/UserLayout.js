// src/pages/user/UserLayout.js
import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow overflow-y-auto pb-24 px-4 pt-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
