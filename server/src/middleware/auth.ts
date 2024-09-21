import { Request, Response, NextFunction } from "express";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { database } from "../mongodb";
import { ObjectId } from "mongodb";
import { auth } from "../firebase";

const users = database.collection("users");

export type User = {
  _id: ObjectId,
  email: string | null,
  name: string | null,
  photo: string | null,
  matches: string[],
  chats: string[],
  bio: string,
  have: {
    skills: string[],
    courses: string[]
  },
  need: {
    skills: string[],
    courses: string[]
  }
}

export const authMiddleware = async (req: Request<{}, {},  {}, { id_token: string }>, res: Response<{}, { user: User | null }>, next: NextFunction) => {
  const credential = GoogleAuthProvider.credential(req.query.id_token);

  const userCred = await signInWithCredential(auth, credential).catch(e => {
    console.log(e);
  });

  if (userCred === void 0) {
    res.status(401).send("Unauthorized");
    return;
  }

  let user = await users.findOne<User>({ "id": userCred.user.uid });

  if (!user) {
    await users.insertOne({
      "_id": new ObjectId(userCred.user.uid),
      "email": userCred.user.email,
      "name": userCred.user.displayName,
      "photo": userCred.user.photoURL,
      "chat_id": null,
      "bio": "",
      "have": {
        "skills": [],
        "courses": []
      },
      "need": {
        "skills": [],
        "courses": []
      }
    });

    user = {
      _id: new ObjectId(userCred.user.uid),
      email: userCred.user.email,
      name: userCred.user.displayName,
      photo: userCred.user.photoURL,
      matches: [],
      chats: [],
      "bio": "",
      "have": {
        "skills": [],
        "courses": []
      },
      "need": {
        "skills": [],
        "courses": []
      }
    }
  }

  res.locals.user = user;
  next();
}
