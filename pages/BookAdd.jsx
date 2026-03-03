const { useState, useEffect } = React
const { Link, useParams, useNavigate, useLocation } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { eventBus, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"


export function BookAdd() {

    const [book, setBook] = useState(bookService.getEmptyBook)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            bookService.get(params.id)
                .then(setBook)
        }
    }, [])

    function handleChange({ target }) {
        const { name: prop, type } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        if (prop.includes('.')) {
            const [parent, child] = prop.split('.')
            setBook(prev => ({
                ...prev, [parent]: {
                    ...prev[parent], [child]: value
                }
            }))

        } else {
            setBook(prev => ({ ...prev, [prop]: value }))
        }
    }

    function submitEdit(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                navigate(`/book`)
                // showSuccessMsg(`Book ${book.id} Saved`)
            })
    }

    if (!book) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="A loader." />
    </div>

    const {
        title,
        author,
        description,
        pageCount,
        listPrice,
        thumbnail,
    } = book

    return <form className='book-edit' onSubmit={submitEdit} >
        <h2>Book Edit</h2>

        <label htmlFor="title">Book title:</label>
        <input
            value={title}
            onChange={handleChange}
            type="text"
            name="title"
        />
        <label htmlFor="listPrice.amount">Book Price:</label>
        <input
            value={listPrice.amount || ''}
            onChange={handleChange}
            type="number"
            name="listPrice.amount"
        />
        <label htmlFor="listPrice.isOnSale">On sale?</label>
        <input
            checked={listPrice.isOnSale}
            onChange={handleChange}
            type="checkbox"
            name="listPrice.isOnSale"
        />
        <label htmlFor="pageCount">Page Count</label>
        <input
            value={pageCount}
            onChange={handleChange}
            type="number"
            name="pageCount"
        />
        <label htmlFor="author">Author</label>
        <input
            value={author}
            onChange={handleChange}
            type="text"
            name="author"
        />
        <label htmlFor="thumbnail">Thumbnail</label>
        <input
            value={thumbnail}
            onChange={handleChange}
            type="text"
            name="thumbnail"
        />
        <label htmlFor="description">Description</label>
        <textarea
            value={description}
            onChange={handleChange}
            type="text"
            name="description"
        />

        <div className='book-edit__buttons' >
            <button className='btn'> Save</button>
            <Link to={`/book`}><button type='button' className='btn'>Back</button></Link>
        </div>
    </form>


}

