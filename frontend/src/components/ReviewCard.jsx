import React from "react";
import { useNavigate } from "react-router-dom";

import { dateFormatter } from "../util/dateFormatter";

import { routes } from "../api/paths";

export default function ReviewCard({
  review,
  isEditable,
  refreshReviews,
  setIsEditModeOn,
}) {
  const navigate = useNavigate();

  function handleDelete() {
    fetch(`/api/reviews/${review._id}`, {
      method: "DELETE",
    });
    refreshReviews();
  }

  return (
    <>
      {isEditable && (
        <div className="flex justify-between items-start">
          <p className="text-2xl font-semibold mb-2">Your review</p>
          <div className="flex space-x-1">
            <button
              className="btn btn-inverse"
              onClick={() => setIsEditModeOn(true)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
      <div className="rounded-lg shadow bg-white mb-4">
        <div className="flex justify-between items-center">
          <div className="flex p-3 lg:p-0">
            <div
              className="relative center text-white bg-black hover:bg-white rounded-full lg:rounded-none lg:rounded-l-lg cursor-pointer"
              onClick={() => navigate(routes.USER(review.userId))}
            >
              <img
                src={review.avatar}
                alt="avatar"
                className="w-20 lg:w-28 rounded-full lg:rounded-none lg:rounded-l-lg opacity-70 hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl lg:text-5xl text-shadow">
                {review.rating}
              </p>
            </div>
            <div className="flex flex-col p-4 justify-center">
              <p className="font-semibold text-lg mr-2">{review.user}</p>
              <p className="text-xs text-gray-500 italic">
                {review.createdAt === review.updatedAt ? (
                  dateFormatter(review.createdAt)
                ) : (
                  <span>Edited: {dateFormatter(review.updatedAt)}</span>
                )}
              </p>
              {review.description && (
                <p className="mt-2 text-sm hidden lg:block">
                  {review.description}
                </p>
              )}
            </div>
          </div>
        </div>
        {review.description && (
          <p className="text-sm p-4 pt-0 block lg:hidden">
            {review.description}
          </p>
        )}
      </div>
    </>
  );
}
