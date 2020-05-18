import express from "express";
import routes from "../routes";
import personRouter from "./entityRouter/personRouter";
import projectRouter from "./entityRouter/projectRouter";
import clientRouter from "./entityRouter/clientRouter";
import { validateAPIKey } from "../middleware";
// import Person from "../models/Person";

// Express router
const apiRouter = express.Router();

// Entity Routers
apiRouter.use(routes.person, validateAPIKey, personRouter);
apiRouter.use(routes.client, validateAPIKey, clientRouter);
apiRouter.use(routes.project, validateAPIKey, projectRouter);

export default apiRouter;
