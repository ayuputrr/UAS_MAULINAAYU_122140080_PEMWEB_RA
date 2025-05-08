import useBookManager from "../hooks/useBookManager";

export default function BukuPopuler({ books }) {
  const { borrowBook } = useBookManager();

  return (
    <div>
      <div className="flex justify-between items-center mb-2 px-1">
        <h3 className="text-lg font-semibold text-gray-800">Populer</h3>
        <button className="text-blue-600 text-sm hover:underline">Lihat semua</button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {books.map((book) => (
          <div
            key={book.id}
            className="min-w-[120px] bg-white shadow rounded-lg flex flex-col justify-between h-64"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-36 object-cover rounded-t"
            />
            <div className="flex-1 px-2 py-2 flex flex-col justify-between">
              <p className="text-sm font-medium text-center truncate">{book.title}</p>
              <button
                onClick={() => borrowBook(book)}
                className={`mt-2 text-white text-sm px-2 py-1 rounded ${
                  book.available
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!book.available}
              >
                {book.available ? "Pinjam" : "Tidak Tersedia"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
