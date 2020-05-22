import express from "express";
import Person from "../models/Person";
import { createAPIKey } from "./entityRouter/personRouter";
import Employee from "../models/Employee";
import routes from "../routes";

// Express router
const globalRouter = express.Router();

globalRouter.get(routes.root, (req, res) => {
  res.render("landing");
});

globalRouter.get(routes.api, (req, res) => {
  res.render("api");
});

globalRouter.get(routes.admin, (req, res) => {
  res.render("admin");
});

// Login
globalRouter.post(routes.login, (req, res) => {});

// Signup
globalRouter.get(routes.signup, (req, res) => {
  res.render("signup");
});

globalRouter.post(routes.signup, async (req, res) => {
  const {
    body: { name, position, contact, username, password, apiKey, employee },
  } = req;
  try {
    const apiUser = await Person.findOne({ apiKey: apiKey });
    if (!apiUser.admin) {
      res.status(403);
      res.render("APIError");
    }
  } catch (error) {
    res.status(403);
    res.render("APIError");
  }
  const newAPI = createAPIKey(username);
  if (employee) {
    const newUser = await Employee({
      name,
      position,
      contact,
      username,
      apiKey: newAPI,
      employee: true,
    });
    await Employee.register(newUser, password);
  } else {
    const newUser = await Person({
      name,
      position,
      contact,
      username,
      apiKey: newAPI,
      employee: false,
    });
    await Person.register(newUser, password);
  }
  res.status(200);
  res.redirect("api");
});

// Create Test Admin User
globalRouter.post("/create_test", (req, res) => {
  Person.create({
    name: "John Doe",
    position: "admin",
    contact: "johndoe@admin.com",
    username: "admin",
    admin: true,
    apiKey: "test1234",
  });
  res.send("success");
});

export default globalRouter;
