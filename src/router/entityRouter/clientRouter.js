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
    newClient = await Client.create({
      name,
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(ErrorJSON(400, "Failed to create client."));
  }
  console.log("✔ Client Created");
  console.log(newClient);
  res.status(200);
  res.json(SuccessJSON(200, "Client successfully created."));
});

// READ
clientRouter.get(routes.list, async (req, res) => {
  const clientList = await Client.find({});
  res.status(200);
  res.json({ person: clientList });
});

clientRouter.get(routes.detail(), async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const client = await Client.findById(id);
    res.status(200);
    res.json(client);
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
});

// UPDATE

// DELETE

export default clientRouter;
