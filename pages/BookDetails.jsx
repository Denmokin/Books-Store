const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { utilService } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"
import { BookReviewList } from "../cmps/BookReviews/BookReviewList.jsx"
import { OpenModal } from "../cmps/OpenModal.jsx"
import { BookReviewModalContent } from "../cmps/BookReviews/BookReviewModalContent.jsx"


export function BookDetails() {
    const [isLongDesc, setIsLongDesc] = useState(false)
    const [book, setBook] = useState(null)
    const [noBook, setNoBook] = useState(false)
    const [isShown, setIsShown] = useState(false)



    const params = useParams()
    const navigate = useNavigate()

    function onOpenModal() {
        console.log('Modal has opened...')
        setIsShown(true)
    }

    function onCloseModal() {
        console.log('Modal has closed...')
        setIsShown(false)
    }

    useEffect(() => {
        bookService.get(params.id)
            .then(setBook)
            .catch(() => setNoBook(true))
    }, [params.id])


    if (noBook) return <div className="error-no-book">
        <p>Book is not found</p>
        <Link to='/book'>
            <button className='btn'>Back</button>
        </Link>
    </div>

    if (!book) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="A loader." />
    </div>

    function onToggleReadMore() {
        setIsLongDesc(prev => !prev)
    }

    const description = isLongDesc ? book.description : book.description.slice(0, 200) + '....'
    const linkText = isLongDesc ? 'Read Less' : 'Read More'

    return <article className='book-selected'>

        <OpenModal
            isShown={isShown}
            onClose={onCloseModal}>
            {<BookReviewModalContent book={book} />}
        </OpenModal>

        <img className='book-selected__thumbnail' src={book.thumbnail} />
        <div className="book-details">
            <div className='book-details__tags'>
                <div className='book-details__tag'>{_publishDate(book.publishedDate)}</div>
                <div className='book-details__tag'>{_pageCount(book.pageCount)}</div>
            </div>

            <div className='book-details__headings'>
                <h2 className='book-details__title'>{utilService.toCap(book.title)}</h2>
            </div>

            <p className={'book-details__author'}>
                By <span className='book-author'>{book.author}</span>
            </p>


            <p className='book-details__description'>
                {description}
                <span
                    onClick={() => onToggleReadMore()}
                    className='book-details__read-more'>
                    {linkText}
                </span>
            </p>

            <p className={`book-details__price book-details__price--${_priceClass(book.listPrice.amount)}`}>
                Price: {_currencyChange(book.listPrice)}
            </p>

            <div className='book-details__buttons' >
                <Link to='/book'>
                    <button className='btn'>Back</button>
                </Link>
                <button onClick={() => navigate(`/book/edit/${book.id}`, {
                    state: {
                        page: 'bookDetails'
                    }
                })} className='btn'>Edit Book</button>

                <div className="prev-next-btns">
                    <Link to={`/book/${book.prevBookId}`}>
                        <button className='btn'>{'<'}</button>
                    </Link>
                    <Link to={`/book/${book.nextBookId}`}>
                        <button className='btn'>{'>'}</button>
                    </Link>
                </div>
            </div>
        </div>
        <BookReviewList book={book} openModal={onOpenModal} />

        {book.listPrice.isOnSale && <div className='book-selected__on-sale-ribbon'>ON SALE</div>}
    </article>
}

function _priceClass(price) {
    if (price < 60) return 'cheap'
    if (price > 150) return 'expensive'

}

function _publishDate(date) {
    const now = Date.now()
    const year = new Date(now).getFullYear()
    if ((year - date) >= 10) return 'Vintage Book'
    else if ((year - date) >= 1) return 'New Book'
}

function _pageCount(pages) {
    if (pages >= 500) return 'Serious Reading'
    else if (pages > 100) return 'Decent Reading'
    else if (pages <= 100) return 'Light Reading'
}

function _currencyChange({ amount, currencyCode }) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode })
        .format(amount)
}
