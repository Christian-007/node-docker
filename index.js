const cors = require("cors");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const redis = require("redis");

const { 
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORTS,
  MONGO_USER,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORTS}/?authSource=admin`;
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, mongoConfig)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => {
      console.log('Error connecting to MongoDB: ', err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Express setup behind proxy (Nginx)
app.enable("trust proxy");

// Enable cors
app.use(cors({}));

// Setup redis
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000,
  },
}));

// To enable express read from req.body
app.use(express.json());

app.get("/api/v1", (_, res) => {
  res.send("<h2>Hi abc there!!!</h2>");
  console.log("yeah it ran");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
