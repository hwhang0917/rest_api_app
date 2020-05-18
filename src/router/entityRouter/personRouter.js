import express from "express";
import * as CryptoJS from "crypto-js";
import Person from "../../models/Person";
import Employee from "../../models/Employee";
import Expert from "../../models/Expert";
import routes from "../../routes";
import { ErrorJSON, SuccessJSON } from "../../middleware";

// Express router
const personRouter = express.Router();

const createAPIKey = (admin) => {
  if (admin) {
    return CryptoJS.SHA256(Date.now().toString()).toString();
  } else {
    return null;
  }
};
// CREATE
personRouter.post(routes.root, async (req, res) => {
  const {
    body: {
      name,
      position,
      contact,
      employee,
      username,
      admin,
      expertese,
      startDate,
    },
  } = req;
  let newPerson;
  let apiKey = createAPIKey(admin);
  try {
    if (employee) {
      newPerson = await Employee.create({
        name,
        position,
        contact,
        employee,
        username,
        admin,
        startDate,
        apiKey,
      });
    } else if (expertese) {
      newPerson = await Expert.create({
        name,
        position,
        contact,
        employee: false,
        expertese,
      });
    } else {
      newPerson = await Person.create({
        name,
        position,
        contact,
        employee: false,
        username,
        admin,
        apiKey,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(409);
    res.json(ErrorJSON(409, "Conflict! Resource already exists."));
  } finally {
    console.log("✔ Person Created");
    console.log(newPerson);
    res.status(200);
    res.json(SuccessJSON(200, "User successfully created."));
  }
});

// READ
personRouter.get(routes.list, async (req, res) => {
  const personList = await Person.find({});
  res.status(200);
  res.json({ person: personList });
});

personRouter.get(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const person = await Person.findById(id);
    res.status(200);
    res.json(person);
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// UPDATE

// DELETE
personRouter.delete(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Person.findOneAndDelete(id);
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully deleted"));
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

export default personRouter;
