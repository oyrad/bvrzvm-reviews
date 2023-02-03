import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MoviesList from "./pages/MovieList/MoviesList";

import Dashboard from "./pages/Dashboard/Dashboard";
import { routes } from "./api/paths";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

export default function App() {
  const [movies, setMovies] = React.useState([]);
  const [error, setError] = React.useState(undefined);

  return (
    <>
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
    </>
  );
}
