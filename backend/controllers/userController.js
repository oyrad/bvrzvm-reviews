const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.find({
    userId: req.params.id,
  });

  res.status(200).json(user);
});

module.exports = {
  getUsers,
  getUserById,
};
