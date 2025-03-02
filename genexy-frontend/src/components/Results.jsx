import React from "react";
import { usePatient } from "../providers/PatientProvider";
import { Translate } from "react-auto-translate";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import toast from "react-hot-toast";
import { createUser } from "../lib/lib";

export default function Results() {
  const { patientData } = usePatient();
  console.log(patientData);
  //derived state
  const data = patientData?.data?.data?.filter(
    (patient) => patient.attributes.field_name
  );

  const handleTestAccount = async () => {
    const dataGenexy = JSON.stringify({
      username: `${data[0].attributes.mail}`,
    });
    const requestOptionsGenexy = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: createUser.authorization,
        Cookie: createUser.cookie,
      },
      body: dataGenexy,
    };

    const requestUserGenexy = await fetch(
      "https://api.genexyhealth.com/api/user/exists",
      requestOptionsGenexy
    );

    const res = await requestUserGenexy.json();

    toast.success("Exists? " + res.exists);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mt: 2, p: 2 }}>
        <Translate>Results</Translate>
      </Typography>
      <ul>
        {data?.length === 0 && <p>No data available</p>}
        {data?.length > 0 &&
          data.map((patient, index) => (
            <li key={patient.id} style={{ listStyleType: "none" }}>
              <Accordion>
                <AccordionSummary
                  sx={{ m: 1 }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    {patient.attributes.field_name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Translate>Age: </Translate>
                  {patient.attributes.field_age} |{" "}
                  <Translate>Height:</Translate>{" "}
                  {patient.attributes.field_height}cm |{" "}
                  <Translate>Smokes:</Translate>{" "}
                  {!!patient.attributes.field_smoker ? "Yes" : "No"} |{" "}
                  <Translate>Weight:</Translate>{" "}
                  {patient.attributes.field_weight}Lbs
                  <hr></hr>
                  Details: Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Suspendisse malesuada lacus ex, sit amet blandit leo
                  lobortis eget.
                </AccordionDetails>
              </Accordion>
              {data.length === 1 && (
                <Button onClick={handleTestAccount}>
                  <Translate>Test if user has Genexy Acct</Translate>
                </Button>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
