const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:
          process.env.NODE_ENV === "production"
            ? "https://bvrzvm-reviews-api.cyclic.app/auth/google/callback"
            : "/auth/google/callback",
        scope: ["profile", "email"],
        proxy: true,
      },
      async function (accessToken, refreshToken, profile, done) {
        User.find({ userId: profile.id }, (err, user) => {
          if (err) {
            console.log(err);
          }
          if (!user.length) {
            User.create({
              name: profile.displayName,
              userId: profile.id,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            });
          }
        });
        return done(null, profile);
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
