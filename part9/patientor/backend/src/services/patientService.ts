import uuid = require("uuid");
import patients from "../../data/patients";

import { Patient, NewPatientEntry, NewEntry } from "../../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid.v4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find((search) => search.id === id);

  if (patient) {
    const newEntry = {
      id: uuid.v4(),
      ...entry,
    };
    patient.entries.push(newEntry);
    //return newEntry;
    return patient;
  }

  return undefined;
};

export default { getPatients, addPatient, getPatientById, addEntry };
