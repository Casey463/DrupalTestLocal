import React from "react";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";

import { FetchPatientData, FetchQuestionData } from "./lib/hooks";
import Navbar from "./components/Navbar";

import { Translator } from "react-auto-translate";

import Home from "./components/Home";
import Results from "./components/Results";

import Questionaire from "./components/Questionaire";
import Signup from "./components/Signup";
import { Button } from "@mui/material";
import { GoogleAPIKey } from "./lib/lib";

function App() {
  const [login, setLogin] = React.useState(null);
  const [language, setLanguage] = React.useState("en");
  FetchPatientData(login);
  FetchQuestionData();

  return (
    //Add Tests??
    //Add Loading Spinners
    //Add https://mui.com/material-ui/

    <div>
      <Translator
        // cacheProvider={cacheProvider}
        from="en"
        to={language}
        googleApiKey={GoogleAPIKey}
      >
        <Navbar login={login} setLogin={setLogin} />
        <Button onClick={() => setLanguage("en")}>Set to English</Button>
        <Button onClick={() => setLanguage("es")}>Set to Spanish</Button>
        <Routes>
          <Route path="/" element={<Login setLogin={setLogin} />} />
          <Route path="/home" element={<Home setLanguage={setLanguage} />} />
          <Route path="/questionnaire" element={<Questionaire />} />
          <Route path="/results" element={<Results />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Translator>
    </div>
  );
}

export default App;
