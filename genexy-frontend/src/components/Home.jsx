import React from "react";
import { usePatient } from "../providers/PatientProvider";
import { Button, Typography } from "@mui/material";
import { Translate } from "react-auto-translate";

export default function Home({ setLanguage }) {
  const { patientData } = usePatient();

  let name;

  if (patientData.patient[0]?.attributes.field_name) {
    name = patientData.patient[0].attributes.field_name;
  } else {
    name = patientData.patient[0]?.attributes.display_name;
  }

  return (
    <div className="home_container">
      <Typography variant="h4">
        <Translate>Home page</Translate>
      </Typography>
      <Typography>
        <Translate>{"Welcome back! " + name}</Translate>
      </Typography>
    </div>
  );
}
