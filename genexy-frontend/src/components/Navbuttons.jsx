import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Translate } from "react-auto-translate";

export default function Navbuttons() {
  return (
    <div className="navbuttons">
      <Link to="/home">
        <Button sx={{ borderBottom: 1 }} className="navbutton">
          <Translate>Home</Translate>
        </Button>
      </Link>
      <Link to="/questionnaire">
        <Button sx={{ borderBottom: 1 }} className="navbutton">
          <Translate>Questionnaire</Translate>
        </Button>
      </Link>
      <Link to="/results">
        <Button sx={{ borderBottom: 1 }} className="navbutton">
          <Translate>Results</Translate>
        </Button>
      </Link>
    </div>
  );
}
