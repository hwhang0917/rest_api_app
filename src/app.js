import express from "express";
import path from "path";
import helmet from "helmet";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import routes from "./routes";
import globalRouter from "./router/globalRouter";
import apiRouter from "./router/apiRouter";
import { localsMiddleware } from "./middleware";

const app = express();

const CookieStore = MongoStore(session);

// View Engine and Static
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

// Imported Middlewares
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(localsMiddleware);

app.use(routes.root, globalRouter);
app.use(routes.api, apiRouter);

export default app;
