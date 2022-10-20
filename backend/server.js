import express from "express";
import http from "http";
import session from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import { port, hostname, localClientURL, mongoUrl } from "./config/index.js";

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import foodRouter from "./routes/food.js";
import chartRouter from "./routes/chart.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: localClientURL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.APP_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 1 semaine
    // },
  })
);

app.use(express.json());

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // options qui évitent des warnings inutiles
  })
  .then(init)
  .catch((err) => console.log(err));

async function init() {
  app.get("/", (_, res) => {
    res.send("Hello World !");
  });

  app.use("/auth/", authRouter);
  app.use("/post/", postRouter);
  app.use("/foods/", foodRouter);
  app.use("/chart/", chartRouter);
  app.use("/images", express.static(path.join(__dirname, "images")));
}

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`App listening at http://${hostname}:${port}`);
});
