import { Request, Response, NextFunction } from "express";
import { database } from "../mongodb";
import { auth } from "../firebase";
import { ObjectId } from "mongodb";

const users = database.collection<UserData>("users");

export type Match = {
  other_user_id: string,
  chat_id: ObjectId,
  display_name: string
}

export type Todo = {
  title: string,
  timestamp: number,
  completed: boolean
}

export type UserData = {
  firebase_id: string,
  display_name: string,
  open_to_wave: boolean,
  matches: Match[],
  bio: string,
  skills: number[],
  todo_list: Todo[]
}

export const authMiddleware = async (req: Request<{}, {},  {}, { id_token: string }>, res: Response<{}, { user: UserData | null }>, next: NextFunction) => {
  const id_token = decodeURIComponent(req.query.id_token);

  const uid = await auth.verifyIdToken(id_token).then(async (decodedToken) => {
    return decodedToken.uid;
  }).catch((error) => {
    console.error(error);
    return null;
  });

  if (!uid) {
    res.status(401).send("Unauthorized");
    return;
  }

  let user = await users.findOne<UserData>({ "firebase_id": uid });

  if (!user) {
    const firebaseUser = await auth.getUser(uid);

    if (!firebaseUser) {
      res.status(404).send("User not found");
      return;
    }

    user = {
      firebase_id: uid,
      display_name: firebaseUser.displayName || firebaseUser.email || "Loser",
      open_to_wave: true,
      matches: [],
      bio: "",
      skills: [],
      todo_list: []
    }

    await users.insertOne(user);
  }

  res.locals.user = user;
  next();
}
