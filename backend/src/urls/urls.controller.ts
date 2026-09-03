import express, { Request, Response } from "express";
import {
  createUrl,
  deleteUrlById,
  getAllUrls,
  getUrlById,
} from "./urls.service";
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

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error("Missing a required data");
    }

    const urlId = req.params.id as string;

    const url = await getUrlById(urlId);

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.userId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const deleteUrl = await deleteUrlById(urlId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: String(error) });
    }
  }
});

export default router;
