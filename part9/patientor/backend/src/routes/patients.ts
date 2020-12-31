import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatient());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const added = patientService.addPatient(newPatient);
    res.send(added);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    res.send(patient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
