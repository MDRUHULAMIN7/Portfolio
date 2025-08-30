
import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    designation: { type: String, required: true }, // Your role
    type: { type: String, required: true }, // Company or Event
    company: { type: String, required: true }, // Company/Event name
    logo: { type: String }, // Logo URL
    images: [{ type: String }], // Array of image URLs
    opinion: { type: String, required: true }, // Description
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // Optional (null if ongoing)
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Resigned"],
      default: "Ongoing",
    },
  },
  { timestamps: true }
);
export const Experience =
  mongoose?.models?.Experience || mongoose.model("Experience", experienceSchema);
