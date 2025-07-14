import mongoose from "mongoose";

// This function connects to the MongoDB database
export async function dbConnect() {
  // Check if the app is already connected to MongoDB
  if (mongoose.connections[0].readyState) {
    // If already connected, return the current connection
    console.log("MongoDB is already connected");
    return mongoose.connections[0];
  }

  // If no connection is found, establish a new connection
  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_CONNECTION_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    return conn;
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    throw new Error("Failed to connect to MongoDB");
  }
}
