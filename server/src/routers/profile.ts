import { Router, Response, Request } from "express";
import { authMiddleware, UserData } from "../middleware/auth";
import { database } from "../mongodb";
import { OpenAI } from "openai";

const users = database.collection("users");
const profile = Router();

const openai = new OpenAI({
  apiKey: process.env.CHATGPT
});

profile.use(authMiddleware);

profile.get("/me", (_req, res: Response<{}, { user: UserData }>) => {
  res.json(res.locals.user);
});

profile.post("/me", async (req: Request<{}, {}, Partial<{ bio: string, open_to_wave: boolean }>>, res: Response<{}, { user: UserData }>) => {
  let { bio, open_to_wave } = req.body;
  const user = res.locals.user;

  console.log(bio, open_to_wave);

  if (bio) {
    const res = await openai.chat.completions.create({
      messages: [{ role: "user", content: `Rate how extroverted this person is 1 to 10 with 1 being introverted and 10 being extroverted. State your answer wrapped with brackets. Ex: [9]

  Rate how logical/emotional this person is 1 to 10 with 1 being logical and 10 being emotional . State your answer wrapped with brackets. Ex: [9]

  Rate how reserved/impulsive this person is 1 to 10 with 1 being reserved and 10 being impulsive . State your answer wrapped with brackets. Ex: [9]

  Rate how sensing/intuition this person is 1 to 10 with 1 being sensing and 10 being intuition. State your answer wrapped with brackets. Ex: [9]

  Rate how Judging/Perceiving this person is 1 to 10 with 1 being Judging and 10 being Perceiving. State your answer wrapped with brackets. Ex: [9]` }, { role: "user", content: bio }],
      model: "gpt-3.5-turbo",
    });

    if (!res.choices[0].message.content) {
      return;
    }

    const traits = res.choices[0].message.content!.split("\n").map((line: string) => parseInt(line.match(/\[(\d+)\]/)![1]));

    await users.updateOne({ firebase_id: user.firebase_id }, { "$set": { traits } });
  }
  

  await users.updateOne({ firebase_id: user.firebase_id }, { "$set": { bio: (bio || user.bio), open_to_wave: (open_to_wave !== null ? open_to_wave : user.open_to_wave) } });
  res.json({ ...user, bio, open_to_wave });
});

// profile.post("/task_add", async (req: Request<{}, {}, Partial<{ title: string, completed: boolean, timestamp: number }>>, res: Response<{}, { user: UserData }>) => {
//   let { title, completed, timestamp } = req.body;
//   const user = res.locals.user;
//   await users.updateOne({ firebase_id: user.firebase_id }, { "$push": { todo_list: { title: title || "", 
//     completed: completed || false, timestamp: timestamp || 0 } } });
//   // res.json({ ...user, bio, open_to_wave });
// });

profile.get("/:id", async (req, res: Response<{}, { user: UserData }>) => {
  let user;
  
  if (!res.locals.user.matches.map(m => m.other_user_id).includes(req.params.id) || 
      (user = await users.findOne<UserData>({ "id": req.params.id })) === null) 
  {
    res.status(404).send("Chat not found");
    return;
  }

  res.json(user);
});

export default profile;