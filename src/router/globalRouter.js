import express from "express";
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

globalRouter.get(routes.signup, (req, res) => {
  res.render("signup");
});

// Create Test Admin User
globalRouter.post("/create_test", (req, res) => {
  Employee.create({
    name: "John Doe",
    position: "admin",
    contact: "johndoe@admin.com",
    employee: true,
    username: "admin",
    admin: true,
    apiKey: "test1234",
  });
  res.send("success");
});

export default globalRouter;
