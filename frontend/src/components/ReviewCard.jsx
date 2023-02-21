import React from "react";
import { useNavigate } from "react-router-dom";

import { getColorFromRating } from "../util/ratingsUtil";

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
      <div
        className="rounded md:rounded-lg shadow bg-white flex flex-col mb-4 cursor-pointer border-l-4 md:border-none"
        style={{ borderColor: getColorFromRating(review.rating) }}
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <div
              className="hidden md:block md:relative center text-white bg-black hover:bg-white md:rounded-l-lg border-r-4"
              onClick={() => navigate(routes.USER(review.userId))}
              style={{ borderColor: getColorFromRating(review.rating) }}
            >
              <img
                src={review.avatar}
                alt="avatar"
                className="w-36 lg:w-32 max-w-[10rem] rounded-l-lg opacity-70 hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-shadow">
                {review.rating}
              </p>
            </div>
            <div className="flex flex-col p-4 justify-center">
              <div className="flex items-center">
                <p className="text-4xl mr-4 ml-1 md:hidden">{review.rating}</p>
                <div>
                  <p className="font-semibold text-lg mr-2">{review.user}</p>
                  <p className="text-xs text-gray-500 italic">
                    {review.createdAt === review.updatedAt ? (
                      new Date(review.createdAt)
                        .toLocaleString("hr-HR")
                        .substring(0, 19)
                    ) : (
                      <span>
                        Edited:{" "}
                        {new Date(review.updatedAt)
                          .toLocaleString("hr-HR")
                          .substring(0, 19)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {review.description && (
                <p className="mt-2 text-sm hidden md:block">
                  {review.description}
                </p>
              )}
            </div>
          </div>
        </div>
        {review.description && (
          <p className="text-sm p-4 pt-0 block md:hidden">
            {review.description}
          </p>
        )}
      </div>
    </>
  );
}
