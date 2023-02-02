import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import MoviesList from "./pages/MovieList/MoviesList";

import Dashboard from "./pages/Dashboard/Dashboard";
import { routes } from "./api/paths";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

export default function App() {
  const [movies, setMovies] = React.useState([]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="px-80">
          <Routes>
            <Route
              path={routes.DASHBOARD}
              element={<Dashboard setMovies={setMovies} />}
            />
            <Route
              path="/search/:query"
              element={<MoviesList movies={movies} setMovies={setMovies} />}
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
