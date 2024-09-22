import { Router, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { database } from "../mongodb";
import { UserData } from "../middleware/auth";
import { Server } from "socket.io";
import { ObjectId } from "mongodb";
import { auth } from "../firebase";

const collection = database.collection<Chat>("chats");
const chats = Router();
const io = new Server({
  path: "/socket.io",
});

export type Message = {
  user: string,
  message: string,
  timestamp: number
};

export type Chat = {
  _id: ObjectId,
  users: string[],
  messages: Message[]
};

chats.use(authMiddleware);

chats.get("/", async (_req, res: Response<Chat[], { user: UserData }>) => {
  let chatsMaybe = await Promise.all(res.locals.user.matches.map(m => collection.findOne<Chat>({ "id": m.chat_id })));
  res.json(chatsMaybe.filter((chat) => chat !== null));
});

chats.get("/:id", async (req, res: Response<Chat | string, { user: UserData }>) => {
  let chat;

  if (!res.locals.user.matches.map(m => m.chat_id.toHexString()).includes(req.params.id) || (chat = await collection.findOne<Chat>({ "_id": new ObjectId(req.params.id) })) === null) {
    res.status(404).send("Chat not found");
    return;
  }

  res.json(chat);
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join", async (id: string) => {
    const uid = await auth.verifyIdToken(socket.handshake.auth["id_token"] as string).then(async (decodedToken) => {
      return decodedToken.uid;
    }).catch((error) => {
      console.error(error);
      return null;
    });

    if (!uid || !(await database.collection<UserData>("users").findOne({ "firebase_id": uid }))?.matches.map(m => m.chat_id.toHexString()).includes(id)) {
      socket.emit("error", "Unauthorized");
      return;
    }

    let chat = await collection.findOne<Chat>({ "_id": new ObjectId(id) });

    if (!chat) {
      socket.emit("error", "Chat not found");
      return;
    }

    socket.join(id);
    socket.emit("joined", id);
    socket.data.id = id;
  });
  socket.on("message", (message: Message) => {
    collection.updateOne({ "_id": socket.data.id }, { "$push": { "messages": message } });
    io.to(socket.data.id).emit("message", message);
  });
});
io.listen(81);

export default chats;