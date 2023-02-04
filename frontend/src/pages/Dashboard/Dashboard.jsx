import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../../api/paths";

export default function Dashboard({ setMovies }) {
  const [recentReviews, setRecentReviews] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getRecentReviews() {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setRecentReviews(data);
    }
    getRecentReviews();
  }, []);

  return (
    <>
      <div className="text-2xl font-semibold mb-4">Recent reviews</div>
      {recentReviews.map((review) => (
        <div
          key={review._id}
          className="rounded-lg shadow bg-white flex flex-col mb-4 p-4 cursor-pointer"
          onClick={() => navigate(routes.MOVIE(review.movieId))}
        >
          <p className="text-lg font-semibold">
            {review.movieName}
            <span className="font-normal ml-1">({review.movieYear})</span>
          </p>
          <p className="text-sm mb-2">{review.createdAt.split("T")[0]}</p>
          <p>{review.name}</p>
          <p>{review.rating}/10</p>
          <p>{review.description}</p>
        </div>
      ))}
    </>
  );
}