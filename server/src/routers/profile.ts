import { Router, Response, Request } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";

const users = database.collection("users");
const profile = Router();

profile.use(authMiddleware);

profile.get("/me", (_req, res: Response<{}, { user: UserData }>) => {
  res.json(res.locals.user);
});

profile.post("/me", async (req: Request<{}, {}, Partial<{ bio: string, open_to_wave: boolean }>>, res: Response<{}, { user: UserData }>) => {
  let { bio, open_to_wave } = req.body;
  const user = res.locals.user;
  await users.updateOne({ firebase_id: user.firebase_id }, { "$set": { bio: (bio || user.bio), open_to_wave: (open_to_wave || user.open_to_wave) } });
  res.json({ ...user, bio, open_to_wave });
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