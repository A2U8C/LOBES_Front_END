import { Box } from "@mui/material";
import React, { useState } from "react";
import CohortDetails from "./CohortDetails";

const mockData = [
  {
    name: "Cohort 1",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 2",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 3",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
];

function Cohorts() {
  const [data, setData] = useState([]);
  return (
    <Box mx={2}>
      {data.length ? (
        <CohortDetails name="Cohort 1" />
      ) : (
        <Box onClick={() => setData(mockData)}>Table</Box>
      )}
    </Box>
  );
}

export default Cohorts;
