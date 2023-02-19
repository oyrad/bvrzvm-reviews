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
          <div className="flex">
            <div
              className="md:relative center text-white bg-black hover:bg-white rounded-l-lg cursor-pointer"
              onClick={() => navigate(routes.USER(review.userId))}
            >
              <img
                src={review.avatar}
                alt="avatar"
                className="hidden md:block w-36 lg:w-32 max-w-[10rem] rounded-l-lg opacity-70 hover:opacity-80"
                referrerPolicy="no-referrer"
              />
              <p className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl text-shadow">
                {review.rating}
              </p>
            </div>
            <div className="flex flex-col p-4 justify-center">
              <div className="flex items-center">
                <p className="text-4xl mr-4 md:hidden">{review.rating}</p>
                <div>
                  <p className="font-semibold text-lg mr-2">{review.user}</p>
                  <p className="text-xs text-gray-500 italic">
                    {review.createdAt === review.updatedAt ? (
                      dateFormatter(review.createdAt)
                    ) : (
                      <span>Edited: {dateFormatter(review.updatedAt)}</span>
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
