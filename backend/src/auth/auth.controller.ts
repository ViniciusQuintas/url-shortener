import express from "express";
import { login, register } from "./auth.service";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
      throw new Error("Missing a required data");
    }

    const user = req.body;

    await register(user.name, user.email, user.password);
    res.status(201).send("User created successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: String(error) });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      throw new Error("Missing a required data");
    }

    const data = req.body;

    const token = await login(data.email, data.password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: String(error) });
    }
  }
});

export default router;
