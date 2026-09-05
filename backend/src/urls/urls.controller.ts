import express, { Request, Response } from "express";
import {
  createUrl,
  deleteUrlById,
  getAllUrls,
  getUrlById,
} from "./urls.service";
import { AppError } from "../errors/AppError";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  if (!req.body || !req.body.originalUrl || !req.user) {
    throw new AppError("Missing a required data", 400);
  }

  const data = req.body;
  const userId = req.user.id;

  const url = await createUrl(data.originalUrl, userId, data?.expiresAt);
  res.status(201).json({ url });
});

router.get("/", async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Missing a required data", 400);
  }

  const userId = req.user.id;
  const urls = await getAllUrls(userId);
  res.status(200).json({ urls });
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Missing a required data", 400);
  }

  const urlId = req.params.id as string;

  const url = await getUrlById(urlId);

  if (url.userId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await deleteUrlById(urlId, url.code);
  res.status(204).send();
});

export default router;
