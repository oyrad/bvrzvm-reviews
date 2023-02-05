import React from "react";

export default function EditReviewForm({
    currentReview,
    setIsEditModeOn,
    setCurrentReview,
    reviews,
    setReviews
}) {
    const [rating, setRating] = React.useState(currentReview.rating);
    const [description, setDescription] = React.useState(currentReview.description);

    async function handleSubmit(e) {
        e.preventDefault();
        const updatedReview = {
            ...currentReview,
            rating: Math.round(rating * 10) / 10,
            description: description,
        }
        fetch(`/api/reviews/${currentReview._id}`, {
            method: "PUT",
            body: JSON.stringify(updatedReview),
            headers: {
                "Content-Type": "application/json",
            },
        })
        setIsEditModeOn(false);
        setCurrentReview({
            ...updatedReview,
            updatedAt: new Date().toISOString()
        })
        const allReviews = [...reviews]
        const indexOfReview = allReviews.findIndex(rev => rev._id === currentReview._id)
        allReviews.splice(indexOfReview, 1)
        setReviews([...allReviews, { ...updatedReview, updatedAt: new Date().toISOString() }].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    }

    return (
        <div className="mb-8">
            <p className="text-2xl font-semibold mb-2">Edit review</p>
            <div className="rounded-lg shadow bg-white py-4 px-5">
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1">Rating</label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    step="any"
                                    min="0"
                                    max="10"
                                    name="rating"
                                    className="w-12 form-input mr-2"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                />
                                <p>/ 10</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-sm font-semibold mb-1">Review</label>
                        <textarea
                            name="review"
                            maxLength={200}
                            className="form-input h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-inverse">Save changes</button>
                </form>
            </div>
        </div>
    );
}
