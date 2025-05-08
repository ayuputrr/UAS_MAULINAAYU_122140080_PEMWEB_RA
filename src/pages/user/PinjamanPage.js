import useBookManager from "../../hooks/useBookManager";

export default function PinjamanPage() {
  const { borrowed } = useBookManager();

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">📚 Buku yang Dipinjam</h2>

      {borrowed.length === 0 ? (
        <p className="text-gray-500">Belum ada buku yang dipinjam.</p>
      ) : (
        <ul className="space-y-3">
          {borrowed.map((book) => (
            <li
              key={book.id}
              className="bg-white shadow rounded p-3 flex items-center gap-4"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-16 h-24 object-cover rounded"
              />
              <div>
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
