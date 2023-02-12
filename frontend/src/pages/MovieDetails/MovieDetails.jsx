import React from "react";

import { useParams } from "react-router-dom";
import { getLogoFromSource } from "../../util/getLogoFromSource";
import { getLinkFromSource } from "../../util/getLinkFromSource";
import { calculateRating } from "../../util/calculateRating";
import AddReviewForm from "./components/AddReviewForm";
import ReviewList from "./components/ReviewList";
import { UserContext } from "../../UserContext";
import ReviewCard from "../../components/ReviewCard";
import EditReviewForm from "./components/EditReviewForm";

import burzum from "../../images/burzum-logo.jpg";

export default function MovieDetails() {
  const [movie, setMovie] = React.useState();
  const [reviews, setReviews] = React.useState([]);
  const [reviewByCurrentUser, setReviewByCurrentUser] = React.useState();
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);

  const { id } = useParams();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=c370deb2&i=${id}&plot=full`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));

    fetch(`/api/reviews/${user.id}/${id}`)
      .then((res) => res.json())
      .then((data) => setReviewByCurrentUser(data[0]));
  }, [user, id]);

  function refreshReviewsOnDelete() {
    setReviewByCurrentUser();
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== reviewByCurrentUser._id)
    );
  }

  if (movie)
    return (
      <>
        <div className="flex bg-white rounded-lg shadow mb-8">
          <img
            src={movie.Poster}
            alt="poster"
            className="rounded-l-lg mr-1 w-68"
          />
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-2xl">
                <span className="font-semibold">{movie.Title}</span> (
                {movie.Year})
              </p>
              <p className="text-sm">{movie.Genre}</p>
              <p className="text-sm mb-4">{movie.Runtime}</p>
              <p>
                <span className="font-semibold mr-1">Actors:</span>
                {movie.Actors}
              </p>
              <p>
                <span className="font-semibold mr-1">Director:</span>
                {movie.Director}
              </p>
              <p className="mb-4">
                <span className="font-semibold mr-1">
                  {movie.Writer.includes(",") ? "Writers:" : "Writer:"}
                </span>
                {movie.Writer}
              </p>
              <p className="mb-4 w-3/4">{movie.Plot}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Ratings:</p>
              <div className="flex items-center space-x-8">
                <img
                  src={burzum}
                  alt="burzum"
                  className="w-36 -mt-4 -ml-1 -mr-5"
                />
                <p className="-mt-3">{calculateRating(reviews)}</p>
                {movie.Ratings.map((rating) => (
                  <a
                    key={rating.Source}
                    href={getLinkFromSource(
                      rating.Source,
                      movie.imdbID,
                      movie.Title
                    )}
                    className="flex mb-3 items-center"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={getLogoFromSource(rating.Source)}
                      alt="logo"
                      className="w-20 mr-4"
                    />
                    <p>{rating.Value}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {user.name ? (
          reviewByCurrentUser ? (
            <div className="mb-8">
              {isEditModeOn ? (
                <>
                  <EditReviewForm
                    currentReview={reviewByCurrentUser}
                    setCurrentReview={setReviewByCurrentUser}
                    reviews={reviews}
                    setReviews={setReviews}
                    setIsEditModeOn={setIsEditModeOn}
                  />
                </>
              ) : (
                <>
                  <p className="text-2xl font-semibold mb-2">Your review</p>
                  <ReviewCard
                    review={reviewByCurrentUser}
                    isEditable={true}
                    refreshReviews={refreshReviewsOnDelete}
                    setIsEditModeOn={setIsEditModeOn}
                  />
                </>
              )}
            </div>
          ) : (
            <AddReviewForm
              movie={movie}
              setReviews={setReviews}
              setCurrentReview={setReviewByCurrentUser}
            />
          )
        ) : (
          <p className="text-xl mb-8">Log in to write a review.</p>
        )}

        <ReviewList reviews={reviews} />
      </>
    );
}
