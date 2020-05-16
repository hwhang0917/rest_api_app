import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name (고객 이름) is required",
  },
  contact: {
    type: String,
  },
  requestedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const model = mongoose.model("Client", ClientSchema);
export default model;
