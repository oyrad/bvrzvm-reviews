import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { routes } from "../../api/paths";
import { calculateRating } from "../../util/ratingsUtil";
import { findHighestRated, findLowestRated } from "../../util/findByRating";
import { UserContext } from "../../UserContext";
import { getColorFromRating } from "../../util/ratingsUtil";
import { Spinner } from "../../components/Spinner";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [hasNoReviews, setHasNoReviews] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setHasNoReviews(true);
        } else {
          setReviews(data);
          setUserName(data[0].user);
          setAvatar(data[0].avatar);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : hasNoReviews ? (
        <UserCard
          avatar={user.photos[0].value}
          name={user.displayName}
          reviews={reviews}
          showRatings={false}
        />
      ) : (
        <>
          <UserCard
            avatar={avatar}
            name={userName}
            reviews={reviews}
            showRatings
          />
          <div className="text-2xl font-semibold mb-3">
            {user.name.givenName}'s reviews
            <span className="ml-2 bg-white rounded-full px-4 py-0.5 text-lg">
              {reviews.length}
            </span>
          </div>
          {reviews.map((review) => (
            <div
              className={`bg-white rounded md:rounded-lg flex items-center mb-4 cursor-pointer shadow border-l-4 md:border-none ${
                review.rating === 10 &&
                "gradient-border border-none bg-transparent pl-1 md:pl-0"
              }`}
              onClick={() => navigate(routes.MOVIE(review.movieId))}
              style={{ borderColor: getColorFromRating(review.rating) }}
              key={review._id}
            >
              <div
                className={`hidden md:block min-w-[8rem] max-w-[8rem] relative center text-white bg-black hover:bg-gray-700 transition rounded-l-lg border-r-4 ${
                  review.rating === 10 && "border-none"
                }`}
                style={{ borderColor: getColorFromRating(review.rating) }}
              >
                <img
                  src={review.moviePoster}
                  alt="poster"
                  className="rounded-l-lg opacity-60"
                />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-shadow">
                  {review.rating}
                </p>
              </div>
              <div className={`p-4 ${review.rating === 10 && "pl-5"}`}>
                <div className="flex items-center">
                  <p className="ml-1 mr-4 text-4xl md:hidden">
                    {review.rating}
                  </p>
                  <div>
                    <p className="text-xl">
                      <span className="font-semibold">{review.movieName}</span>{" "}
                      ({review.movieYear})
                    </p>
                    <p
                      className={`text-xs italic ${
                        review.rating === 10 ? "text-white" : "text-gray-500"
                      }`}
                    >
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
                  </div>
                </div>
                {review.description && (
                  <p className="mt-2 text-sm xl:pr-4  break-all">
                    {review.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}

function UserCard({ avatar, name, reviews, showRatings }) {
  return (
    <>
      <div className="md:hidden flex flex-col items-start mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center">
          <img
            src={avatar}
            alt="avatar"
            className="rounded-l-lg w-24 mr-4"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-xl font-semibold">{name}</p>
            <p className="text-sm">
              Total reviews:
              <span className="font-medium ml-1">{reviews.length}</span>
            </p>
            {showRatings && (
              <>
                <p className="text-sm">
                  Average rating:
                  <span className="font-medium ml-1">
                    {calculateRating(reviews)}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden m bg-white rounded-lg md:flex items-center mb-6 shadow">
        <img
          src={avatar}
          alt="avatar"
          className="rounded-l-lg w-36"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col p-4">
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-sm">
            Total reviews:
            <span className="font-medium ml-1">{reviews.length}</span>
          </p>
          {showRatings && (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
