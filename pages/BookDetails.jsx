import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React

export function BookDetails({ book, setSelectedBook }) {


    const [isLongDesc, setIsLongDesc] = useState(false)

    function onToggleReadMore() {
        setIsLongDesc(prev => !prev)
    }

    const description = isLongDesc ? book.description : book.description.slice(0, 200) + '....'
    const linkText = isLongDesc ? 'Read Less' : 'Read More'



    return <article className='book-selected'>
        <img className='book-selected__thumbnail' src={book.thumbnail} />

        <div className="book-details">
            <div className='book-details__tags'>
                <div className='book-details__tag'>{_publishDate(book.publishedDate)}</div>
                <div className='book-details__tag'>{_pageCount(book.pageCount)}</div>
            </div>

            <div className='book-details__headings'>
                <h2 className='book-details__title'>{utilService.toCap(book.title)}</h2>
                <h3 className='book-details__subtitle'>{utilService.toCap(book.subtitle)}</h3>
            </div>

            <p className={`book-details__price book-details__price--${_priceClass(book.listPrice.amount)}`}>
                Price: {_currencyChange(book.listPrice)}
            </p>

            <p className='book-details__description'>
                {description}
                <span
                    onClick={() => onToggleReadMore()}
                    className='book-details__read-more'>
                    {linkText}
                </span>
            </p>
            <button className='book-details__btn book-details__btn--back' onClick={() => setSelectedBook(null)}>
                Back
            </button>
        </div>
        {book.listPrice.isOnSale && <div className='book-selected__on-sale-ribbon'>ON SALE</div>}
    </article>
}

function _priceClass(price) {
    if (price < 60) return 'cheap'
    if (price < 150) return 'expensive'

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
