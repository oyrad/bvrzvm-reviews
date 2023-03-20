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
    moviePoster: req.body.moviePoster,
    rating: req.body.rating,
    description: req.body.description,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
  });

  res.status(200).json(review);
});

const updateReview = asyncHandler(async (req, res) => {
  const currentReview = await Review.findById(req.body._id);

  let areRatingsChanged = false;
  if (
    currentReview.likes.length !== req.body.likes.length ||
    currentReview.dislikes.length !== req.body.dislikes.length
  ) {
    areRatingsChanged = true;
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, timestamps: !areRatingsChanged }
  );

  res.status(200).json(updatedReview);
});

const deleteReview = asyncHandler(async (req, res) => {
  const deletedReview = await Review.deleteOne({ _id: req.params.id });

  res.status(200).json(deletedReview);
});

const getReviewsByMovieId = asyncHandler(async (req, res) => {
  const reviewsById = await Review.find({ movieId: req.params.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(reviewsById);
});

const getReviewsByUser = asyncHandler(async (req, res) => {
  const reviewsByUser = await Review.find({
    userId: req.params.userId,
  }).sort({ createdAt: -1 });

  res.status(200).json(reviewsByUser);
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
  getReviewsByUser,
};
