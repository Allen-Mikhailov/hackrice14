import { Router } from "express";
import { authMiddleware } from "../middleware/auth";

const profile = Router();

profile.use(authMiddleware);

profile.get("/", (req, res) => {
  res.send("profile");
});

export default profile;