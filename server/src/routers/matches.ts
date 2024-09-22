import { Router, Response, Request } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";

const users = database.collection<UserData>("users");
const chats = database.collection("chats");
const matches = Router();

matches.use(authMiddleware);

matches.post("/add", async (req: Request<{}, {}, {user1_id: string, user2_id: string}>, res: Response<{}, { user: UserData }>) => {
  let { user1_id, user2_id } = req.body;

  if (!user1_id || !user2_id) {
    res.status(400).send("Bad Request");
    return;
  }

  const user1 = await users.findOne<UserData>({ firebase_id: user1_id });
  const user2 = await users.findOne<UserData>({ firebase_id: user2_id });

  if (!user1 || !user2) {
    res.status(404).send("At least one user not found");
    return;
  }

  let chat_id = (await chats.insertOne({ users: [user1, user2], messages: [] })).insertedId;
  users.updateOne({ firebase_id: user1 }, { "$push": { matches: { other_user_id: user2_id, chat_id, user_name: user2.display_name } } });
  users.updateOne({ firebase_id: user2 }, { "$push": { matches: { other_user_id: user1_id, chat_id, user_name: user1.display_name } } });
  res.json(res.locals.user);
});

matches.delete("/remove", async (req: Request<{}, {}, {user1_id: string, user2_id: string}>, res: Response<{}, { user: UserData }>) => {
  let { user1_id, user2_id } = req.body;

  if (!user1_id || !user2_id) {
    res.status(400).send("Bad Request");
    return;
  }

  const user1 = await users.findOne<UserData>({ firebase_id: user1_id });
  const user2 = await users.findOne<UserData>({ firebase_id: user2_id });

  if (!user1 || !user2) {
    res.status(404).send("At least one user not found");
    return;
  }

  await chats.deleteOne({ users: [user1, user2], messages: [] });
  users.updateOne({ firebase_id: user1 }, { "$pull": { matches: { other_user_id: user2_id } } });
  users.updateOne({ firebase_id: user2 }, { "$pull": { matches: { other_user_id: user1_id } } });
  res.json(res.locals.user);
});

export default matches;