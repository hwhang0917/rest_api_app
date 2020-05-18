import Person from "./models/Person";
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
