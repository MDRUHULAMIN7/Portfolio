
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Published", "Unpublished"], default: "Unpublished" },
  description: { type: String, required: true },
  readingTime: { type: Number },
});

export const Blog = mongoose?.models?.Blog || mongoose?.model("Blog", blogSchema);
