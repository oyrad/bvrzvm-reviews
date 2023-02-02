import React from "react";

export default function ReviewList({ movieId }) {
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`/api/reviews/${movieId}`);
      const data = await res.json();
      setReviews(data);
    }
    fetchReviews();
  }, []);

  return (
    <>
      <p className="text-2xl font-semibold mb-2">Reviews</p>
      {reviews.map((review) => (
        <div
          key={review._id}
          className="rounded-lg shadow bg-white flex flex-col space-y-2 mb-4 p-4"
        >
          <p>{review.userName}</p>
          <p>{review.rating}/10</p>
          <p>{review.description}</p>
          <p>{review.createdAt.split("T")[0]}</p>
        </div>
      ))}
    </>
  );
}
