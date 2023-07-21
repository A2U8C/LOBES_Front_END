import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";

function CohortDetails({ name }) {
  return (
    <>
      <Header title="Cohort Name" subTitle={name} />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="8rem"
        gap="20px"
      >
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          border="1px solid red"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Covar
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          border="1px solid red"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Person Card
        </Box>

        <Box
          gridColumn="span 3"
          border="1px solid red"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Total Participants
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          border="1px solid red"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Projects
        </Box>
        <Box
          gridColumn="span 3"
          border="1px solid red"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Mean Age
        </Box>
      </Box>
    </>
  );
}

export default CohortDetails;
