const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");

const port = process.env.PORT || 4420;

require("./config/passport")(passport);

connectDB();
const app = express();

app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["darx"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    "X-Forwarded-Proto":
      process.env.NODE_ENV === "development" ? "http" : "https",
  })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/auth", require("./routes/auth"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}.`));
