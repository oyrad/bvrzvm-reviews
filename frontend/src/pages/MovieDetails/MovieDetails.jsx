import React from "react";

import { useParams } from "react-router-dom";
import { getLogoFromSource } from "../../util/getLogoFromSource";
import { getLinkFromSource } from "../../util/getLinkFromSource";
import AddReviewForm from "./components/AddReviewForm";
import ReviewList from "./components/ReviewList";
import { UserContext } from "../../UserContext";
import ReviewCard from "../../components/ReviewCard";

export default function MovieDetails() {
  const [movie, setMovie] = React.useState();
  const [reviews, setReviews] = React.useState([]);
  const [reviewByCurrentUser, setReviewByCurrentUser] = React.useState()

  const { id } = useParams();
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=c370deb2&i=${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`/api/reviews/${user.id}/${id}`).then((res) => res.json()).then((data) => setReviewByCurrentUser(data[0]))
  }, [user, id]);

  if (movie)
    return (
      <>
        <div className="flex bg-white rounded-lg shadow mb-8">
          <img
            src={movie.Poster}
            alt="poster"
            className="rounded-l-lg mr-1 w-64"
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
              <p className="mb-4 w-2/3">{movie.Plot}</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Ratings:</p>
              <div className="flex space-x-8">
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
                    <p key={rating.Source}>{rating.Value}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {user.name ? reviewByCurrentUser ? (<div className="mb-8"><p className="text-2xl font-semibold mb-2">Your review</p><ReviewCard review={reviewByCurrentUser} /></div>) : (
          <AddReviewForm
            movieId={movie.imdbID}
            movieName={movie.Title}
            movieYear={movie.Year}
            setReviews={setReviews}
          />
        ) : (
          <p className="text-xl mb-8">Log in to write a review.</p>
        )}

        <ReviewList
          movieId={movie.imdbID}
          reviews={reviews}
          setReviews={setReviews}
        />
      </>
    );
}
