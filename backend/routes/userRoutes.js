const express = require("express");
const router = express.Router();
const { getUsers, getUserById } = require("../controllers/userController");

router.route("/").get(getUsers);
router.route("/:userId").get(getUserById);

module.exports = router;
