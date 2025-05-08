import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Cari judul, penulis, ISBN, lainnya"
        className="w-full pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        value={value}
        onChange={onChange}
      />
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
