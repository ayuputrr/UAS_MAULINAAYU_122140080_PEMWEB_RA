import useBookManager from "../../hooks/useBookManager";

export default function UserStatus() {
  const { borrowed, handleReturn } = useBookManager();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-red-700 mb-4">
        📚 Buku yang Dipinjam
      </h2>
      {borrowed.length === 0 ? (
        <p className="text-gray-500">Belum ada buku yang dipinjam.</p>
      ) : (
        <ul className="space-y-2">
          {borrowed.map((book) => (
            <li
              key={book.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{book.title}</p>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
              <button
                onClick={() => handleReturn(book.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Kembalikan
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
