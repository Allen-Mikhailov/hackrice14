import { Router, Response } from "express";
import { authMiddleware } from "../middleware/auth";
import { database } from "../mongodb";
import { User } from "firebase/auth";

const collection = database.collection("chats");
const chats = Router();

chats.use(authMiddleware);

chats.get("/", (req, res: Response<{}, { user: User }>) => {
  const chats = collection.find({ "id": res.locals.user. }).toArray();

  res.send("chats");
});

export default chats;