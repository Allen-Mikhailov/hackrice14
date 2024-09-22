import express from "express";
import https from "node:https";
import fs from "node:fs";
import cors from "cors";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/profile", (await import("./routers/profile")).default);
app.use("/todo", (await import("./routers/todo")).default);
app.use("/chats", (await import("./routers/chats")).default);

app.get("/", (req, res) => {
  res.send("test");
});

if (process.env.NODE_ENV === "production") {
  https.createServer({
    key: fs.readFileSync("/root/motivibe.live.key"),
    cert: fs.readFileSync("/root/cert.txt"),
  }, app).listen(443, () => {
    console.log("listening");
  });
} else {
  app.listen(8080, () => console.log("listening"));
}