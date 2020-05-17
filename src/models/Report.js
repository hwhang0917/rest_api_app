import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  contributors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person"
    },
  ],
  title: {
    type: String,
    required: "Title (보고서 제목) is required",
  },
  type: {
    type: String,
    required: "Type (보고서 타입) is required",
  },
  documentLink: {
    type: String,
    required: "Document Link (보고서 링크) is required",
  },
});

const model = mongoose.model("Report", ReportSchema),
export default model;