import express from "express";
import Client from "../../models/Client";
import routes from "../../routes";
import { ErrorJSON, SuccessJSON } from "../../middleware";

// Express router
const clientRouter = express.Router();

// CREATE
clientRouter.post(routes.root, async (req, res) => {
  const {
    body: { name, contact },
  } = req;
  let newClient;
  try {
    newClient = await new Client.create({
      name,
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(409);
    res.json(ErrorJSON(409, "Conflict! Resource already exists."));
  }
  console.log("✔ Client Created");
  console.log(newClient);
  res.status(200);
  res.json(SuccessJSON(200, "Client successfully created."));
});

// READ

// UPDATE

// DELETE

export default clientRouter;
