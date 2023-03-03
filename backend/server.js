const express = require("express");
const expressSession = require("express-session");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

const port = process.env.PORT || 4420;

require("./config/passport")(passport);

connectDB();
const app = express();

app.set("trust proxy", 1);

app.use(express.json());

//app.use(cookieParser());
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
    keys: ["darx"],
    maxAge: 24 * 60 * 60 * 100,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/auth", require("./routes/auth"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}.`));
