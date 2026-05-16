import { Router } from "express";
import ToDo from "../model/todo-model.js";

import { getChannel } from "../util/rabbitmq.js";

const router = Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json({ success: true, todos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/todos", async (req, res) => {
  const { title, description, userEmail } = req.body;

  if (!title || !description || !userEmail) {
    return res
      .status(400)
      .json({ error: "Title, description, and user email are required" });
  }

  try {
    const newTodo = await ToDo.create({ title, description, userEmail });

    const rabbitChannel = getChannel();

    if (rabbitChannel) {
      const message = Buffer.from(
        JSON.stringify({
          action: "todo_created",
          title,
          userEmail: newTodo.userEmail,
        }),
      );
      rabbitChannel.sendToQueue("todo_created", message, { persistent: true });
    }

    res.status(201).json({ success: true, todo: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete("/todos", async (req, res) => {
  await ToDo.deleteMany({});
  res.json({ success: true, message: "All todos deleted" });
});

export default router;
