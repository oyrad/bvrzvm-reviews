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
    window.open("http://localhost:4420/auth/google", "_self");
  }

  function logout() {
    window.open("http://localhost:4420/auth/logout", "_self");
  }

  return (
    <header
      className={`2xl:px-72 xl:px-48 lg:px-28 md:px-8 px-4 flex justify-between items-center py-3 md:py-4 mb-4 sm:mb-8 sticky top-0 z-50 w-full bg-white ${
        isScrolled && "shadow-lg"
      }`}
    >
      <div
        className="flex flex-col lg:flex-row items-end cursor-pointer mt-1 lg:mt-0"
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
          className="hidden sm:block mr-4 lg:mr-8"
        />
        {user.displayName ? (
          <>
            <div
              className="flex items-center cursor-pointer hover:opacity-90"
              onClick={() => navigate(routes.USER(user.id))}
            >
              <img
                src={user.photos[0].value}
                alt="avatar"
                className="w-10 mr-4 sm:mr-2 rounded-full"
              />
              <p className="mr-4 lg:mr-8 hidden md:block">{user.displayName}</p>
            </div>
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
