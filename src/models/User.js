import mongoose from "mongoose";
import sha256 from 'crypto-js/sha256';

const ReportSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Email (이메일) is required",
  },
  apiKey: {
    type: String,
    default: sha256(Date.now().toString()).toString(),
    required: "Type (보고서 타입) is required",
  },
});

const model = mongoose.model("Report", ReportSchema),
export default model;