import { Router, Response, Request } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";

const users = database.collection<UserData>("users");
const chats = database.collection("chats");
const matches = Router();

matches.use(authMiddleware);

async function makeMatch(user1_id: string, user2_id: string) {
  const user1 = await users.findOne<UserData>({ firebase_id: user1_id });
  const user2 = await users.findOne<UserData>({ firebase_id: user2_id });

  if (!user1 || !user2) {
    return;
  }

  let chat_id = (await chats.insertOne({ users: [user1, user2], messages: [] })).insertedId;
  await users.updateOne({ firebase_id: user1_id }, { "$push": { matches: { other_user_id: user2_id, chat_id, display_name: user2.display_name } } });
  await users.updateOne({ firebase_id: user2_id }, { "$push": { matches: { other_user_id: user1_id, chat_id, display_name: user1.display_name } } });
  await users.updateOne({ firebase_id: user1_id }, { "$set": { open_to_wave: false } });
  await users.updateOne({ firebase_id: user2_id }, { "$set": { open_to_wave: false } });
}

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
  users.updateOne({ firebase_id: user1_id }, { "$push": { matches: { other_user_id: user2_id, chat_id, display_name: user2.display_name } } });
  users.updateOne({ firebase_id: user2_id }, { "$push": { matches: { other_user_id: user1_id, chat_id, display_name: user1.display_name } } });
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
  users.updateOne({ firebase_id: user1_id }, { "$pull": { matches: { other_user_id: user2_id } } });
  users.updateOne({ firebase_id: user2_id }, { "$pull": { matches: { other_user_id: user1_id } } });
  res.json(res.locals.user);
});


matches.get("/all", async (_req, res: Response<{ all: boolean }, { user: UserData }>) => {
  let all = false;
  while ((await users.countDocuments({open_to_wave: true})) > 1) {
    all = true;
    let user1 = await users.findOne<UserData>({open_to_wave: true});

    if (!user1) {
      continue;
    }

    let user2 = await users.findOne<UserData>({open_to_wave: true, firebase_id: { "$ne": user1.firebase_id }});

    if (!user1 || !user2) {
      all = false;
      continue;
    }
    
    await makeMatch(user1.firebase_id, user2.firebase_id).catch((e) => {
      all = false;
    });
  }

  res.json({ all });
});

export default matches;