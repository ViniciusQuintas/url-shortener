import express, { Request, Response } from "express";
import { getUrl, newclick } from "./urls.service";
import { redis } from "../lib/redis";

const router = express.Router();

router.get("/:code", async (req: Request, res: Response) => {
  const code = req.params.code as string;

  const urlByRedis = await redis.get(`url:${code}`);

  if (urlByRedis) {
    const cachedUrl = JSON.parse(urlByRedis);

    await newclick({
      urlid: cachedUrl.id,
      country: "unknown",
      browser: "unknown",
      device: "unknown",
    });

    return res.redirect(302, cachedUrl.originalUrl);
  }

  const url = await getUrl(code);

  redis.set(`url:${code}`, JSON.stringify(url), "EX", 3600);

  const click = {
    urlid: url.id,
    country: "unknown",
    browser: "unknown",
    device: "unknown",
  };

  await newclick(click);

  return res.redirect(302, url.originalUrl);
});

export default router;
