import express from "express";

const app = express();

app.get("/", () => "hello world");

app.listen()