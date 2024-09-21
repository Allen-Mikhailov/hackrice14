import { Router } from "express";

const todo = Router();

todo.get("/", (req, res) => {
  res.send("todo");
});

export default todo;