import { Router, Response, Request } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";

const users = database.collection<UserData>("users");
const chats = database.collection("chats");
const matches = Router();

matches.use(authMiddleware);

matches.post("/new", async (req: Request<{}, {}, {user1: string, user2: string}>, res: Response<{}, { user: UserData }>) => {
  let { user1, user2 } = req.body;

  if (!user1 || !user2) {
    res.status(400).send("Bad Request");
    return;
  }

  let chat_id = (await chats.insertOne({ users: [user1, user2], messages: [] })).insertedId;
  users.updateOne({ firebase_id: user1 }, { "$push": { matches: { other_user_id: user2, chat_id } } });
  users.updateOne({ firebase_id: user2 }, { "$push": { matches: { other_user_id: user1, chat_id } } });
  res.json(res.locals.user);
});

export default matches;