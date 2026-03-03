import { utilService } from "../services/util.service.js"

export function BookPreview({ book }) {

    return <article className='book-list__item'>
        <img src={`${book.thumbnail}`} />
        <h3 className='book-list__item-name'>{utilService.toCap(book.title)}</h3>
        <div className="book-list__item-details">
            <p className='book-list__item-price'>Price: {_currencyChange(book.listPrice)}</p>
            <p className='book-list__item-author'>By <span className='book-author'>{book.author}</span></p>
        </div>
        <div className='book-list__item-btn-fav heart-icon'></div>
    </article>
}


function _currencyChange({ amount, currencyCode }) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode })
        .format(amount)
}