import express from "express";
import Project from "../../models/Project";
import routes from "../../routes";
import { ErrorJSON, SuccessJSON, clientExists } from "../../middleware";

// Express router
const projectRouter = express.Router();

// CREATE
projectRouter.post(routes.create(), clientExists, async (req, res) => {
  const {
    params: { id: requestedClient },
    body: { title, budget },
  } = req;
  let newProject;
  try {
    newProject = await Project.create({
      requestedClient,
      title,
      budget,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(ErrorJSON(400, "Failed to create project."));
  }
  console.log("✔ Project Created");
  console.log(newProject);
  res.status(200);
  res.json(SuccessJSON(200, "Project successfully created."));
});

// READ

// UPDATE

// DELETE

export default projectRouter;
