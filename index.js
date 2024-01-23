import express from "express";
import http from "http";
import cors from "cors";
import fs from "fs";
import { updateDataFile } from "./utils/updateDataFile.js";
import { getDataFromFile } from "./utils/getDataFromFile.js";

const PORT = "8080";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.get("/", (req, res) => {
  if (!fs.existsSync("data.json")) {
    updateDataFile([]);
  }

  const data = getDataFromFile();

  res.json(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
});

app.post("/", (req, res) => {
  const newTodo = req.body;
  const data = getDataFromFile();

  data.push(newTodo);

  updateDataFile(data);

  res.json(newTodo);
});

app.put("/", (req, res) => {
  const data = getDataFromFile();

  const todo = data.find(({ id }) => id === req.body.id);

  Object.assign(todo, req.body);

  updateDataFile(data);

  res.json(todo);
});

app.delete("/:id", (req, res) => {
  const data = getDataFromFile();

  updateDataFile(data.filter(({ id }) => id !== req.params.id));

  res.json({ success: true });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is listening on ${server.address().port}`);
});
