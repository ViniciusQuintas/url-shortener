import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "node:process";

const secret = env.JWT_SECRET;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!secret) {
    throw new Error("The JWT_SECRET is required!");
  }

  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: payload?.sub as string };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
