import express from "express";
import https from "node:https";
import fs from "node:fs";
import cors from "cors";
import { live } from "./routers/chats";

import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") config();

console.log(process.env.NODE_ENV);

export const app = express();
app.use(express.json());
app.use(cors());

let server: any = app;

if (process.env.NODE_ENV === "production") {
  server = https.createServer({
    key: fs.readFileSync("/root/motivibe.live.key"),
    cert: fs.readFileSync("/root/cert.txt"),
  }, app);
  live.attach(server);
} else {
  live.listen(8081);
}

app.use("/profile", (await import("./routers/profile")).default);
app.use("/chats", (await import("./routers/chats")).default);
app.use("/matches", (await import("./routers/matches")).default);

app.get("/", (req, res) => {
  res.send("test");
});

server.listen(process.env.NODE_ENV === "production" ? 443 : 8080, () => console.log("listening"));