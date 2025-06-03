import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
 time: {
    type: String,
    required: true,
  },
 credentials: {
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

export const Course = mongoose?.models?.Course || mongoose?.model("Course", courseSchema);
