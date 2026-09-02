import express from "express";
import authRouter from "./auth/auth.controller";
import urlRouter from "./urls/urls.controller";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/auth", authRouter);
app.use("/urls/", authMiddleware);
app.use("/urls", urlRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
