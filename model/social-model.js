import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

export const Social = mongoose?.models?.Social || mongoose?.model("Social", socialSchema);
