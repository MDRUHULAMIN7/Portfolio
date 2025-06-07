import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: { type: String },
  userAgent: { type: String },
  visitedAt: { type: Date, default: Date.now },
});


export const Visitor = mongoose?.models?.Visitor || mongoose?.model("Visitor", visitorSchema);