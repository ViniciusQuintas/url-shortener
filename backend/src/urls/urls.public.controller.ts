import express, { Request, Response } from "express";
import { getUrl, newclick } from "./urls.service";

const router = express.Router();

router.get("/:code", async (req: Request, res: Response) => {
  try {
    const code = req.params.code as string;

    const url = await getUrl(code);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    const click = {
      urlid: url.id,
      country: "unknown",
      browser: "unknown",
      device: "unknown",
    };

    newclick(click);

    return res.redirect(302, url.originalUrl);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
