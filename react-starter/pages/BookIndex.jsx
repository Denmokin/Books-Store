
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(setBooks)
    }

    if (!books) return <p>Loading...</p>

    return <section className="book-list">
        <h2 className='book-list__header'>The New York Times: Best Sellers</h2>
        <BookList books={books} />
    </section>
}

