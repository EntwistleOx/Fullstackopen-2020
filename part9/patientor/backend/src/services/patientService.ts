import uuid = require('uuid');
import patients from '../../data/patients';

import { Patient, PublicPatient, NewPatientEntry } from '../../types';

// const patients: Array<PublicPatient> = data;
// const patientsEntries: Array<Patient> = data;

const getPatient = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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

export default { getPatient, addPatient, getPatientById };
