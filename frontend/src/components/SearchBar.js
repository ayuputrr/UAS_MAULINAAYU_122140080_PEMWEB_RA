// src/components/SearchBar.js
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Cari judul, penulis, ISBN, lainnya"
        className="search-bar-input"
        value={value}
        onChange={onChange}
      />
      <FaSearch className="search-bar-icon" />
    </div>
  );
}
