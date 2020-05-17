import mongoose from "mongoose";
import Person from "./Person";

const EmployeeSchema = Person.discriminator(
  "Employee",
  new mongoose.Schema({
    startDate: {
      type: Date,
      default: Date.now,
      required: "Start date is required",
    },
  })
);

const model = mongoose.model("Employee", EmployeeSchema);
export default model;
