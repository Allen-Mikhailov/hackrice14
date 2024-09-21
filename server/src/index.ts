import express from "express";
import https from "node:https";
import fs from "node:fs";
import cors from "cors";

const app = express();

app.use(cors());

app.use("/profile", require("./routers/profile").default);

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