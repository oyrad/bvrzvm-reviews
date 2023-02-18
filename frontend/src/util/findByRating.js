export function findHighestRated(reviews) {
  let highestRating = 0;
  let movieName = "";
  let movieYear = "";
  reviews.forEach((rev) => {
    if (rev.rating > highestRating) {
      movieName = rev.movieName;
      movieYear = rev.movieYear;
      highestRating = rev.rating;
    }
  });

  return `${movieName} (${movieYear})`;
}

export function findLowestRated(reviews) {
  let lowestRating = 10;
  let movieName = "";
  let movieYear = "";
  reviews.forEach((rev) => {
    if (rev.rating < lowestRating) {
      movieName = rev.movieName;
      movieYear = rev.movieYear;
      lowestRating = rev.rating;
    }
  });
  return `${movieName} (${movieYear})`;
}
