import React from "react";
import { useLocalStorage } from "../lib/hooks";

export const PatientContext = React.createContext(null);

export const usePatient = () => React.useContext(PatientContext);

export default function PatientProvider({ children }) {
  const [patientData, setPatientData] = useLocalStorage("patientData", {
    data: null,
    token: {},
    patient: {},
  });

  return (
    <PatientContext.Provider
      value={{
        patientData,
        setPatientData,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}
