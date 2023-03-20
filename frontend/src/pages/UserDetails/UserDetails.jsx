import React from "react";
import { useParams } from "react-router-dom";

import { calculateRating, formatRating } from "../../util/ratingsUtil";
import { findHighestRated, findLowestRated } from "../../util/findByRating";
import { Spinner } from "../../components/Spinner";
import ReviewCard from "../../components/ReviewCard";

export default function UserDetails() {
  const { id } = useParams();

  const [reviews, setReviews] = React.useState([]);
  const [userName, setUserName] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data[0].name);
        setAvatar(data[0].avatar);
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <UserCard avatar={avatar} name={userName} reviews={reviews} />
          <div className="text-2xl font-semibold mb-3">
            Reviews
            <span className="ml-2 bg-white rounded-full px-4 py-0.5 text-lg">
              {reviews.length}
            </span>
          </div>
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              isEditable={false}
              page="user"
            />
          ))}
        </>
      )}
    </>
  );
}

function UserCard({ avatar, name, reviews }) {
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
            <p className="text-sm text-gray-600">
              Total reviews:
              <span className="font-medium ml-1 text-black">
                {reviews.length}
              </span>
            </p>
            {reviews.length > 0 && (
              <>
                <p className="text-sm text-gray-600">
                  Average rating:
                  <span className="font-medium ml-1 text-black">
                    {formatRating(calculateRating(reviews))}
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
          <p className="text-sm text-gray-600">
            Total reviews:
            <span className="font-medium ml-1 text-black">
              {reviews.length}
            </span>
          </p>
          {reviews.length > 0 && (
            <>
              <p className="text-sm text-gray-600">
                Average rating:
                <span className="font-medium ml-1 text-black">
                  {formatRating(calculateRating(reviews))}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Highest rated:
                <span className="font-medium ml-1 text-black">
                  {findHighestRated(reviews)}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Lowest rated:
                <span className="font-medium ml-1 text-black">
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
