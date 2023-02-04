import React from "react";

import { dateFormatter } from "../util/dateFormatter";

export default function ReviewCard({ review }) {
  return (
    <div
      key={review._id}
      className="rounded-lg shadow bg-white flex items-center mb-4"
    >
      <img
        src={review.avatar}
        alt="avatar"
        className="w-28 rounded-l-lg mr-2"
      />
      <div className="flex flex-col p-4">
        <div className="flex items-center">
          <p className="font-semibold text-lg mr-2">{review.user}</p>
          <p>{review.rating}/10</p>
        </div>
        <p className="text-xs">{dateFormatter(review.createdAt)}</p>
        {review.description && <p className="mt-2">{review.description}</p>}
      </div>
    </div>
  );
}
