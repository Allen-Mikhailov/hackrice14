import { Request, Response, NextFunction } from "express";
import { database } from "../mongodb";
import { auth } from "../firebase";

const users = database.collection<UserData>("users");

export type Match = {
  other_user_id: string,
  chat_id: string
}

export type UserData = {
  firebase_id: string,
  matches: Match[],
  bio: string,
  skills: number[],
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
    user = {
      firebase_id: uid,
      matches: [],
      bio: "",
      skills: []
    }

    await users.insertOne(user);
  }

  res.locals.user = user;
  next();
}
