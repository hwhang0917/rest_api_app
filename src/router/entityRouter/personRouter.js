import express from "express";
import * as CryptoJS from "crypto-js";
import Person from "../../models/Person";
import Employee from "../../models/Employee";
import Expert from "../../models/Expert";
import routes from "../../routes";
import {
  ErrorJSON,
  SuccessJSON,
  checkAdmin,
  usernameExists,
} from "../../middleware";

// Express router
const personRouter = express.Router();

export const createAPIKey = (username) => {
  if (username) {
    return CryptoJS.SHA256(username).toString();
  } else {
    return null;
  }
};
// CREATE
personRouter.post(routes.root, checkAdmin, usernameExists, async (req, res) => {
  const {
    body: { name, position, contact, employee, username, expertese, startDate },
  } = req;
  let newPerson;
  let apiKey = createAPIKey(username);
  try {
    if (employee) {
      newPerson = await Employee.create({
        name,
        position,
        contact,
        employee,
        username,
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
  res.json({ people: personList, personCount: personList.length });
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
// Update name
personRouter.put(`${routes.detail()}/name`, async (req, res) => {
  const {
    params: { id },
    body: { name },
  } = req;
  try {
    await Person.findOneAndUpdate({ _id: id }, { name });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Update position
personRouter.put(`${routes.detail()}/position`, async (req, res) => {
  const {
    params: { id },
    body: { position },
  } = req;
  try {
    await Person.findOneAndUpdate({ _id: id }, { position });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Update contact
personRouter.put(`${routes.detail()}/contact`, async (req, res) => {
  const {
    params: { id },
    body: { contact },
  } = req;
  try {
    await Person.findOneAndUpdate({ _id: id }, { contact });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Update username
personRouter.put(`${routes.detail()}/username`, async (req, res) => {
  const {
    params: { id },
    body: { username },
  } = req;
  try {
    await Person.findOneAndUpdate({ _id: id }, { username });
    res.status(200);
    res.json(SuccessJSON(200, "Resourece successfully updated"));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// Toggle admin
personRouter.put(`${routes.detail()}/admin`, checkAdmin, async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    // Bitwise flip / toggle
    await Person.findOneAndUpdate({ _id: id }, { $bit: { admin: { xor: 1 } } });
    res.status(200);
    res.json(SuccessJSON(200, "Toggled admin switch."));
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

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
