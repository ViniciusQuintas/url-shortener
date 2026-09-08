import express from "express";
import { login, register } from "./auth.service";
import { AppError } from "../errors/AppError";
const router = express.Router();

router.post("/register", async (req, res) => {
  if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
    throw new AppError("Missing a required data", 400);
  }

  const user = req.body;

  await register(user.name, user.email, user.password);
  res.status(201).json({
    message: "User created successfully",
  });
});

router.post("/login", async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    throw new AppError("Missing a required data", 400);
  }

  const data = req.body;

  const token = await login(data.email, data.password);
  res.status(200).json({ token });
});

export default router;
