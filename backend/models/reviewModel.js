const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    movieYear: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please add your rating."],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
