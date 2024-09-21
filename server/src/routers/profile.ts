import { Router, Response } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";

const users = database.collection("users");
const profile = Router();

profile.use(authMiddleware);

profile.get("/me", (_req, res: Response<{}, { user: UserData }>) => {
  res.json(res.locals.user);
});

profile.get("/:id", async (req, res: Response<{}, { user: UserData }>) => {
  let user;
  
  if (!res.locals.user.matches.includes(req.params.id) || (user = await users.findOne<UserData>({ "id": req.params.id })) === null) {
    res.status(404).send("Chat not found");
    return;
  }

  res.json(user);
});

export default profile;