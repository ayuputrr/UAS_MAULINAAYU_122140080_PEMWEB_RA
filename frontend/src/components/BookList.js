// src/components/BookList.js
export default function BookList({ books, onBorrow }) {
  return (
    <div className="book-list-container">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <div>
            <h4 className="book-title">{book.title}</h4>
            <p className="book-author">oleh {book.author}</p>
            <p className="book-status">
              Status:{" "}
              <span
                className={`${
                  book.available
                    ? "book-status-available"
                    : "book-status-unavailable"
                }`}
              >
                {book.available ? "Tersedia" : "Dipinjam"}
              </span>
            </p>
          </div>
          {book.available && onBorrow && (
            <button
              onClick={() => onBorrow(book.id)}
              className="book-button"
            >
              Pinjam
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
