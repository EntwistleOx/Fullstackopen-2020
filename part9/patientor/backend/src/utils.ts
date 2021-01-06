/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatientEntry,
  Gender,
  NewEntry,
  Type,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "../types";

//"name": "Hans Gruber",
//"dateOfBirth": "1970-04-25",
//"ssn": "250470-555L",
//"gender": "male",
//"occupation": "Technician"

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [], //parseEntries(object.entries),
  };

  return newPatient;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }

  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }

  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }

  return occupation;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }

  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }

  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (diagnosisCodes && !Array.isArray(diagnosisCodes)) {
    throw new Error("Incorrect diagnosis codes: " + diagnosisCodes);
  }

  return diagnosisCodes;
};

const isType = (param: any): param is Type => {
  return Object.values(Type).includes(param);
};

const parseType = (type: any): Type => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const parseDischarge = (discharge: any): Discharge => {
  console.log(discharge);
  if (
    !discharge ||
    !discharge.date ||
    !discharge.criteria ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }
  return discharge;
};

const parseRating = (healthCheckRating: any): HealthCheckRating => {
  if (typeof healthCheckRating !== "number") {
    throw new Error("Incorrect or missing rating: " + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer name: " + employerName);
  }

  return employerName;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
    throw new Error("Incorrect or missing dates: " + sickLeave);
  }

  return sickLeave;
};

export const toNewEntry = (object: any): NewEntry => {
  let baseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (object.type) {
    case "Hospital":
      return {
        ...baseEntry,
        type: parseType(object.type),
        discharge: parseDischarge(object.discharge),
      };
    case "HealthCheck":
      return {
        ...baseEntry,
        type: parseType(object.type),
        healthCheckRating: parseRating(object.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: parseType(object.type),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      throw Error("Invalid entry type");
  }
};
