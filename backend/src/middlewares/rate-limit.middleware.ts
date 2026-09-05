import { NextFunction, Request, Response } from "express";
import { redis } from "../lib/redis";

export async function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    const key = `rate:${userId}`;

    const rate = await redis.incr(key);

    if (rate === 1) {
      await redis.expire(key, 3600);
    }

    if (rate > 10) {
      return res
        .status(429)
        .json({ message: "Rate limit exceeded. Please try again later." });
    }

    next();
  } catch (error) {
    next(error);
  }
}
