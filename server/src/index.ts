import express from "express";
import https from "node:https";
import fs from "node:fs";

const app = express();

app.get("/", (req, res) => {
  res.send("test");
});

if (process.env.NODE_ENV === "production") {
  app.listen(80);
} else {
  https.createServer({
    cert: fs.readFileSync("/root/cert.txt"),
  }, app).listen(443);
}