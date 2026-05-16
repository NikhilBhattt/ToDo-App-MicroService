import express from "express";
import toDoRoutes from "./routes/todo-route.js";
import connectDB from "./db/connectDB.js";
import { connectToRabbitMQ } from "./util/rabbitmq.js";

const app = express();
const port = process.env.PORT || 3002;

// DB connect
await connectDB();

//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

// health route
app.get("/", (req, res) => {
  res.send("ToDo service is running");
});

// ToDo routes
app.use("/", toDoRoutes);

// app run
const startServer = async () => {
  await connectToRabbitMQ();

  app.listen(port, () => {
    console.log(`ToDo service listening on port ${port}`);
  });
};

startServer();
