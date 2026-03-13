const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/Book/BookList.jsx"
import { BookFilter } from "../cmps/Book/BookFilter.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { FloatAddButton } from "../cmps/FloatAddButton.jsx"
import { eventBus, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"


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

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                loadBooks()
                showSuccessMsg(`Book ${bookId} removed`)
            })
            .catch(() => {
                showErrorMsg(`Error Book ${bookId} Not found`)
            })

    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="A loader." />
    </div>

    return <section className="book-list">
        <h1 className='book-list__header'>The New York Times: Best Sellers</h1>
        <FloatAddButton />
        {!selectedBook && <React.Fragment>
            <BookFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                clearFilters={bookService.getDefaultFilter()}
            />
            <BookList
                setSelectedBook={setSelectedBook}
                onRemoveBook={onRemoveBook}
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

