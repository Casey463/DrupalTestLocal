import React, { useEffect } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { usePatient } from "../providers/PatientProvider";
import { Button, Input, Typography } from "@mui/material";
import { Translate } from "react-auto-translate";

export default function Login({ setLogin }) {
  const navigate = useNavigate();
  const { patientData } = usePatient();

  useEffect(() => {
    if (patientData?.patient[0]?.attributes?.name !== undefined) {
      navigate("/home");
    }
  }, [navigate, patientData?.patient]);

  const handleSubmit = (e) => {
    const data = new FormData(e.target);
    setLogin({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <div className="login-container">
      <Typography variant="h3">
        <Translate>Log In</Translate>
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="login"
      >
        <Input
          name="username"
          aria-label="Demo input"
          placeholder="Username"
          spellCheck="false"
          type="text"
          required
        />

        <Input
          name="password"
          aria-label="Demo input"
          placeholder="Password"
          spellCheck="false"
          type="text"
          required
        />
        <Button sx={{ color: "primary.main", width: 1 }} type="submit">
          <Translate>Log In</Translate>
        </Button>
      </form>
      <Button sx={{ color: "primary.main", pl: 7.25, pr: 7.25 }}>
        <Link to="/signup">
          <Translate>Sign Up</Translate>
        </Link>
      </Button>
    </div>
  );
}
