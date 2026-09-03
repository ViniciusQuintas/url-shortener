import express, { Request, Response } from "express";
import { createUrl, getAllUrls } from "./urls.service";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.originalUrl || !req.user) {
      throw new Error("Missing a required data");
    }

    const data = req.body;
    const userId = req.user.id;

    const url = await createUrl(data.originalUrl, userId, data?.expiresAt);
    res.status(201).json({ url });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: String(error) });
    }
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("Missing a required data");
    }

    const userId = req.user.id;
    const urls = await getAllUrls(userId);
    res.status(201).json({ urls });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: String(error) });
    }
  }
});

export default router;
