import React from "react";
import "../App.css";
import { usePatient } from "../providers/PatientProvider";
import Navbuttons from "./Navbuttons";
import { useNavigate } from "react-router-dom";
import { useQuestions } from "../providers/QuestionProvider";
import { Button, Typography } from "@mui/material";
import { Translate } from "react-auto-translate";

export default function Navbar({ login, setLogin }) {
  const { patientData, setPatientData } = usePatient();
  const { setQuestionData } = useQuestions();
  const navigate = useNavigate();
  const name = patientData?.patient[0]?.attributes?.name;

  const handleSignOut = () => {
    setLogin(null);
    setPatientData({ data: null, token: {}, patient: {} });
    setQuestionData({ data: null });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbarchild">
        <Typography variant="h5">
          <Translate>Health Portal</Translate>
        </Typography>
      </div>
      {name && <Navbuttons />}

      <div className="navbarchild">
        <p className="sign-out">
          {name ? (
            <Typography as="span">
              <Translate>Signed in as {name}</Translate>
            </Typography>
          ) : (
            <Typography as="span">
              <Translate> Sign in to view data</Translate>{" "}
            </Typography>
          )}
        </p>
        {name && (
          <Button
            sx={{ border: 1, height: 30 }}
            onClick={handleSignOut}
            className="sign-out"
          >
            <Translate>Sign out</Translate>
          </Button>
        )}
      </div>
    </div>
  );
}
