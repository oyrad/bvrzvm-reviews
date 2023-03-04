const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
require("./config/passport")(passport);

const port = process.env.PORT || 4420;

connectDB();
const app = express();

app.set("trust proxy", 1);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 100,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
}

app.get("/", (req, res) => res.sendStatus(200));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

app.listen(port, () => console.log(`Server running on port ${port}.`));
