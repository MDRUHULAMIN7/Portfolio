import mongoose, { Schema } from "mongoose";

const permissionsSchema = new Schema(
  {
    login: { type: Boolean, required: true },
    register: { type: Boolean, required: true },
    addReview: { type: Boolean, required: true },
  

  },
 { timestamps: true }
);

export const Permissions =
  mongoose?.models?.Permissions || mongoose.model("Permissions",permissionsSchema);
