import React from "react";
import ReviewCard from "../../../components/ReviewCard";

export default function ReviewList({ reviews }) {
  return (
    <div className="mb-6">
      {reviews.length > 0 && (
        <p className="text-2xl font-semibold mb-3">
          Reviews
          <span className="ml-2 bg-white rounded-full px-4 py-0.5 text-lg">
            {reviews.length}
          </span>
        </p>
      )}
      {reviews.map((review) => (
        <ReviewCard review={review} key={review._id} isEditable={false} />
      ))}
    </div>
  );
}
