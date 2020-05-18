// Global Routes
const ROOT = "/";
const ADMIN = "/admin";

// API
const API = "/api";

// READ
const DETAIL = "/:id";
const LIST = "/list";

// CREATE
const CREATE = "/create/:id";

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
  create: (id) => {
    if (id) {
      return `/create/${id}`;
    } else {
      return CREATE;
    }
  },
  person: PERSON,
  client: CLIENT,
  employee: EMPLOYEE,
  expert: EXPERT,
  project: PROJECT,
  report: REPORT,
};

export default routes;
