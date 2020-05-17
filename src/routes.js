// Global Routes
const ROOT = "/";
const ADMIN = "/admin";

// API
const API = "/api";

// READ
const DETAIL = "/:id";
const LIST = "/list";

// Entities
const PERSON = "/person";
const CLIENT = "/client";
const EMPLOYEE = "/employee";
const EXPERT = "/expert";
const PROJECT = "/project";
const REPORT = "/report";

const routes = {
  root: ROOT,
  admin: ADMIN,
  api: API,
  detail: (id) => {
    if (id) {
      return `/${id}`;
    } else {
      return DETAIL;
    }
  },
  list: LIST,
  person: PERSON,
  client: CLIENT,
  employee: EMPLOYEE,
  expert: EXPERT,
  project: PROJECT,
  report: REPORT,
};

export default routes;
