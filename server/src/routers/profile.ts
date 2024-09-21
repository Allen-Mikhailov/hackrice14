import { Router, Response } from "express";
import { authMiddleware, User } from "../middleware/auth";

const profile = Router();

profile.use(authMiddleware);

profile.get("/", (_req, res: Response<{}, { user: User }>) => {
  res.json(res.locals.user);
});

export default profile;