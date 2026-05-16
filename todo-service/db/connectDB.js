import mongoose from "mongoose";

export default async function connectDB() {
  await mongoose
    .connect("mongodb://mongo:27017/todos")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err);
      process.exit(1);
    });
}
