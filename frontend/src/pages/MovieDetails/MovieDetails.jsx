import React from "react";

import { useParams } from "react-router-dom";
import { calculateRating } from "../../util/calculateRating";
import AddReviewForm from "./components/AddReviewForm";
import ReviewList from "./components/ReviewList";
import { UserContext } from "../../UserContext";
import ReviewCard from "../../components/ReviewCard";
import EditReviewForm from "./components/EditReviewForm";

import burzum from "../../images/burzum-logo.jpg";
import imdb from "../../images/imdb-logo.webp";

export default function MovieDetails() {
  const [movie, setMovie] = React.useState();
  const [reviews, setReviews] = React.useState([]);
  const [reviewByCurrentUser, setReviewByCurrentUser] = React.useState();
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);

  const { id } = useParams();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=c370deb2&i=${id}`)
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
        <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow mb-8">
          <img
            src={movie.Poster}
            alt="poster"
            className="rounded-t-lg md:rounded-none md:rounded-l-lg mr-0 md:mr-1"
          />
          <div className="p-4 flex flex-col justify-between">
            <div>
              <p className="text-xl md:text-2xl">
                <span className="font-semibold">{movie.Title}</span> (
                {movie.Year})
              </p>
              <p className="text-sm">{movie.Genre}</p>
              <p className="text-sm mb-4">{movie.Runtime}</p>
              <p className="text-sm">
                <span className="font-semibold mr-1">Actors:</span>
                {movie.Actors}
              </p>
              <p className="text-sm">
                <span className="font-semibold mr-1">Director:</span>
                {movie.Director}
              </p>
              <p className="mb-4 text-sm">
                <span className="font-semibold mr-1">
                  {movie.Writer.includes(",") ? "Writers:" : "Writer:"}
                </span>
                {movie.Writer}
              </p>
              <p className="mb-4 w-[90%] lg:w-[85%] xl:w-[80%]">{movie.Plot}</p>
            </div>
            <div className="pb-1">
              <p className="font-semibold">Ratings:</p>
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex items-center mt-2 md:mt-0">
                  <img src={burzum} alt="burzum" className="w-36" />
                  <p className="ml-2 md:ml-4">{calculateRating(reviews)}</p>
                </div>
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}/`}
                  className="flex mb-3 items-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={imdb} alt="logo" className="w-20 mr-2 md:mr-4" />
                  <p>{movie.Ratings[0].Value}</p>
                </a>
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
                  <ReviewCard
                    review={reviewByCurrentUser}
                    isEditable
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
