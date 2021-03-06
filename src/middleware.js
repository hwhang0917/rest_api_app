import Person from "./models/Person";
import Client from "./models/Client";
import Project from "./models/Project";
import routes from "./routes";

export const SuccessJSON = (code, msg) => {
  return {
    status_code: code,
    status_message: msg,
    success: true,
  };
};

export const ErrorJSON = (code, msg) => {
  return {
    status_code: code,
    status_message: msg,
    success: false,
  };
};

// This middleware sends local data to view
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "REST API Application";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

// Allow only admin
export const onlyAdmin = (req, res, next) => {
  if (req.user.admin === 1) {
    next();
  } else if (req.user.admin === 0) {
    res.redirect(routes.api);
  } else {
    res.redirect(routes.root);
  }
};

// Allow for not logged in users
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.api);
  } else {
    next();
  }
};

// Allow for logged in users
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.root);
  }
};

// Validate API Key
export const validateAPIKey = async (req, res, next) => {
  const {
    query: { api_key },
  } = req;
  try {
    if (
      await Person.findOne({
        apiKey: api_key,
      })
    ) {
      next();
    } else {
      res.status(401);
      res.json(
        ErrorJSON(401, "Invalid API Key: You must be granted a valid key")
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// Check if api_key passed is admin
export const checkAdmin = async (req, res, next) => {
  const {
    query: { api_key },
  } = req;
  try {
    const user = await Person.findOne({ apiKey: api_key });
    if (user.admin) {
      next();
    } else {
      res.status(403);
      res.json(
        ErrorJSON(403, "Forbidden, only admins can access this resource.")
      );
    }
  } catch (error) {
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
};

// Check if username exists
export const usernameExists = async (req, res, next) => {
  const {
    body: { username },
  } = req;
  try {
    const user = await Person.findOne({ username });
    if (user) {
      res.status(409);
      res.json(ErrorJSON(409, "Conflict, username already exists."));
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
};

// Check if client exists
export const clientExists = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const client = await Client.findById({ _id: id });
    if (client) {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
};

// Check if person exists
export const personExists = async (req, res, next) => {
  const {
    query: { contributor_id: id },
  } = req;
  try {
    const person = await Person.findById({ _id: id });
    if (person) {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
};

// Check if project exists
export const projectExists = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const project = await Project.findById({ _id: id });
    if (project) {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    res.json(ErrorJSON(404, "The resource you requested could not be found."));
  }
};