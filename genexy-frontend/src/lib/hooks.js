import { useEffect, useState } from "react";
import { usePatient } from "../providers/PatientProvider";
import { toast } from "react-hot-toast";
import { useQuestions } from "../providers/QuestionProvider";
import {
  bodyTokenLib,
  client_id,
  client_secret,
  createUser,
  questionDataURL,
} from "./lib";
//implment useQuery and axios to fetch data more efficently and with caching.
//set up a practioner role that only has access to specific patients
//update headers to be more secure and saved as keys/constants

export const FetchPatientData = async (login) => {
  //Fetch patient data from drupal API

  const { setPatientData, patientData } = usePatient();
  if (!login) return;

  if (patientData.data) return;

  const { username, password } = login;

  const tokenData = JSON.stringify({
    grant_type: "password",
    client_id: client_id,
    client_secret: client_secret,
    username: `${username}`,
    password: `${password}`,
  });

  try {
    const responseToken = await fetch(
      "https://drupaltest.ddev.site/oauth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: tokenData,
      }
    );

    if (!responseToken.ok) {
      throw new Error("Error:", responseToken);
    }

    const datatoken = await responseToken.json();
    const token = datatoken.access_token;

    const responseData = await fetch(
      "https://drupaltest.ddev.site/jsonapi/user/user",
      {
        method: "GET",
        headers: { Authent: "", Authorization: `Bearer ${token}` },
      }
    );

    if (!responseData.ok) {
      throw new Error("Server Error:", responseData);
    }
    const data = await responseData.json();

    const responsePatient = await fetch(
      "https://drupaltest.ddev.site/jsonapi/",
      {
        method: "GET",
        headers: { Authent: "", Authorization: `Bearer ${token}` },
      }
    );

    const resP = await responsePatient.json();

    const patientid = resP.meta.links.me.meta.id;

    const patient = data.data?.filter((patient) => patient.id === patientid);

    setPatientData({ data: data, token: token, patient: patient });
  } catch (error) {
    toast.error("Error: invalid username or password");
  }
};

/////////////////////////////////////////////////

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

//////////////////////////////////////////////////////

export const FetchQuestionData = async () => {
  //Fetch question data from genexy API

  const { setQuestionData, questionData } = useQuestions();

  if (questionData.data) return;

  //Shortcut sign in//

  const bodyToken = JSON.stringify({
    client_id: bodyTokenLib.client_id,
    client_secret: bodyTokenLib.client_secret,
    audience: bodyTokenLib.audience,
    grant_type: bodyTokenLib.grant_type,
  });

  const requestOptionsToken = {
    method: "POST",
    //content: "application/json",
    headers: { "Content-Type": "application/json" },
    body: bodyToken,
    redirect: "follow",
  };

  //Request
  const responseToken = await fetch(
    "https://genexyhealth.com/oauth2/token",
    requestOptionsToken
  );
  const dataToken = await responseToken.json();
  // console.log(dataToken);

  ///Question data///
  const myheaderQuestions = new Headers();
  myheaderQuestions.append("Authorization", `Bearer ${dataToken.access_token}`);
  // myheaderQuestions.append("kid", "basic");

  const formdataQuestions = new FormData();

  const requestOptionsQuestions = {
    content: "application/json",
    method: "POST",
    headers: myheaderQuestions,
    body: formdataQuestions,
  };

  //Request//

  try {
    const responseQuestions = await fetch(
      questionDataURL,
      requestOptionsQuestions
    );

    if (!responseQuestions.ok) {
      throw new Error("Error:", responseQuestions);
    }

    const dataQuestions = await responseQuestions.json();
    const result = Object.keys(dataQuestions.inputs).map(
      (key) => dataQuestions.inputs[key]
    );
    setQuestionData({ data: result });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const SignUp = async (signup) => {
  //Sign up Drupal API

  const date = new Date();
  // Set up form data for genexy sign up

  const dataDrupal = JSON.stringify({
    data: {
      type: "user--user",
      attributes: {
        name: `${signup.firstname}`,
        mail: `${signup.uuid}`,
        pass: `${signup.password}`,
      },
    },
  });

  const dataGenexy = JSON.stringify({
    username: `${signup.uuid}`,
    pw: `${signup.password}`,
    client_key: createUser.client_key,
    firstname: `${signup.firstname}`,
    lastname: `${signup.lastname}`,
    screen_nm: `${signup.uuid}`,
    date_register: `${date}`,
    email: `${signup.uuid}`,
  });

  const requestOptionsGenexy = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: createUser.authorization,
      Cookie: createUser.cookie,
    },
    body: dataGenexy,
    redirect: "follow",
  };

  const requestOptionsDrupal = {
    method: "POST",
    headers: { "Content-Type": "application/vnd.api+json" },
    body: dataDrupal,
    redirect: "follow",
  };

  try {
    //Sign Up Drupal API

    const createUserDrupal = await fetch(
      "https://drupaltest.ddev.site/jsonapi/user/register",
      requestOptionsDrupal
    );

    const data = await createUserDrupal.json();

    // Sign Up Genexy API

    const createUserGenexy = await fetch(
      "https://api.genexyhealth.com/api/user/create",
      requestOptionsGenexy
    );

    const dataGenexy = await createUserGenexy.json();
    console.log(dataGenexy);
    //Error handling

    if (!createUserDrupal.ok || !createUserGenexy.ok) {
      throw new Error("Error:", createUserDrupal + createUserGenexy);
    }
    return data;
  } catch (error) {
    toast.error("Sign up failed");
  }
};
