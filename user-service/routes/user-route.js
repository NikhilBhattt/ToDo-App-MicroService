import { Router } from "express";
import User from "../model/user-model.js";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const userFind = await User.findOne({ email });
  if (userFind) {
    return res.status(400).json({ error: "Email already exists" });
  }

  try {
    const newUser = await User.create({ name, email });
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
