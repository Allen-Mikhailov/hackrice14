import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.NODE_ENV === "production" ? 80 : 8080);