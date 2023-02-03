import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../../api/paths";

export default function MoviesList({ movies, error }) {
  const navigate = useNavigate();
  console.log(error);
  return (
    <>
      {error ? (
        error
      ) : (
        <div className="grid grid-cols-2 gap-6 mb-4">
          {movies.map((movie) => (
            <div
              className="bg-white rounded-xl shadow flex justify-between hover:scale-[1.02] transition-all cursor-pointer"
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
