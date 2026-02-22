import { utilService } from "../services/util.service.js"

const { useState, useEffect } = React

export function BookDetails({ book, setSelectedBook }) {




    return <article className='book-selected'>
        <img src={book.thumbnail} />
        <div className="book-details">
            <div>
                <h2 className='book-details__title'>{utilService.toCap(book.title)}</h2>
                <h3 className='book-details__subtitle'>{utilService.toCap(book.title)}</h3>
            </div>
            <p className='book-details__price'>Price: {currencyChange(book.listPrice)}</p>
            <p className='book-details__author'>By {utilService.toCap(book.authors[0])}</p>
            <p className='book-details__description'>By {book.description}</p>
            <p>{pageCount(book.pageCount)}</p>
            <button onClick={() => setSelectedBook(null)}>Back</button>

        </div>
        {book.listPrice.isOnSale && < div className='on-sale'>ON SALE</div>}
    </article >


}

function _pageCount(pages) {
    if (pages >= 500) return 'Serious Reading'
    if (pages >= 200) return 'Decent Reading'
    if (pages <= 100) return 'Light Reading'
}

function _currencyChange({ amount, currencyCode }) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode })
        .format(amount)
}
