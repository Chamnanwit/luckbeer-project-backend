require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("../src/routes/auth-routh");
const beerRoute = require("../src/routes/beer-route");
const breweryRoute = require("../src/routes/brewery-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "too many requests" },
  })
);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/beer", beerRoute);
app.use("/brewery", breweryRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT || 8000, () =>
  console.log("server running on port " + process.env.PORT)
);
