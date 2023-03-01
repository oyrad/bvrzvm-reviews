const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
        scope: ["profile"],
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, done) {
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
