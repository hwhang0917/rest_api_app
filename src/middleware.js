import Person from "./models/Person";
import Client from "./models/Client";
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
