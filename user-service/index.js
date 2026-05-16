import express from "express";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user-route.js";

const app = express();
const port = process.env.PORT || 3001;

// DB connect
await connectDB();

//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// health route
app.get("/", (req, res) => {
  res.send("User service is running");
});

// user routes
app.use("/", userRoutes);

// app run
app.listen(port, () => {
  console.log(`User service listening on port ${port}`);
});
