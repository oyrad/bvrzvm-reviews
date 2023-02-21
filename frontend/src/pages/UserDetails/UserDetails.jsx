import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../api/paths";
import { calculateRating } from "../../util/ratingsUtil";
import { findHighestRated, findLowestRated } from "../../util/findByRating";
import { UserContext } from "../../UserContext";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [hasNoReviews, setHasNoReviews] = React.useState(false);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(`/api/reviews/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          return setHasNoReviews(true);
        }
        setReviews(data);
        setUserName(data[0].user);
        setAvatar(data[0].avatar);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log(user);

  if (hasNoReviews) {
    return (
      <div className="bg-white rounded-lg flex items-center mb-6 shadow">
        <img
          src={user.photos[0].value}
          alt="avatar"
          className="rounded-l-lg w-36"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col p-4">
          <p className="text-xl font-semibold">{user.displayName}</p>
          <p className="text-sm">
            Total reviews:
            <span className="font-medium ml-1">{reviews.length}</span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="bg-white rounded-lg flex items-center mb-6 shadow">
          <img src={avatar} alt="avatar" className="rounded-l-lg w-36" />
          <div className="flex flex-col p-4">
            <p className="text-xl font-semibold">{userName}</p>
            <p className="text-sm">
              Total reviews:
              <span className="font-medium ml-1">{reviews.length}</span>
            </p>
            <p className="text-sm">
              Average rating:
              <span className="font-medium ml-1">
                {calculateRating(reviews)}
              </span>
            </p>
            <p className="text-sm">
              Highest rated:
              <span className="font-medium ml-1">
                {findHighestRated(reviews)}
              </span>
            </p>
            <p className="text-sm">
              Lowest rated:
              <span className="font-medium ml-1">
                {findLowestRated(reviews)}
              </span>
            </p>
          </div>
        </div>
        <p className="text-2xl font-semibold mb-4">Reviews</p>
        {reviews.map((review) => (
          <div
            className="bg-white rounded-lg flex items-center mb-4 cursor-pointer shadow"
            onClick={() => navigate(routes.MOVIE(review.movieId))}
            key={review._id}
          >
            <div className="max-w-[7rem] relative center text-white bg-black rounded-l-lg">
              <img
                src={review.moviePoster}
                alt="poster"
                className="rounded-l-lg opacity-60"
              />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-shadow">
                {review.rating}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xl">
                <span className="font-semibold">{review.movieName}</span> (
                {review.movieYear})
              </p>
              <p className="text-xs text-gray-500 italic">
                {review.createdAt === review.updatedAt ? (
                  new Date(review.createdAt)
                    .toLocaleString("hr-HR")
                    .substring(0, 19)
                ) : (
                  <span>
                    Edited:{" "}
                    {new Date(review.updatedAt)
                      .toLocaleString("hr-HR")
                      .substring(0, 19)}
                  </span>
                )}
              </p>
              {review.description && (
                <p className="mt-2 text-sm xl:pr-4">{review.description}</p>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }
}
