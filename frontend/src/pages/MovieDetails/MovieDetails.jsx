import React from "react";

import { useParams } from "react-router-dom";
import { calculateRating, formatRating } from "../../util/ratingsUtil";
import AddReview from "./components/AddReview";
import EditReview from "./components/EditReview";
import ReviewList from "./components/ReviewList";
import { UserContext } from "../../UserContext";
import ReviewCard from "../../components/ReviewCard";

import burzum from "../../images/burzum-logo.jpg";
import imdb from "../../images/imdb-logo.webp";
import { Spinner } from "../../components/Spinner";

export default function MovieDetails() {
  const [movie, setMovie] = React.useState();
  const [reviews, setReviews] = React.useState([]);
  const [reviewByCurrentUser, setReviewByCurrentUser] = React.useState();
  const [isEditModeOn, setIsEditModeOn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const { id } = useParams();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/${user.id}/${id}`)
      .then((res) => res.json())
      .then((data) => setReviewByCurrentUser(data[0]))
      .finally(() => setIsLoading(false));
  }, [user, id]);

  function refreshReviewsOnDelete() {
    setReviewByCurrentUser();
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review._id !== reviewByCurrentUser._id)
    );
  }

  return (
    <>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        movie && (
          <>
            <div className="md:hidden flex bg-white rounded-lg shadow mb-4">
              <img
                src={movie.Poster}
                alt="poster"
                className="rounded-l-lg w-36"
              />
              <div className="p-4">
                <p className="text-xl">
                  <span className="font-semibold">{movie.Title}</span> (
                  {movie.Year})
                </p>
                <p className="text-sm">{movie.Genre}</p>
                <p className="text-sm mb-4">{movie.Runtime}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow mb-8">
              <img
                src={movie.Poster}
                alt="poster"
                className="hidden md:block rounded-l-lg mr-1"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <p className="text-xl md:text-2xl hidden md:block">
                    <span className="font-semibold">{movie.Title}</span> (
                    {movie.Year})
                  </p>
                  <p className="text-sm hidden md:block">{movie.Genre}</p>
                  <p className="text-sm mb-4 hidden md:block">
                    {movie.Runtime}
                  </p>
                  <p className="font-semibold md:hidden mb-1">Details</p>
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
                  <p className="mb-4 w-[90%] lg:w-[85%] xl:w-[80%]">
                    {movie.Plot}
                  </p>
                </div>
                <div className="pb-1">
                  <p className="font-semibold">Ratings</p>
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="flex items-center mt-2 md:mt-0">
                      <img src={burzum} alt="burzum" className="w-32" />
                      <p className="ml-2 md:ml-4">
                        {formatRating(calculateRating(reviews)) !== "-"
                          ? `${formatRating(calculateRating(reviews))}/10`
                          : "-"}
                      </p>
                    </div>
                    <a
                      href={`https://www.imdb.com/title/${movie.imdbID}/`}
                      className="flex mb-3 items-center"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={imdb}
                        alt="logo"
                        className="w-16 mr-2 md:mr-4"
                      />
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
                      <EditReview
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
                        page="movie"
                      />
                    </>
                  )}
                </div>
              ) : (
                <AddReview
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
        )
      )}
    </>
  );
}
