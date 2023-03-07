import React from "react";

import ReviewForm from "./ReviewForm";

import { UserContext } from "../../../UserContext";

export default function AddReview({ movie, setReviews, setCurrentReview }) {
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
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews`, {
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
    <ReviewForm
      title="Add review"
      buttonText="Submit review"
      handleSubmit={handleSubmit}
      rating={rating}
      setRating={setRating}
      description={description}
      setDescription={setDescription}
      isCancelable={false}
    />
  );
}
