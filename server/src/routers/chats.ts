import { Router, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { database } from "../mongodb";
import { UserData } from "../middleware/auth";
import { WithId } from "mongodb";

const collection = database.collection("chats");
const chats = Router();

export type Chat = {
  id: string,
  users: string[],
  messages: {
    user: string,
    message: string,
    timestamp: number
  }[]
};

chats.use(authMiddleware);

chats.get("/", async (_req, res: Response<Chat[], { user: UserData }>) => {
  let chatsMaybe = await Promise.all(res.locals.user.chats.map(id => collection.findOne<Chat>({ "id": id })));
  res.json(chatsMaybe.filter((chat) => chat !== null));
});

chats.get("/:id", async (req, res: Response<Chat | string, { user: UserData }>) => {
  let chat;
  
  if (!res.locals.user.chats.includes(req.params.id) || (chat = await collection.findOne<Chat>({ "id": req.params.id })) === null) {
    res.status(404).send("Chat not found");
    return;
  }

  res.json(chat);
});

export default chats;