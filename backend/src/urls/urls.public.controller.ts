import express, { Request, Response } from "express";
import { getUrl, newclick } from "./urls.service";
import { redis } from "../lib/redis";
import { parseUserAgent } from "../lib/ua-parser";

const router = express.Router();

router.get("/:code", async (req: Request, res: Response) => {
  const code = req.params.code as string;
  const userAgent = req.headers["user-agent"] as string;

  const urlByRedis = await redis.get(`url:${code}`);

  const parser = parseUserAgent(userAgent);

  if (urlByRedis) {
    const cachedUrl = JSON.parse(urlByRedis);
    const expiresAt = Date.parse(cachedUrl.expiresAt);

    if (expiresAt < Date.now()) {
      return res.status(410).json({ error: "Gone" });
    }

    await newclick({
      urlid: cachedUrl.id,
      country: "unknown",
      browser: parser.browser.name ?? "unknown",
      device: parser.device.type ?? "unknown",
    });

    return res.redirect(302, cachedUrl.originalUrl);
  }

  const url = await getUrl(code);

  if (url.expiresAt && url.expiresAt.getTime() < Date.now()) {
    return res.status(410).json({ error: "Gone" });
  }

  redis.set(`url:${code}`, JSON.stringify(url), "EX", 3600);

  const click = {
    urlid: url.id,
    country: "unknown",
    browser: parser.browser.name ?? "unknown",
    device: parser.device.type ?? "unknown",
  };

  await newclick(click);

  return res.redirect(302, url.originalUrl);
});

export default router;
