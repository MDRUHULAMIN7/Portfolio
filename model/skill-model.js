import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  updatedDate: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bgHover: {
    type: String,
    required: true,
  }
});

export const Skill = mongoose?.models?.Skill || mongoose?.model("Skill", skillSchema);
