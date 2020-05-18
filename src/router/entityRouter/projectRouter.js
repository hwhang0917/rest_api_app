import express from "express";
import Project from "../../models/Project";
import routes from "../../routes";
import { ErrorJSON, SuccessJSON } from "../../middleware";

// Express router
const projectRouter = express.Router();

// CREATE
projectRouter.post(routes.root)

// READ

// UPDATE

// DELETE

export default projectRouter;
