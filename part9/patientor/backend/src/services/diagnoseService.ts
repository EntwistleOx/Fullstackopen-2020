import data from "../../data/diagnoses.json";

import { DiagnoseEntry } from "../../types";

const diagnoses: Array<DiagnoseEntry> = data;

const getDiagnoses = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

export default { getDiagnoses };
