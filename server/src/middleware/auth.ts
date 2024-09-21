import { Request, Response, NextFunction } from "express";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();

export const authMiddleware = async (req: Request<{}, { id_token: string }>, res: Response, next: NextFunction) => {
  const credential = GoogleAuthProvider.credential(req.body.id_token);

  const user = await signInWithCredential(auth, credential).catch(e => {
    console.log(e);
  });

  if (user) {
    res.locals.user = user;
    next();
  } else {
    res.locals.user = null;
  }
}
