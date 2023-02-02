import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../api/paths";

export default function Search({ setMovies }) {
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=c370deb2&s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
        navigate(routes.SEARCH(query));
        setError("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-8 w-full">
      <input
        value={query}
        name="search"
        type="text"
        autoComplete="off"
        placeholder="Search for movies..."
        className="border rounded-full px-4 py-1.5 mr-2 outline-0 w-full"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-full px-8 py-1"
        disabled={query === ""}
      >
        Search
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
