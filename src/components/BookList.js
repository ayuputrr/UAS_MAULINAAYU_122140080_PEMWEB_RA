export default function BookList({ books, onBorrow }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white shadow-md p-4 rounded border flex flex-col justify-between"
          >
            <div>
              <h4 className="text-lg font-bold text-gray-800">{book.title}</h4>
              <p className="text-gray-600">oleh {book.author}</p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    book.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.available ? "Tersedia" : "Dipinjam"}
                </span>
              </p>
            </div>
            {book.available && onBorrow && (
              <button
                onClick={() => onBorrow(book.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Pinjam
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
  