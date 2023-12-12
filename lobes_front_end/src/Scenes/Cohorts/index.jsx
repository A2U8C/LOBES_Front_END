import { Box, Card, CardContent, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import CohortDetails from "./CohortDetails";
import EnhancedTable from "../../components/EnhancedTable";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
];

async function getAPIData() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: "PD WG",
    endpoint_id: "https://endpoint.linkedearth.isi.edu/enigma_pd/query",
    projType: "WorkingGroup (E)",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  var url = "https://enigma-flask-api-mdm4nsgoyq-wl.a.run.app/";

  const data = await fetch(url + "cohorts", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));

  return data;
}

function Cohorts() {
  const [data, setData] = useState([]);
  const [cohort, setCohort] = useState("");

  useEffect(() => {
    const getData = async () => {
      const result = await getAPIData();
      const tableData = [];
      result.projects.map((val) =>
        val.name !== "Not Listed In Project"
          ? val.cohorts.map((cohort) => {
              if (!tableData.some((e) => e.name === cohort)) {
                tableData.push({ name: cohort });
              }
            })
          : {}
      );
      setData(tableData);
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
      ) : !cohort.length ? (
        <EnhancedTable
          rows={data}
          headCells={headCells}
          setCohort={setCohort}
          tableTitle="List of Cohorts"
        />
      ) : (
        <CohortDetails name={cohort} setCohort={setCohort} />
      )}
    </Box>
  );
}

export default Cohorts;
