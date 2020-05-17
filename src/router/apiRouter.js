import express from "express";
import routes from "../routes";

// Express router
const apiRouter = express.Router();

apiRouter.get(routes.root, (req, res) => {
  res.render("api");
});

export default apiRouter;
