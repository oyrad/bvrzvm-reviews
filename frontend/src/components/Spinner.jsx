import React from "react";

import ClipLoader from "react-spinners/ClipLoader";

export function Spinner({ isLoading }) {
  const [hasTimePassed, setHasTimePassed] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setHasTimePassed(true), 500);
  }, []);

  return (
    <>
      {hasTimePassed && (
        <div className="flex justify-center items-center h-[70vh] sm:h-[80vh]">
          <ClipLoader loading={isLoading} size={100} />
        </div>
      )}
    </>
  );
}
