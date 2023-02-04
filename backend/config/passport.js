const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "995845954224-h3fj04s8llt46let5u70lkcrfg7c1771.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "/auth/google/callback",
        scope: ["profile"],
      },
      async function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
