import { utilService } from "../../services/util.service.js"

export function BookReview({ review }) {

    return <div>
        <h3>{utilService.toCap(review.name)}</h3>
        <p>{review.comment}</p>
        <p>{review.rating}</p>
    </div>


}
