import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.json({ message: "Hello FullStack!" });
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      height,
      weight,
      bmi,
    });
  } catch (error) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.post("/calculator", ({ body: { dailyExercises, target } }, res) => {
  try {
    if (!dailyExercises || !target) {
      throw new Error("parameters missing");
    } else if (
      isNaN(Number(target)) ||
      !dailyExercises.every((n: number) => !isNaN(Number(n)))
    ) {
      throw new Error("malformatted parameters");
    }
    const calculate = calculateExercises(dailyExercises, Number(target));
    res.json(calculate);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
