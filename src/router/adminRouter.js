import express from "express";
import Person from "../models/Person";
import Project from "../models/Project";
import Client from "../models/Client";
import Report from "../models/Report";
import { onlyPrivate, onlyPublic, onlyAdmin } from "../middleware";
import routes from "../routes";

// Express router
const adminRouter = express.Router();

adminRouter.get(routes.root, async (req, res) => {
  const {
    query: { category },
  } = req;
  if (category === "person" || !category) {
    const people = await Person.find({}).sort({ _id: -1 });
    res.render("admin", { people });
  } else if (category === "project") {
    const projects = await Project.find({}).sort({ _id: -1 });
    res.render("admin", { projects });
  } else if (category === "client") {
    const clients = await Client.find({}).sort({ _id: -1 });
    res.render("admin", { clients });
  } else if (category === "report") {
    const reports = await Report.find({}).sort({ _id: -1 });
    res.render("admin", { reports });
  }
});

export default adminRouter;
