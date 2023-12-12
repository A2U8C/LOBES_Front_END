import Header from "../../components/Header";
import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import BasicTabs from "../../components/BasicTabs";
import PersonCard from "../../components/PersonCard";
import InfoCard from "../../components/InfoCard";
import ProjectAccordians from "../../components/ProjectAccordians";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

async function fetchAPIData(cohortName) {
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
  var base_url = "https://enigma-flask-api-mdm4nsgoyq-wl.a.run.app/";
  var url = base_url + "cohorts/" + cohortName + "/details";
  const data = fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));

  return data;
}

function CohortDetails({ name, setCohort }) {
  const [tabs, setTabs] = useState();
  const [projects, setProjects] = useState();
  const [person, setPerson] = useState();
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [meanAge, setMeanAge] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await fetchAPIData(name);
      setTabs(data.covariates);
      setProjects(data.projects);
      setMeanAge(data.meanAge);
      setPerson(data.person);
      setTotalParticipants(data.totalParticipants);

      setIsLoading(false);
    };
    setTimeout(fetchData, 1000);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title="Cohort Name" subTitle={name} />
        <IconButton
          onClick={() => {
            setCohort("");
          }}
        >
          <ClearIcon />
        </IconButton>
      </Box>
      {isLoading ? (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Skeleton variant="rounded" height={450} animation="wave" />
            </Grid>

            <Grid item xs={12} md={4}>
              <Skeleton variant="rounded" height={250} animation="wave" />
            </Grid>

            <Grid item xs={12} md={4}>
              <Skeleton variant="rounded" height={250} animation="wave" />
            </Grid>

            <Grid item xs={12} md={4}>
              <Skeleton variant="rounded" height={250} animation="wave" />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* First Row */}
              <Grid item xs={12}>
                <Paper style={{ height: "100%", padding: 20 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 2,
                      mb: 2,
                      color: "#332A7C",
                    }}
                  >
                    <FindInPageIcon sx={{ fontSize: "2rem" }} />
                    <Typography variant="h3">Covariates</Typography>
                  </Box>
                  {tabs.length ? (
                    <BasicTabs tabData={tabs} />
                  ) : (
                    <Box
                      sx={{
                        height: 350,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ color: "#a9a9a9", fontSize: 30 }}>
                        No Data Available
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* Second Row */}
              <Grid item xs={12} md={4}>
                <PersonCard
                  title="Principal Investigator"
                  name={person?.name}
                  email={person?.email}
                  education={person?.degree}
                />
              </Grid>

              {/* Nested Grid  */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2} sx={{ height: "100%" }}>
                  <Grid item xs={12}>
                    <InfoCard
                      title="Total Participants"
                      value={totalParticipants}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InfoCard title="Mean Age" value={meanAge} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper style={{ height: "100%", padding: 20 }}>
                  <ProjectAccordians projects={projects} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}

export default CohortDetails;
