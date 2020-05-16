import mongoose from "mongoose";

const ConsultantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name (이름) is required",
  },
  position: {
    type: String,
  },
  incumbent: {
    type: Boolean,
    required: "Incumbent status (재직 상태) is required",
  },
  contact: {
    type: String,
  },
  contributedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const model = mongoose.model("Consultant", ConsultantSchema);
export default model;
