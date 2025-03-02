import React from "react";
import { useLocalStorage } from "../lib/hooks";

export const QuestionContext = React.createContext(null);

export const useQuestions = () => React.useContext(QuestionContext);

export default function PatientProvider({ children }) {
  const [questionData, setQuestionData] = useLocalStorage("questionData", {
    data: null,
  });

  return (
    <QuestionContext.Provider
      value={{
        questionData,
        setQuestionData,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
