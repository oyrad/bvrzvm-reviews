import React from "react";
import { useNavigate } from "react-router-dom";

import { getColorFromRating, formatRating } from "../util/ratingsUtil";
import { routes } from "../api/paths";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import { UserContext } from "../UserContext";

export default function ReviewCard({
  review,
  isEditable,
  refreshReviews,
  setIsEditModeOn,
  page,
}) {
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [likes, setLikes] = React.useState(review.likes);
  const [dislikes, setDislikes] = React.useState(review.dislikes);

  console.log("likes length", likes.length);

  function handleDelete() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${review._id}`, {
      method: "DELETE",
    });
    refreshReviews();
  }

  function handleLikeClick() {
    if (user.id === undefined) return;
    if (parseInt(user.id) === review.userId) return;

    const updatedReview = review;
    if (review.dislikes.includes(parseInt(user.id))) {
      const currentIds = review.dislikes;
      const userIdIndex = currentIds.indexOf(parseInt(user.id));
      updatedReview.dislikes = currentIds.splice(userIdIndex, 1);
    }
    if (likes.includes(parseInt(user.id))) {
      const currentIds = review.likes;
      const userIdIndex = currentIds.indexOf(parseInt(user.id));
      currentIds.splice(userIdIndex, 1);
      updatedReview.likes = currentIds;

      const currentFrontIds = likes;
      const userIdFrontIndex = currentFrontIds.indexOf(parseInt(user.id));
      currentFrontIds.splice(userIdFrontIndex, 1);
      setLikes(currentFrontIds);
    } else {
      updatedReview.likes = [...review.likes, user.id];
      setLikes((prevLikes) => [...prevLikes, parseInt(user.id)]);
    }
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${review._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedReview),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function handleDislikeClick() {
    if (user.id === undefined) return;
    if (parseInt(user.id) === review.userId) return;

    const updatedReview = review;
    if (review.likes.includes(parseInt(user.id))) {
      const currentIds = review.likes;
      const userIdIndex = currentIds.indexOf(parseInt(user.id));
      currentIds.splice(userIdIndex, 1);
      updatedReview.likes = currentIds;
    }
    if (review.dislikes.includes(parseInt(user.id))) {
      const currentIds = review.dislikes;
      const userIdIndex = currentIds.indexOf(parseInt(user.id));
      currentIds.splice(userIdIndex, 1);
      updatedReview.dislikes = currentIds;
    } else {
      updatedReview.dislikes = [...review.dislikes, user.id];
      setDislikes((prevDislikes) => [...prevDislikes, parseInt(user.id)]);
    }
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${review._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedReview),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
          alt="poster"
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
            <div
              className="flex items-center space-x-2"
              onClick={(e) => e.stopPropagation()}
            >
              <p
                className={`${
                  likes.length > 0 ? "text-green-600" : "text-gray-400"
                }`}
              >
                likes length: {likes.length}
              </p>
              <LikeButton
                onClick={handleLikeClick}
                disabled={
                  user.id === undefined || parseInt(user.id) === review.userId
                }
                isSelected={likes.includes(parseInt(user.id))}
              />
              <p
                className={`pl-2 ${
                  dislikes.length > 0 ? "text-red-600" : "text-gray-400"
                }`}
              >
                {dislikes.length}
              </p>
              <DislikeButton
                review={review}
                onClick={handleDislikeClick}
                disabled={
                  user.id === undefined || parseInt(user.id) === review.userId
                }
                dislikes={dislikes}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
