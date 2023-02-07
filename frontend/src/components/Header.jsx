import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../api/paths";
import { UserContext } from "../UserContext";

import logo from "../images/burzum-logo.jpg";

export default function Header({ setMovies, setError }) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

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
      `http://www.omdbapi.com/?apikey=c370deb2&s=${query}&type=movie`
    );
    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setError(data.Error);
    }
    navigate(routes.SEARCH(query));
  }

  function googleAuth() {
    window.open("http://localhost:4420/auth/google", "_self");
  }

  function logout() {
    window.open("http://localhost:4420/auth/logout", "_self");
  }

  return (
    <header
      className={`flex justify-between items-center py-4 px-80 mb-8 sticky top-0 z-50 w-full bg-white ${isScrolled && "shadow-lg"
        }`}
    >
      <div
        className="flex items-end cursor-pointer"
        onClick={() => { setQuery(""); navigate(routes.DASHBOARD); }}
      >
        <img src={logo} alt="burzum" className="w-44" />
        <p className="text-xl font-semibold pb-0.5">reviews</p>
      </div>
      <div className="flex items-center">
        <form onSubmit={handleSubmit} className="flex mr-8">
          <input
            value={query}
            name="search"
            type="text"
            autoComplete="off"
            placeholder="Search for movies..."
            className="border rounded-full px-4 py-1.5 mr-2 outline-0"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-inverse"
            disabled={query === ""}
          >
            Search
          </button>
        </form>
        {user.displayName ? (
          <>
            <img
              src={user.photos[0].value}
              alt="avatar"
              className="w-10 mr-2 rounded-full"
            />
            <p className="mr-8">{user.displayName}</p>
            <p onClick={logout} className="cursor-pointer">
              Log out
            </p>
          </>
        ) : (
          <p onClick={googleAuth} className="cursor-pointer">
            Log in
          </p>
        )}
      </div>
    </header>
  );
}
