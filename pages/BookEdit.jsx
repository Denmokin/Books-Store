const { useState, useEffect } = React
const { Link, useParams, useNavigate, useLocation } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { eventBus, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"


export function BookEdit() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (params.id) {
            bookService.get(params.id)
                .then(setBook)
        }
    }, [])

    function toPage({ state: { page } }) {
        if (page === 'book') return `/book`
        else if (page === 'bookDetails') return `/book/${book.id}`
        else return
    }

    function handleChange({ target }) {
        const { name, value, type } = target
        const propValue = type === 'text' ? value : +value

        if (name.includes('.')) {
            const [parent, child] = name.split('.')
            setBook(prev => ({
                ...prev, [parent]: {
                    ...prev[parent], [child]: propValue
                }
            }))
        } else {
            setBook(prev => ({ ...prev, [name]: propValue }))
        }
    }

    function submitEdit(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                navigate(pageNav)
                showSuccessMsg(`Book ${book.id} Saved`)
            })
    }

    if (!book) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="A loader." />
    </div>

    const pageNav = toPage(location)

    return <form className='book-edit' onSubmit={submitEdit} >
        <h2>{book.title}</h2>


        <label htmlFor="listPrice.amount">Book Price:</label>
        <input
            value={book.listPrice.amount || ''}
            onChange={handleChange}
            type="number"
            name="listPrice.amount"
        />

        <div className='book-edit__buttons' >
            <button className='btn'> Save</button>
            <Link to={pageNav}><button type='button' className='btn'>Back</button></Link>
        </div>
    </form>
}

