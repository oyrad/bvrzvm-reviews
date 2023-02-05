import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../../api/paths";
import { dateFormatter } from "../../util/dateFormatter";

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
          className="rounded-lg shadow bg-white flex flex-col mb-4 cursor-pointer"

        >
          <div className="flex">
            <div className="relative center text-white">
              <img src={review.avatar} alt="avatar" className="rounded-l-lg w-28 opacity-60" />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-shadow">{review.rating}</p>
            </div>
            <div className="flex flex-col justify-center p-4" onClick={() => navigate(routes.MOVIE(review.movieId))}>
              <p className="text-xl">
                <span className="font-semibold">{review.movieName}</span> (
                {review.movieYear})
              </p>
              <p className="text-xs text-gray-500 italic">{review.createdAt === review.updatedAt ? dateFormatter(review.createdAt) : <span>Edited: {dateFormatter(review.updatedAt)}</span>} by {review.user}</p>
              {review.description && <p className="mt-2">{review.description}</p>}
            </div>
          </div>
        </div>
      ))
      }
    </>
  );
}
