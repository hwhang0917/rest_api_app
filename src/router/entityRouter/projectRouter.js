import express from "express";
import Client from "../../models/Client";
import Project from "../../models/Project";
import routes from "../../routes";
import {
  ErrorJSON,
  SuccessJSON,
  clientExists,
  personExists,
} from "../../middleware";

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

  const client = await Client.findById(requestedClient);
  client.requestedProjects.push(newProject._id);
  client.save();
  console.log("✔ Project added client's requetesd project array");

  console.log("✔ Project Created");
  console.log(newProject);
  res.status(200);
  res.json(SuccessJSON(200, "Project successfully created."));
});

// Add contributors
projectRouter.post(
  `${routes.detail()}/add_contributor`,
  personExists,
  async (req, res) => {
    const {
      params: { id: project_id },
      query: { contributor_id: person_id },
    } = req;
    try {
      const project = await Project.findById({ _id: project_id });
      if (project.contributors.includes(person_id)) {
        // contributor already exists
        res.status(409);
        res.json(ErrorJSON(409, "Conflict! Resource already exists."));
      } else {
        project.contributors.push(person_id);
        project.save();
        res.status(200);
        res.json(SuccessJSON(200, "Resourece successfully updated"));
      }
    } catch (error) {
      console.log(error);
      res.status(404);
      res.json(
        ErrorJSON(404, "The resource you requested could not be found.")
      );
    }
  }
);

// READ
// Project list (/api/project/list?client_id=:id)
projectRouter.get(routes.list, async (req, res) => {
  const {
    query: { client_id },
  } = req;
  if (client_id) {
    // if client id specified
    try {
      const projectList = await Project.find({ requestedClient: client_id });
      res.status(200);
      res.json({
        requested_client: client_id,
        projects: projectList,
        projectCount: projectList.length,
      });
    } catch (error) {
      res.status(404);
      res.json(
        ErrorJSON(404, "The resource you requested could not be found.")
      );
    }
  } else {
    // generic project list
    const projectList = await Project.find({});
    res.status(200);
    res.json({ projects: projectList, projectCount: projectList.length });
  }
});

// Read project by id (/api/project/:id)
projectRouter.get(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const project = await Project.findById(id);
    res.status(200);
    res.json(project);
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// UPDATE
// Update title
projectRouter.put(`${routes.detail()}/title`, async (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  try {
    await Project.findOneAndUpdate({ _id: id }, { title });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Update budget
projectRouter.put(`${routes.detail()}/budget`, async (req, res) => {
  const {
    params: { id },
    body: { budget },
  } = req;
  try {
    await Project.findOneAndUpdate({ _id: id }, { budget });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Finish project
projectRouter.put(`${routes.detail()}/finish`, async (req, res) => {
  const {
    params: { id },
  } = req;
  let finProject;
  try {
    finProject = await Project.findById({ _id: id });
    finProject.finishedDate = Date.now();
    finProject.save();
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// DELETE
projectRouter.delete(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Project.findOneAndDelete(id);
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully deleted"));
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

projectRouter.delete(
  `${routes.detail()}/remove_contributor`,
  personExists,
  async (req, res) => {
    const {
      params: { id: project_id },
      query: { contributor_id: person_id },
    } = req;
    try {
      const project = await Project.findById({ _id: project_id });
      if (project.contributors.includes(person_id)) {
        // contributor exists in array
        project.contributors.splice(
          // Remove contributor_id from contributors array
          project.contributors.findIndex((contributor) => {
            contributor === person_id;
          }),
          1
        );
        project.save();
        res.status(200);
        res.json(SuccessJSON(200, "Resourece successfully deleted"));
      } else {
        res.status(404);
        res.json(
          ErrorJSON(404, "The resource you requested could not be found.")
        );
      }
    } catch (error) {
      console.log(error);
      res.status(404);
      res.json(
        ErrorJSON(404, "The resource you requested could not be found.")
      );
    }
  }
);

export default projectRouter;
