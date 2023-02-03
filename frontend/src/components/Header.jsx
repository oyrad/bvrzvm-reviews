import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../api/paths";
import logo from "../images/burzum-logo.jpg";

export default function Header({ setMovies, setError }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(undefined);
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=c370deb2&s=${query}`
    );
    const data = await res.json();

    console.log(data);

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setError("Something went wrong");
    }
    navigate(routes.SEARCH(query));
  }

  return (
    <header
      className={`flex justify-between items-center py-4 px-80 mb-8 sticky top-0 z-50 w-full bg-white ${
        isScrolled && "shadow-lg"
      }`}
    >
      <div
        className="flex items-end cursor-pointer"
        onClick={() => navigate(routes.DASHBOARD)}
      >
        <img src={logo} className="w-44" />
        <p className="text-xl font-semibold pb-0.5">reviews</p>
      </div>
      <div className="flex items-center">
        <form onSubmit={handleSubmit} className="flex">
          <input
            value={query}
            name="search"
            type="text"
            autoComplete="off"
            placeholder="Search for movies..."
            className="border rounded-full px-4 py-1.5 mr-2 outline-0"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn" disabled={query === ""}>
            Search
          </button>
        </form>
        <p className="mx-8 cursor-pointer">Log in</p>
      </div>
    </header>
  );
}
