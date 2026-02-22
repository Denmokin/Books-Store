import { bookService } from "../services/book.service.js"
import { BookPreview } from "./BookPreview.jsx"

const { useState, useEffect } = React

export function BookList({ books, setSelectedBook }) {

    function openBookDetails(bookId) {
        bookService.get(bookId).then(setSelectedBook)
    }

    // useEffect(() => {

    // }, [])

    return <ul className='book-list__items'>
        {books.map(book => (
            <li className='book-list__item' key={book.id}>
                <BookPreview book={book} />
                <div className='book-list__actions'>
                    <button onClick={() => openBookDetails(book.id)}>Details</button>
                </div>
            </li>
        ))}
    </ul>


}

