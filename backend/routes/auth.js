const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_URL
        : process.env.DEVELOPMENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Log in success.",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(403).json({ error: true, message: "Not authorized." });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Failed to log in.",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(
    process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_URL
      : process.env.DEVELOPMENT_URL
  );
});

module.exports = router;
