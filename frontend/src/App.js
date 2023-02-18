import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MovieList from "./pages/MovieList/MovieList";

import Dashboard from "./pages/Dashboard/Dashboard";
import { routes } from "./api/paths";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import UserDetails from "./pages/UserDetails/UserDetails";
import NotFound from "./pages/NotFound/NotFound";
import { UserContext } from "./UserContext";
import Search from "./components/Search";

export default function App() {
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = React.useState(undefined);
  const [query, setQuery] = React.useState("");
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    async function getUser() {
      fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error("authentication failed");
        })
        .then((data) => {
          setUser(data.user);
        })
        .catch((err) => console.log(err));
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Header
          setMovies={setMovies}
          setError={setError}
          query={query}
          setQuery={setQuery}
        />
        <Search
          setMovies={setMovies}
          setError={setError}
          query={query}
          setQuery={setQuery}
          className="sm:hidden w-full px-4 mb-4"
        />
        <div className="2xl:px-72 xl:px-60 lg:px-28 md:px-8 px-4">
          <Routes>
            <Route path={routes.DASHBOARD} element={<Dashboard />} />
            <Route
              path="/search/:query"
              element={<MovieList movies={movies} error={error} />}
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
