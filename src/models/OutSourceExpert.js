import mongoose from "mongoose";

const OutSourceExpertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name (외부 인사 이름) is required",
  },
  position: {
    type: String,
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

const model = mongoose.model("OutSourceExpert", OutSourceExpertSchema),
export default model;