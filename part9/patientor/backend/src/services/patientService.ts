import uuid = require("uuid");
import data from "../../data/patients.json";

import { PatientEntry, NewPatientEntry, NoSnnPatientEntry } from "../../types";

const patients: Array<PatientEntry> = data;

const getPatient = (): NoSnnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuid.v4(),
    ...entry,
  };

  data.push(newPatient);
  return newPatient;
};

export default { getPatient, addPatient };
