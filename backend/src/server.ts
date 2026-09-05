import express from "express";
import authRouter from "./auth/auth.controller";
import urlRouter from "./urls/urls.controller";
import publicUrlRouter from "./urls/urls.public.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { rateLimitMiddleware } from "./middlewares/rate-limit.middleware";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/auth", authRouter);
app.use("/urls", publicUrlRouter);
app.use("/urls", authMiddleware);
app.post("/urls", rateLimitMiddleware);
app.use("/urls", urlRouter);
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
