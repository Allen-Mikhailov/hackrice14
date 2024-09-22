import { Router, Response, Request } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";

const users = database.collection("users");
const profile = Router();

profile.use(authMiddleware);

profile.get("/me", (_req, res: Response<{}, { user: UserData }>) => {
  res.json(res.locals.user);
});

profile.post("/me", async (req: Request<{}, {}, { bio: string }>, res: Response<{}, { user: UserData }>) => {
  let { bio } = req.body;

  console.log(req);

  if (bio === undefined) {
    res.status(400).send("Missing bio");
    return;
  }

  await users.updateOne({ firebase_id: res.locals.user.firebase_id }, { "$set": { bio } });
  res.json({ ...res.locals.user, bio });
});

profile.get("/:id", async (req, res: Response<{}, { user: UserData }>) => {
  let user;
  
  if (!res.locals.user.matches.map(m => m.other_user_id).includes(req.params.id) || 
      (user = await users.findOne<UserData>({ "id": req.params.id })) === null) 
  {
    res.status(404).send("Chat not found");
    return;
  }

  res.json(user);
});

export default profile;