export function BookPreview({ book }) {
    console.log('book: ', book)

    return <article className='book-list__details'>
        <h3 className='book-list__item-name'>{book.title}</h3>
        <p className='book-list__price'>{book.listPrice.amount}</p>
    </article>
}
