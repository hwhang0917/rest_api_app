import express from "express";
import Report from "../../models/Report";
import Person from "../../models/Person";
import Project from "../../models/Project";
import routes from "../../routes";
import {
  ErrorJSON,
  SuccessJSON,
  projectExists,
  personExists,
} from "../../middleware";

const reportRouter = express.Router();

// CREATE
// Create report
reportRouter.post(routes.create(), projectExists, async (req, res) => {
  const {
    params: { id: projectId },
    body: { title, type, documentLink },
  } = req;
  let newReport;
  try {
    newReport = await Report.create({
      projectId,
      title,
      type,
      documentLink,
    });
    const project = await Project.findById({ _id: projectId });
    project.reportList.push(newReport._id);
    project.save();
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(ErrorJSON(400, "Failed to create report."));
  }
});

// Add contributors
reportRouter.post(
  `${routes.detail()}/add_contributor`,
  personExists,
  async (req, res) => {
    const {
      params: { id: report_id },
      query: { contributor_id: person_id },
    } = req;
    try {
      const report = await Report.findById({ _id: report_id });
      const person = await Person.findById({ _id: person_id });
      if (report.contributors.includes(person_id)) {
        // contributor already exists
        res.status(409);
        res.json(ErrorJSON(409, "Conflict! Resource already exists."));
      } else {
        report.contributors.push(person_id);
        report.save();
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
// Report list (/api/report/list?project_id=:id)
reportRouter.get(routes.list, async (req, res) => {
  const {
    query: { project_id },
  } = req;
  if (project_id) {
    // if client id specified
    try {
      const reportList = await Report.find({ projectId: project_id });
      res.status(200);
      res.json({
        projectId: project_id,
        reports: reportList,
        reportCount: reportList.length,
      });
    } catch (error) {
      res.status(404);
      res.json(
        ErrorJSON(404, "The resource you requested could not be found.")
      );
    }
  } else {
    // generic project list
    const reportList = await Report.find({});
    res.status(200);
    res.json({ reports: reportList, reportCount: reportList.length });
  }
});

// Read report by id (/api/report/:id)
projectRouter.get(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const report = await Report.findById(id);
    res.status(200);
    res.json(report);
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// UPDATE
// Update title
reportRouter.put(`${routes.detail()}/title`, async (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  try {
    await Report.findOneAndUpdate({ _id: id }, { title });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Update type
reportRouter.put(`${routes.detail()}/type`, async (req, res) => {
  const {
    params: { id },
    body: { type },
  } = req;
  try {
    await Report.findOneAndUpdate({ _id: id }, { type });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Update documentLink
reportRouter.put(`${routes.detail()}/document_link`, async (req, res) => {
  const {
    params: { id },
    body: { documentLink },
  } = req;
  try {
    await Report.findOneAndUpdate({ _id: id }, { documentLink });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// DELETE
reportRouter.delete(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Report.findOneAndDelete(id);
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully deleted"));
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

reportRouter.delete(
  `${routes.detail()}/remove_contributor`,
  personExists,
  async (req, res) => {
    const {
      params: { id: report_id },
      query: { contributor_id: person_id },
    } = req;
    try {
      const report = await Report.findById({ _id: report_id });
      if (report.contributors.includes(person_id)) {
        // contributor exists in array
        report.contributors.splice(
          // Remove contributor_id from contributors array
          report.contributors.findIndex((contributor) => {
            contributor === person_id;
          }),
          1
        );
        report.save();
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

export default reportRouter;
