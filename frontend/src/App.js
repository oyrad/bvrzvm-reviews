import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MoviesList from "./pages/MovieList/MoviesList";

import Dashboard from "./pages/Dashboard/Dashboard";
import { routes } from "./api/paths";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import { UserContext } from "./UserContext";

export default function App() {
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = React.useState(undefined);
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
        <Header setMovies={setMovies} setError={setError} />
        <div className="px-80">
          <Routes>
            <Route path={routes.DASHBOARD} element={<Dashboard />} />
            <Route
              path="/search/:query"
              element={<MoviesList movies={movies} error={error} />}
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
