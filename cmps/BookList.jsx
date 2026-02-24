const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {
    return <ul className='book-list__items'>
        {books.map(book => (
            <li className='book-list__item' key={book.id}>
                <BookPreview book={book} />
                <div className='book-list__actions'>
                    <Link to={`/book/${book.id}`}><button className='btn'>Details</button></Link>
                </div>
            </li>
        ))}
    </ul>


}

