import { Box, Card, CardContent, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CohortDetails from "./CohortDetails";
import EnhancedTable from "../../components/EnhancedTable";

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
  {
    name: "Cohort 4",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 5",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 6",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 7",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 8",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 9",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 10",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 11",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 12",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
  {
    name: "Cohort 13",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam quisquam cum autem. Dolorem velit cumque fugiat! Ab temporibus odit ipsa maxime possimus, minus maiores rem quam illo molestias aspernatur quibusdam.",
  },
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
];

function getCohortData() {
  return new Promise(function (resolve, reject) {
    // some async operation here
    setTimeout(function () {
      // resolve the promise with some value
      resolve(mockData);
    }, 3000);
  });
}

function Cohorts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const result = await getCohortData();
      setData(result);
      return result;
    };

    getData();
  }, []);

  return (
    <Box mx={2}>
      {data.length < 1 ? (
        <Card sx={{ minHeight: 200 }}>
          <CardContent>
            <Box
              height="100%"
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap={2}
            >
              <Skeleton height={60} variant="rounded" animation="wave" />

              <Skeleton height={300} variant="rounded" animation="wave" />
            </Box>
          </CardContent>
        </Card>
      ) : (
        <EnhancedTable
          rows={data}
          headCells={headCells}
          tableTitle="List of Cohorts"
        />
      )}
    </Box>
  );
}

export default Cohorts;
