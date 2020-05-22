import express from "express";
import passport from "passport";
import Person from "../models/Person";
import { createAPIKey } from "./entityRouter/personRouter";
import { onlyPrivate, onlyPublic, onlyAdmin } from "../middleware";
import Employee from "../models/Employee";
import routes from "../routes";

// Express router
const globalRouter = express.Router();

globalRouter.get(routes.root, onlyPublic, (req, res) => {
  res.render("landing");
});

globalRouter.get(routes.api, onlyPrivate, (req, res) => {
  const {
    user: { apiKey },
  } = req;
  res.render("api", { apiKey });
});

globalRouter.get(routes.admin, onlyAdmin, (req, res) => {
  res.render("admin");
});

// Login
globalRouter.get(routes.login, onlyPublic, (req, res) => {
  res.render("login");
});

globalRouter.post(
  routes.login,
  onlyPublic,
  passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.api,
  })
);

// Logout
globalRouter.get(routes.logout, onlyPrivate, (req, res) => {
  req.logout();
  res.redirect(routes.root);
});

// Signup
globalRouter.get(routes.signup, onlyPublic, (req, res) => {
  res.render("signup");
});

globalRouter.post(routes.signup, async (req, res) => {
  const {
    body: { name, position, contact, username, password, apiKey, employee },
  } = req;
  //  Check username
  try {
    const existingUser = await Person.findOne({ username: username });
    if (existingUser) {
      res.status(409);
      res.render("error", {
        err_msg: "이미 사용 중인 아이디입니다!",
      });
    }
  } catch (error) {}
  //  Check admin API
  try {
    const apiUser = await Person.findOne({ apiKey: apiKey });
    if (!apiUser.admin) {
      res.status(403);
      res.render("error", {
        err_msg: "잘못된 API 키입니다! 관리자와 확인하세요.",
      });
    }
  } catch (error) {
    res.status(403);
    res.render("error", {
      err_msg: "잘못된 API 키입니다! 관리자와 확인하세요.",
    });
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
