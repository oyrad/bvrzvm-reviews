import React from "react";

import ReactPaginate from "react-paginate";
import { Spinner } from "../../components/Spinner";
import ReviewCard from "../../components/ReviewCard";

export default function Dashboard() {
  const [recentReviews, setRecentReviews] = React.useState([]);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews`)
      .then((res) => res.json())
      .then((data) => setRecentReviews(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : recentReviews.length > 0 ? (
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
      ) : (
        <p>No reviews yet.</p>
      )}
    </>
  );
}

function Reviews({ recentReviews }) {
  return recentReviews.map((review) => (
    <ReviewCard review={review} isEditable={false} page="dashboard" />
  ));
}
