import express from "express";
import authRouter from "./auth/auth.controller";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
