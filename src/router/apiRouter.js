import express from "express";
import routes from "../routes";
import personRouter from "./entityRouter/personRouter";
import { validateAPIKey } from "../middleware";
// import Person from "../models/Person";

// Express router
const apiRouter = express.Router();

// Entity Routers
apiRouter.use(routes.person, validateAPIKey, personRouter);

// Create Test User
// apiRouter.post("/test", (req, res) => {
//   Person.create({
//     name: "John Doe",
//     position: "admin",
//     contact: "johndoe@admin.com",
//     employee: true,
//     username: "admin",
//     admin: true,
//     apiKey: "test1234",
//   });
//   res.send("success");
// });

export default apiRouter;
