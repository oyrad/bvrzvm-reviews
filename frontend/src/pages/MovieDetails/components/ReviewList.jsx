import React from "react";
import ReviewCard from "../../../components/ReviewCard";

import { dateFormatter } from "../../../util/dateFormatter";

export default function ReviewList({ movieId, reviews, setReviews }) {
  React.useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`/api/reviews/${movieId}`);
      const data = await res.json();
      setReviews(data);
    }
    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.length > 0 && (
        <p className="text-2xl font-semibold mb-2">
          Reviews
          <span className="ml-2 bg-blue-100 rounded-full px-4 py-0.5 text-lg">
            {reviews.length}
          </span>
        </p>
      )}
      {reviews.map((review) => (
        <ReviewCard review={review} key={review._id} />
      ))}
    </div>
  );
}