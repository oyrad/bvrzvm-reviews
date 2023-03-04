export function calculateRating(reviews) {
  let rating = 0;
  if (reviews.length > 0) {
    reviews.forEach((rev) => (rating = rating + parseFloat(rev.rating)));
    rating = Math.round((rating / reviews.length) * 10) / 10;

    rating = `${rating}/10`;
  } else {
    rating = "-";
  }

  return rating;
}

export function getColorFromRating(rating) {
  let color;

  if (rating === 10) {
    color = "";
  } else if (rating >= 9) {
    color = "#0891b2";
  } else if (rating >= 8 && rating < 9) {
    color = "#16a34a";
  } else if (rating >= 7 && rating < 8) {
    color = "#4ade80";
  } else if (rating >= 6 && rating < 7) {
    color = "#facc15";
  } else if (rating >= 5 && rating < 6) {
    color = "#f97316";
  } else if (rating >= 3 && rating < 5) {
    color = "#dc2626";
  } else {
    color = "#991b1b";
  }

  return color;
}
