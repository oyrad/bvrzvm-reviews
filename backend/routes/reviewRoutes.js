const express = require("express");
const router = express.Router();
const {
  getReviews,
  postReview,
  updateReview,
  deleteReview,
  getReviewsByMovieId,
  getReviewByMovieIdAndUser,
} = require("../controllers/reviewController");

router.route("/").get(getReviews).post(postReview);
router
  .route("/:id")
  .get(getReviewsByMovieId)
  .put(updateReview)
  .delete(deleteReview);
router.route("/:userId/:movieId").get(getReviewByMovieIdAndUser);

module.exports = router;
