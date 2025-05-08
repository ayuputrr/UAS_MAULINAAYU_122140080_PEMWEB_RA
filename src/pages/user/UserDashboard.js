// src/pages/user/UserDashboard.js
import { useState } from "react";
import HeaderUser from "../../components/HeaderUser";
import SearchBar from "../../components/SearchBar";
import BukuPopuler from "../../components/BukuPopuler";
import BottomNav from "../../components/BottomNav";
import KategoriBuku from "../../components/KategoriBuku";
import { books } from "../../data/books";

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const populer = [
    { id: 1, title: "Sapiens", cover: "https://picsum.photos/100/150?1" },
    { id: 2, title: "Bumi", cover: "https://picsum.photos/100/150?2" },
    { id: 3, title: "Laskar Pelangi", cover: "https://picsum.photos/100/150?3" },
    { id: 4, title: "Atomic Habits", cover: "https://picsum.photos/100/150?4" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <div className="bg-blue-700 text-white p-4 rounded-b-3xl shadow">
        <HeaderUser name="Jokol" />
        <div className="mt-4">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="p-4 space-y-6">
        <BukuPopuler books={populer} />
        <KategoriBuku books={books} />
      </div>

      <BottomNav />
    </div>
  );
}
