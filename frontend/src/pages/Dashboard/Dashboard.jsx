import React from "react";

import { useNavigate } from "react-router-dom";

import { routes } from "../../api/paths";
import ReactPaginate from "react-paginate";
import { getColorFromRating } from "../../util/ratingsUtil";

export default function Dashboard() {
  const [recentReviews, setRecentReviews] = React.useState([]);
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setRecentReviews(data))
      .catch((err) => console.log(err));
  }, []);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = recentReviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(recentReviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % recentReviews.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="text-2xl font-semibold mb-4">Recent reviews</div>
      <Reviews recentReviews={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-gray-500 -ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        }
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-gray-500 -mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex space-x-3 md:space-x-6 justify-center items-center mb-4 bg-white rounded-lg p-2 text-lg"
        activeClassName="font-bold"
        pageClassName="hover:text-gray-500"
      />
    </>
  );
}

function Reviews({ recentReviews }) {
  const navigate = useNavigate();
  return recentReviews.map((review) => (
    <div
      key={review._id}
      className="rounded md:rounded-lg shadow bg-white flex flex-col mb-4 cursor-pointer border-l-4 md:border-none"
      style={{ borderColor: getColorFromRating(review.rating) }}
    >
      <div className="flex">
        <div
          className="hidden md:block md:relative center text-white bg-black hover:bg-gray-600 md:rounded-l-lg border-r-4 transition"
          onClick={() => navigate(routes.USER(review.userId))}
          style={{ borderColor: getColorFromRating(review.rating) }}
        >
          <img
            src={review.avatar}
            alt="avatar"
            className="md:w-36 lg:w-32 max-w-[10rem] rounded-l-lg opacity-70"
            referrerPolicy="no-referrer"
          />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-shadow">
            {review.rating}
          </p>
        </div>
        <div
          className="flex flex-col justify-center p-4"
          onClick={() => navigate(routes.MOVIE(review.movieId))}
        >
          <div className="flex md:flex-col md:items-start items-center">
            <p className="ml-1 mr-4 text-4xl md:hidden">{review.rating}</p>
            <div>
              <p className="text-lg md:text-xl">
                <span className="font-semibold">{review.movieName}</span> (
                {review.movieYear})
              </p>
              <p className="text-xs text-gray-500 italic">
                {review.user} -&nbsp;
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
            {review.description && (
              <p className="mt-2 text-sm hidden md:block break-all">
                {review.description}
              </p>
            )}
          </div>
        </div>
      </div>
      {review.description && (
        <p className="text-sm p-4 pt-0 block md:hidden break-all">
          {review.description}
        </p>
      )}
    </div>
  ));
}
