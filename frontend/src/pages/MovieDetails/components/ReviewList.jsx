import React from 'react'

import { dateFormatter } from '../../../util/dateFormatter';

export default function ReviewList({ movieId, reviews, setReviews }) {

    React.useEffect(() => {
        async function fetchReviews() {
            const res = await fetch(`/api/reviews/${movieId}`);
            const data = await res.json();
            setReviews(data);
        }
        fetchReviews()
    }, [])

    return (
        <div>{reviews.length > 0 && <p className="text-2xl font-semibold mb-2">Reviews</p>}
            {reviews.map((review) => (
                <div
                    key={review._id}
                    className="rounded-lg shadow bg-white flex flex-col mb-4 p-4"
                ><div className="flex items-center">
                        <p className="font-semibold text-xl mr-2">{review.userName}</p>
                        <p>{review.rating}/10</p></div>
                    <p className="text-xs">{dateFormatter(review.createdAt)}</p>

                    {review.description && <p className="mt-2">{review.description}</p>}

                </div>
            ))}</div>
    )
}
