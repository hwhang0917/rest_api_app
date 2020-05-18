import mongoose from "mongoose";
import Person from "./Person";

const model = Person.discriminator(
  "Expert",
  new mongoose.Schema({
    expertese: {
      type: String,
      required: "Expertese is required",
    },
  })
);

// const model = mongoose.model("Expert", ExpertSchema);
export default model;
