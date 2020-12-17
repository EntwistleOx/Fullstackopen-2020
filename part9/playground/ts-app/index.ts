import express from "express";

import { calculator } from "./calculator";

const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/calculate", (req, res) => {
  const { value1, value2, op } = req.query;

  const result = calculator(value1, value2, op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
