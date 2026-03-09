
const { useState, useEffect } = React
const { Link, useParams, useNavigate, useLocation } = ReactRouterDOM

import { BookReview } from "./BookReview.jsx"
import { utilService } from "../../services/util.service.js"

export function BookReviewList({ book, openModal }) {

    // const [bookReviews, setBookReviews] = useState(book.reviews)

    return <div className='book-reviews'>
        <button onClick={() => openModal()}> Add Review </button>
        <ul>
            {book.reviews.map(review =>
                <li key={review.id}>
                    <BookReview review={review} />
                </li>
            )}
        </ul>
    </div >
}
