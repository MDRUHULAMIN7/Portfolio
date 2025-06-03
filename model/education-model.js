import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
 Institute: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
 description: {
    type: String,
    required: true,
  }
});

export const Education = mongoose?.models?.Education || mongoose?.model("Education", educationSchema);
