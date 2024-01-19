import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../api/paths";

export default function Search({
  setMovies,
  setError,
  query,
  setQuery,
  className,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [previousQuery, setPreviousQuery] = React.useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    if (query === previousQuery && location.pathname.includes("search")) return;
    setMovies([]);
    setError(undefined);
    setPreviousQuery(query);
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
          className="border w-full rounded-full pl-4 py-1.5 mr-2 outline-0 pr-8"
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 -ml-10 text-gray-600 cursor-pointer"
          onClick={handleSubmit}
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
