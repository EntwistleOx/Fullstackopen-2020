import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveDiaryEntries());
});

//router.post("/", (_req, res) => {
//res.send("Posting a diary");
//});

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

//router.post("/", (req, pos) => {
//const { date, weather, visibility, comment } = req.body;
//const newDiaryEntry = diaryService.addDiary({
//date,
//weather,
//visibility,
//comment,
//});
//res.json(newDiaryEntry);
//});
router.post("/", (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
