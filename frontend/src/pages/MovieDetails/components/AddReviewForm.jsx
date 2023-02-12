import React from "react";

import { UserContext } from "../../../UserContext";

export default function AddReviewForm({ movie, setReviews, setCurrentReview }) {
  const [rating, setRating] = React.useState("");
  const [description, setDescription] = React.useState("");

  const { user } = React.useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const newReview = {
      user: user.displayName,
      userId: user.id,
      avatar: user.photos[0].value,
      movieId: movie.imdbID,
      movieName: movie.Title,
      movieYear: movie.Year,
      moviePoster: movie.Poster,
      rating: Math.round(rating * 10) / 10,
      description: description,
    };
    fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const currentDate = new Date().toISOString();
    const newReviewForDisplay = {
      ...newReview,
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    setCurrentReview(newReviewForDisplay);
    setReviews((prevReviews) => [newReviewForDisplay, ...prevReviews]);
  }

  return (
    <div className="mb-8">
      <p className="text-2xl font-semibold mb-2">Write a review</p>
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
          <button className="btn btn-inverse">Add review</button>
        </form>
      </div>
    </div>
  );
}
