import express from "express";
import routes from "../routes";
import personRouter from "./entityRouter/personRouter";
import { validateAPIKey } from "../middleware";
// import Person from "../models/Person";

// Express router
const apiRouter = express.Router();

// Entity Routers
apiRouter.use(routes.person, validateAPIKey, personRouter);

export default apiRouter;
