export function calculateRating(reviews) {
  console.log(reviews);
  let rating = 0;
  if (reviews.length > 0) {
    reviews.forEach((rev) => (rating = rating + parseInt(rev.rating)));
    console.log(rating);
    rating = rating / reviews.length;

    rating = `${rating}/10`;
  } else {
    rating = "-";
  }

  return rating;
}
