import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Translate } from "react-auto-translate";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { useQuestions } from "../providers/QuestionProvider";

export default function Questionnaire() {
  const [currentPage, setCurrentPage] = useState(1);

  const { questionData } = useQuestions();

  const totalNumberOfPages = questionData?.data?.length / 6 || 0;

  const handleChangePage = (direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const page =
    questionData?.data?.slice(currentPage * 6 - 6, currentPage * 6) || [];

  return (
    <div className="Questionnaire">
      <Typography variant="h4" sx={{ mt: 2 }}>
        <Translate>Questionnaire</Translate>
      </Typography>

      {page.map((question) => (
        <Box
          key={question.name}
          sx={{
            boxShadow: 3,
            width: 500,
            height: 65,
            borderRadius: 1,
            p: 2,
            pl: 4.5,
            m: -0.65,
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <Translate>{question.name}</Translate>{" "}
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel
                value="Don't know"
                control={<Radio />}
                label="Don't know"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      ))}

      <ButtonGroup variant="contained" aria-label="Basic button group">
        {currentPage > 1 && (
          <Button sx={{ m: 1 }} onClick={() => handleChangePage("prev")}>
            Prev Page
          </Button>
        )}
        {currentPage < totalNumberOfPages && (
          <Button sx={{ m: 1 }} onClick={() => handleChangePage("next")}>
            Next Page
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
