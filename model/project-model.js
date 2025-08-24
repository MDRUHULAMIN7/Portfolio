import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 200,
  },
  meta: {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      required: false,
      default: 0,

    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
 
  },
  images: [
    {
      type: String,
      required: true,
      validate: {
        validator: (url) => /^https?:\/\/.+\..+/.test(url),
        message: "Invalid image URL",
      },
    },
  ],
  links: [
    {
      live: { type: String, required: true },
      repo: { type: String, required: true },
    },
  ],
  hashtags: {
    type: [String],
    default: [],
  },

  techStack: [
    {
      name: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  features: [
    {
      group: { type: String, required: true },
      items: [
        {
          text: { type: String, required: true },
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Avoid recompiling model in Next.js
export const Project = mongoose?.models?.Project || mongoose?.model("Project", projectSchema);
