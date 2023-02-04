const asyncHandler = require("express-async-handler");

const Review = require("../models/reviewModel");

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });

  res.status(200).json(reviews);
});

const postReview = asyncHandler(async (req, res) => {
  if (!req.body.rating) {
    res.status(400);
    throw new Error("Please add a rating to your review.");
  }

  const review = await Review.create({
    user: req.body.user,
    userId: req.body.userId,
    avatar: req.body.avatar,
    movieId: req.body.movieId,
    movieName: req.body.movieName,
    movieYear: req.body.movieYear,
    rating: req.body.rating,
    description: req.body.description,
  });

  res.status(200).json(review);
});

const updateReview = asyncHandler(async (req, res) =>
  res.status(200).json({ message: `Update review ${req.params.id}` })
);

const deleteReview = asyncHandler(async (req, res) =>
  res.status(200).json({ message: `Delete review ${req.params.id}` })
);

const getReviewsByMovieId = asyncHandler(async (req, res) => {
  const reviewsById = await Review.find({ movieId: req.params.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(reviewsById);
});

const getReviewByMovieIdAndUser = asyncHandler(async (req, res) => {
  const reviewByIdAndUser = await Review.find({
    movieId: req.params.movieId,
    userId: req.params.userId,
  });

  res.status(200).json(reviewByIdAndUser);
});

module.exports = {
  getReviews,
  postReview,
  updateReview,
  deleteReview,
  getReviewsByMovieId,
  getReviewByMovieIdAndUser,
};