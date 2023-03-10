import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../api/paths";
import { Spinner } from "../../components/Spinner";

export default function MoviesList({ movies, error, setMovies, setError }) {
  const navigate = useNavigate();
  const { query } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [query, setMovies, setError]);

  return (
    <>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : error ? (
        <div className="bg-red-100 w-full p-3 rounded-lg md:-mt-2">
          <p className="text-red-600">Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {movies.map((movie) => (
            <div
              className="bg-white rounded-xl shadow flex justify-between hover:scale-[1.01] transition-all cursor-pointer"
              key={movie.imdbID}
              onClick={() => navigate(routes.MOVIE(movie.imdbID))}
            >
              <div className="flex">
                <img
                  src={movie.Poster}
                  alt="poster"
                  className="w-32 rounded-l-xl"
                />
                <div className="p-4">
                  <p className="text-xl font-semibold">{movie.Title}</p>
                  <p className="mb-2">{movie.Year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
