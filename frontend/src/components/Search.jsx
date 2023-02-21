import React from "react";

import { useNavigate } from "react-router-dom";
import { routes } from "../api/paths";

export default function Search({
  setMovies,
  setError,
  query,
  setQuery,
  className,
}) {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMovies([]);
    setError(undefined);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=c370deb2&s=${query}`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setError(data.Error);
    }
    navigate(routes.SEARCH(query));
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex items-center">
        <input
          value={query}
          name="search"
          type="text"
          autoComplete="off"
          placeholder="Search for movies..."
          className="border w-full rounded-full px-4 py-1.5 mr-2 outline-0"
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 -ml-10 cursor-pointer text-gray-600"
          onClick={query !== "" ? handleSubmit : () => {}}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </form>
  );
}
