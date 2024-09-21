import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(process.env.NODE_ENV === "production" ? 80 : 8080);