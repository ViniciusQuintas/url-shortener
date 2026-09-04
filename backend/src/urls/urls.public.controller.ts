import express, { Request, Response } from "express";
import { getUrl, newclick } from "./urls.service";

const router = express.Router();

router.get("/:code", async (req: Request, res: Response) => {
  const code = req.params.code as string;

  const url = await getUrl(code);

  const click = {
    urlid: url.id,
    country: "unknown",
    browser: "unknown",
    device: "unknown",
  };

  newclick(click);

  return res.redirect(302, url.originalUrl);
});

export default router;
