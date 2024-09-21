import { Request, Response, NextFunction } from "express";
import { getAuth, signInWithCredential, GoogleAuthProvider, User } from "firebase/auth";

const auth = getAuth();

export const authMiddleware = async (req: Request<{}, { id_token: string }>, res: Response<{}, { user: User | null }>, next: NextFunction) => {
  const credential = GoogleAuthProvider.credential(req.body.id_token);

  const userCred = await signInWithCredential(auth, credential).catch(e => {
    console.log(e);
  });

  if (userCred) {
    res.locals.user = userCred.user;
    next();
  } else {
    res.locals.user = null;
  }
}
