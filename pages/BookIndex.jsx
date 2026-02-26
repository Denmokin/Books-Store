
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        if (selectedBook === null) loadBooks()
    }, [selectedBook])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="A loader." />
    </div>

    return <section className="book-list">
        <h1 className='book-list__header'>The New York Times: Best Sellers</h1>
        {!selectedBook && <React.Fragment>
            <BookFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
            />
            <BookList
                setSelectedBook={setSelectedBook}
                books={books}
            />
        </React.Fragment>
        }

        {selectedBook &&
            <BookDetails
                book={selectedBook}
                setSelectedBook={setSelectedBook}
            />}
    </section>
}

