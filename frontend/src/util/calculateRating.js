export function calculateRating(reviews) {
  console.log(reviews);
  let rating = 0;
  if (reviews.length > 0) {
    reviews.forEach((rev) => (rating = rating + parseFloat(rev.rating)));
    console.log(rating);
    rating = Math.round((rating / reviews.length) * 10) / 10;

    rating = `${rating}/10`;
  } else {
    rating = "-";
  }

  return rating;
}
