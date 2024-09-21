import { Router, Response } from "express";
import { authMiddleware, UserData } from "../middleware/auth";

const profile = Router();

profile.use(authMiddleware);

profile.get("/me", (_req, res: Response<{}, { user: UserData }>) => {
  res.json(res.locals.user);
});

profile.get("/:id", (_req, res: Response<{}, { user: UserData }>) => {
  res.json(res.locals.user);
});

export default profile;