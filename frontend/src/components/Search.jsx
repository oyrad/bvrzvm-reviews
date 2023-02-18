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
      <input
        value={query}
        name="search"
        type="text"
        autoComplete="off"
        placeholder="Search for movies..."
        className="border w-full rounded-full px-4 py-1.5 mr-2 outline-0"
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <button
          type="submit"
          className="btn btn-inverse"
          disabled={query === ""}
          hidden
        >
          Search
        </button> */}
    </form>
  );
}
