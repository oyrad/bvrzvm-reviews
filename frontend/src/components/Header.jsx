import React from "react";

import { useNavigate } from "react-router-dom";

import Search from "./Search";
import { routes } from "../api/paths";
import { UserContext } from "../UserContext";

import logo from "../images/burzum-logo.jpg";

export default function Header({ setMovies, setError, query, setQuery }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

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

  function googleAuth() {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
  }

  function logout() {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
  }

  return (
    <header
      className={`2xl:px-72 xl:px-48 lg:px-16 md:px-8 px-4 flex justify-between items-center py-3 md:py-4 mb-4 sm:mb-8 sticky top-0 z-50 w-full bg-white ${
        isScrolled && "shadow-lg"
      }`}
    >
      <div
        className="flex flex-col items-end mt-1 cursor-pointer lg:flex-row lg:mt-0"
        onClick={() => {
          setQuery("");
          navigate(routes.DASHBOARD);
        }}
      >
        <img src={logo} alt="burzum" className="w-44" />
        <p className="text-lg lg:text-xl font-semibold -mt-1.5 lg:ml-1 lg:-mb-1">
          reviews
        </p>
      </div>
      <div className="flex items-center">
        <Search
          setMovies={setMovies}
          setError={setError}
          query={query}
          setQuery={setQuery}
          className="hidden mr-4 sm:block lg:mr-8"
        />
        {user.displayName ? (
          <>
            <div
              className="flex items-center cursor-pointer hover:opacity-80"
              onClick={() => navigate(routes.USER(user.id))}
            >
              <img
                src={user.photos[0].value}
                alt="avatar"
                className="mr-4 rounded-full w-9 sm:mr-2"
              />
              <p className="hidden mr-4 lg:mr-8 md:block">{user.displayName}</p>
            </div>
            <button
              onClick={logout}
              className="cursor-pointer hover:opacity-80"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            onClick={googleAuth}
            className="cursor-pointer hover:opacity-80"
          >
            Log in
          </button>
        )}
      </div>
    </header>
  );
}
