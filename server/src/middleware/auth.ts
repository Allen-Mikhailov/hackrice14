import { Request, Response, NextFunction } from "express";
import { getAuth, signInWithCredential, GoogleAuthProvider, User } from "firebase/auth";
import { database } from "../mongodb";

const auth = getAuth();

export const authMiddleware = async (req: Request<{}, { id_token: string }>, res: Response<{}, { user: User | null }>, next: NextFunction) => {
  const credential = GoogleAuthProvider.credential(req.body.id_token);

  const userCred = await signInWithCredential(auth, credential).catch(e => {
    console.log(e);
  });

  if (userCred) {
    let user = await database.collection("users").findOne({ "id": userCred.user.uid });

    if(!user) {
      const res = await database.collection("users").insertOne({
        "id": userCred.user.uid,
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
        _id: res.insertedId,
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
      }
    }


    res.locals.user = userCred.user;

    next();
  } else {
    res.locals.user = null;
  }
}
