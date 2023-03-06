import React from "react";
import { useNavigate } from "react-router-dom";

import { getColorFromRating } from "../util/ratingsUtil";

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
        className={`rounded md:rounded-lg shadow bg-white flex flex-col mb-4 cursor-pointer border-l-4 md:border-none ${
          review.rating === 10 &&
          "gradient-border border-none bg-transparent pl-1 md:pl-0"
        }`}
        style={{ borderColor: getColorFromRating(review.rating) }}
        onClick={() => {
          if (page === "movie") {
            navigate(routes.USER(review.userId));
          } else {
            navigate(routes.MOVIE(review.movieId));
          }
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            <div
              className={`hidden md:block md:relative center text-white bg-black hover:bg-gray-600 md:rounded-l-lg border-r-4 transition ${
                review.rating === 10 && "border-none"
              }`}
              style={{ borderColor: getColorFromRating(review.rating) }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(routes.USER(review.userId));
              }}
            >
              <img
                src={review.avatar}
                alt="avatar"
                className="w-36 lg:w-32 max-w-[10rem] rounded-l-lg opacity-70"
                referrerPolicy="no-referrer"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-shadow">
                {review.rating}
              </p>
            </div>
            <div
              className={`flex flex-col p-4 justify-center ${
                review.rating === 10 && "pl-5"
              }`}
            >
              <div className="flex items-center">
                <p className="text-4xl mr-4 ml-1 md:hidden">{review.rating}</p>
                <div>
                  <div className="font-semibold text-lg md:text-xl mr-2">
                    {page === "dashboard" ? (
                      <p>
                        {review.movieName}
                        <span className="font-normal ml-1.5">
                          ({review.movieYear})
                        </span>
                      </p>
                    ) : (
                      review.user
                    )}
                  </div>
                  <p
                    className={`text-xs italic ${
                      review.rating === 10 ? "text-white" : "text-gray-500"
                    }`}
                  >
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
              </div>
              {review.description && (
                <p className="mt-2 text-sm hidden md:block break-all">
                  {review.description}
                </p>
              )}
            </div>
          </div>
        </div>
        {review.description && (
          <p className="text-sm p-4 pt-0 block md:hidden break-all">
            {review.description}
          </p>
        )}
      </div>
    </>
  );
}
