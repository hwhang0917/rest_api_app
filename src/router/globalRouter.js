import express from "express";
import routes from "../routes";

// Express router
const globalRouter = express.Router();

globalRouter.get(routes.root, (req, res) => {
  res.render("landing");
});

globalRouter.get(routes.admin, (req, res) => {
  res.render("admin");
});

export default globalRouter;
