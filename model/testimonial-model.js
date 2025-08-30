import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    company: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
      review: { type: String, required: true, minlength: 150 },
    status: { type: String, default: "pending" },
    avatar: { type: String, required: true }, 
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose?.models?.Testimonial || mongoose.model("Testimonial", testimonialSchema);
