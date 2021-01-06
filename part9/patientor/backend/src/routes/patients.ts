import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const added = patientService.addPatient(newPatient);
    res.send(added);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    res.send(patient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const added = patientService.addEntry(id, newEntry);
    res.send(added);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
