import { utilService } from "../../services/util.service.js"
const { useState, useEffect } = React

export function BookReviewModalContent({ book }) {

    const [reviews, setReviews] = useState(book.reviews)

    const { comment, id, name, rating } = reviews

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
    
    function submitReview(ev) {
        ev.preventDefault()
        navigate(`/book/{}`)
    }


    return <form className='book-review__form' onSubmit={submitReview} >
        <h2>Add Review</h2>
        <input
            value={name}
            onChange={handleChange}
            type="text"
            name="name"
        />
        <textarea
            value={comment}
            onChange={handleChange}
            type="text"
            name="comment"
        />
        <select
            value={rating}
            onChange={ev => handleChange(ev)}
            name="rating"
            id="rating">
            <option value="" disabled hidden>
                Choose Rating
            </option>
            <option value='1' >{1}</option>
            <option value='2' >{2}</option>
            <option value='3' >{3}</option>
            <option value='4' >{4}</option>
            <option value='5' >{5}</option>
        </select>
        <button>save</button>
    </form>

}


