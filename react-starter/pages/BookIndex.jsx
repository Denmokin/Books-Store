
import { bookService } from "../services/book.service.js"

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

    return <section className="books">
        <h2>David Best Books</h2>
        <ul className='test'>
            {books.map(book => (
                <li key={book.id}>
                    <div>
                        <h3>{book.title}</h3>
                        <h3>{book.listPrice.amount}</h3>
                    </div>
                </li>
            ))}
        </ul>
    </section>
}

