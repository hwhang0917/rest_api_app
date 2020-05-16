import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  requestedClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: "RequestedClient (요청 고객) is required",
  },
  title: {
    type: String,
    required: "Title (제목) is required",
  },
  startDate: {
    type: Date, 
    default: Date.now,
    required: "Start date (프로젝트 시작 날짜) is required",
  },
  finishedDate: {
    type: Date,
  },
  budget: {
    type: Number,
  },
});

const model = mongoose.model("Project", ProjectSchema);
export default model;
