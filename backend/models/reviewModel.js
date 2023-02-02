const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    movieYear: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "Please add your rating."],
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
