<<<<<<< HEAD
const { Link, useNavigate } = ReactRouterDOM
import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {
    const navigate = useNavigate()
=======
const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {
>>>>>>> 4fdde8a2db3c932f0c965a3392f5c3dbfa2140d4
    return <ul className='book-list__items'>
        {books.map(book => (
            <li className='book-list__item' key={book.id}>
                <BookPreview book={book} />
                <div className='book-list__actions'>
                    <Link to={`/book/${book.id}`}><button className='btn'>Details</button></Link>
<<<<<<< HEAD

                    <button onClick={() => navigate(`/book/edit/${book.id}`, {
                        state: {
                            page: 'book'
                        }
                    })} className='btn'>Edit</button>
=======
>>>>>>> 4fdde8a2db3c932f0c965a3392f5c3dbfa2140d4
                </div>
            </li>
        ))}
    </ul>


}

