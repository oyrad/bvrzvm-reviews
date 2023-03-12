import React from "react";

import ReactPaginate from "react-paginate";
import { Spinner } from "../../components/Spinner";
import ReviewCard from "../../components/ReviewCard";

export default function Dashboard() {
  const [recentReviews, setRecentReviews] = React.useState([]);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reviews`, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CLIENT_URL,
      },
    })
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
      ) : (
        <>
          <div className="text-2xl font-semibold mb-3">
            Recent reviews
            <span className="ml-2 bg-white rounded-full px-4 py-0.5 text-lg">
              {recentReviews.length}
            </span>
          </div>
          {recentReviews.length > 0 ? (
            <>
              <Reviews recentReviews={currentItems} />
              {recentReviews.length > 10 && (
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
              )}
            </>
          ) : (
            <div className="text-xl mb-8 bg-white px-4 py-3 rounded-xl">
              No recent reviews.
            </div>
          )}
        </>
      )}
    </>
  );
}

function Reviews({ recentReviews }) {
  return recentReviews.map((review) => (
    <ReviewCard
      key={review._id}
      review={review}
      isEditable={false}
      page="dashboard"
    />
  ));
}
