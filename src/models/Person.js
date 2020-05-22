import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const options = { discriminatorKey: "kind" };

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    position: {
      type: String,
    },
    contact: {
      type: String,
    },
    employee: {
      type: Boolean,
      required: "Employee boolean is required",
    },
    username: {
      type: String,
    },
    admin: {
      type: Number,
      default: 0,
      required: "Admin boolean is required",
    },
    apiKey: {
      type: String,
    },
    contributedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  options
);

PersonSchema.plugin(passportLocalMongoose, { usernameField: "username" });

const model = mongoose.model("Person", PersonSchema);
export default model;
