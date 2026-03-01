import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true, minlength: 5 },
  },
  { timestamps: true }
);

export const Message =
  mongoose?.models?.Message || mongoose.model("Message", messageSchema);
