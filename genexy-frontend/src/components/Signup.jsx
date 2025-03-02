import React from "react";

import { useNavigate } from "react-router-dom";
import { SignUp } from "../lib/hooks";
import { Button, Input, Typography } from "@mui/material";
import { Translate } from "react-auto-translate";
export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = new FormData(e.target);
    const signup = {
      password: data.get("password"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      uuid: data.get("email"),
    };
    const res = await SignUp(signup);
    if (res?.data) {
      navigate("/");
    }
  };

  return (
    <div className="signup_container">
      <Typography variant="h3">
        <Translate> Sign Up</Translate>
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        action="#"
        className="login"
      >
        <Input
          name="email"
          spellCheck="false"
          type="text"
          required
          placeholder="Email"
        />

        <Input
          name="password"
          spellCheck="false"
          type="text"
          required
          placeholder="Password"
        />
        <Input
          name="firstname"
          spellCheck="false"
          type="text"
          required
          placeholder="Firstname"
        />
        <Input
          name="lastname"
          spellCheck="false"
          type="text"
          required
          placeholder="Lastname"
        />

        <Button type="submit">
          <Translate>Sign Up</Translate>
        </Button>
      </form>
    </div>
  );
}
