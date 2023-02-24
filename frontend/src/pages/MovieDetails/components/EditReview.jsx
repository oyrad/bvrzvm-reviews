import React from "react";

import ReviewForm from "./ReviewForm";

export default function EditReview({
  currentReview,
  setIsEditModeOn,
  setCurrentReview,
  reviews,
  setReviews,
}) {
  const [rating, setRating] = React.useState(currentReview.rating);
  const [description, setDescription] = React.useState(
    currentReview.description
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedReview = {
      ...currentReview,
      rating: Math.round(rating * 10) / 10,
      description: description,
    };
    fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/reviews/${currentReview._id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedReview),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsEditModeOn(false);
    setCurrentReview({
      ...updatedReview,
      updatedAt: new Date().toISOString(),
    });
    const allReviews = [...reviews];
    const indexOfReview = allReviews.findIndex(
      (rev) => rev._id === currentReview._id
    );
    allReviews.splice(indexOfReview, 1);
    setReviews(
      [
        ...allReviews,
        { ...updatedReview, updatedAt: new Date().toISOString() },
      ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }

  return (
    <ReviewForm
      title="Edit review"
      buttonText="Save changes"
      handleSubmit={handleSubmit}
      rating={rating}
      setRating={setRating}
      description={description}
      setDescription={setDescription}
    />
  );
}
