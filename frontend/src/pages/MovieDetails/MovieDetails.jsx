import React from "react";

import { useParams } from "react-router-dom";
import { getLogoFromSource } from "../../util/getLogoFromSource";
import AddReviewForm from "./components/AddReviewForm";
import ReviewList from "./components/ReviewList";

export default function MovieDetails() {
  const [movie, setMovie] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=c370deb2&i=${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  if (movie)
    return (
      <>
        <div className="flex bg-white rounded-lg shadow mb-8">
          <img src={movie.Poster} alt="poster" className="rounded-l-lg mr-1" />
          <div className="p-4">
            <p className="text-2xl">
              <span className="font-semibold">{movie.Title}</span> ({movie.Year}
              )
            </p>
            <p className="text-sm">{movie.Genre}</p>
            <p className="text-sm mb-4">{movie.Runtime}</p>
            <p>
              <span className="font-semibold">Actors:</span> {movie.Actors}
            </p>
            <p>
              <span className="font-semibold">Director:</span> {movie.Director}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Writer:</span> {movie.Writer}
            </p>
            <p className="mb-4">{movie.Plot}</p>
            <p className="font-semibold mb-2">Ratings:</p>
            <div className="flex space-x-8">
              {movie.Ratings.map((rating) => (
                <div className="flex mb-3 items-center" key={rating.Source}>
                  <img
                    src={getLogoFromSource(rating.Source)}
                    alt="logo"
                    className="w-20 mr-4"
                  />
                  <p key={rating.Source}>{rating.Value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AddReviewForm
          movieId={movie.imdbID}
          movieName={movie.Title}
          movieYear={movie.Year}
        />
        <ReviewList movieId={movie.imdbID} />
      </>
    );
}
