import express from "express";
import Person from "../../models/Person";
import routes from "../../routes";
import { ErrorJSON } from "../../middleware";

// Express router
const personRouter = express.Router();

// READ
personRouter.get(routes.list, async (req, res) => {
  const personList = await Person.find({});
  res.json({ person: personList });
});

personRouter.get(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const person = await Person.findById(id);
    res.json(person);
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

export default personRouter;
