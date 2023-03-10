import React from "react";
import { useNavigate } from "react-router-dom";

import { getColorFromRating, formatRating } from "../util/ratingsUtil";

import { routes } from "../api/paths";

export default function ReviewCard({
  review,
  isEditable,
  refreshReviews,
  setIsEditModeOn,
  page,
}) {
  const navigate = useNavigate();

  function handleDelete() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${review._id}`, {
      method: "DELETE",
    });
    refreshReviews();
  }

  return (
    <>
      {isEditable && (
        <div className="flex justify-between items-start">
          <p className="text-2xl font-semibold mb-3">Your review</p>
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
        className="rounded md:rounded-lg shadow bg-white flex mb-4 cursor-pointer md:border-none"
        onClick={() => {
          if (page !== "movie") {
            navigate(routes.MOVIE(review.movieId));
          } else {
            navigate(routes.USER(review.userId));
          }
        }}
      >
        <img
          src={page !== "movie" ? review.moviePoster : review.avatar}
          className={`hidden md:block rounded-l-lg hover:opacity-90 transition ${
            page !== "movie" ? "w-28" : "w-44 lg:max-w-[8rem]"
          }`}
        />
        <div
          className="p-4 border-l-4 w-full flex justify-between rounded md:rounded-none"
          style={{ borderColor: getColorFromRating(review.rating) }}
        >
          <div className="w-full">
            <div className="flex justify-between">
              <div>
                <p className="text-xl font-semibold">
                  {page !== "movie"
                    ? `${review.movieName} (${review.movieYear})`
                    : review.user}
                </p>
                <p className="text-gray-700 italic text-xs">
                  {page === "dashboard" && `${review.user} - `}
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
              <p className="font-bold text-xl pl-8 md:pr-1">
                {formatRating(review.rating)}
              </p>
            </div>
            {review.description && (
              <p className="text-sm mt-2">{review.description}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
