import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {

    return <ul className='book-list__items'>
        {books.map(book => (
            <li className='book-list__item' key={book.id}>
                <BookPreview book={book} />
                <div className='book-list__actions'>
                    <button>Details</button>
                    <button>Edit</button>
                    <button>X</button>
                </div>
            </li>
        ))}
    </ul>


}

