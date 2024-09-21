import { Router } from "express";
import { authMiddleware } from "../middleware/auth";

const profile = Router();

profile.use(authMiddleware);

profile.get();

export default profile;