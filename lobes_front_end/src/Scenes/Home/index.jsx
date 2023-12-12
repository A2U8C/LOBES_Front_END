import {
  Box,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomBarChart from "../../components/charts/CustomeBarChart";
import { tokens } from "../../theme";
import CustomPieChart from "../../components/charts/CustomPieChart";
import BasicTabs from "../../components/BasicTabs";
import FindInPageIcon from "@mui/icons-material/FindInPage";

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

function Home() {
  const [barData, setBardata] = useState();
  const [pieData, setPieData] = useState();
  const [tabs, setTabs] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);

      // Call API
      const data = await getAPIData();

      var all_cohorts = [];

      // Set Barchart data
      var bData = {
        name: "Project Distribution",
        total: data.total,
        chartData: [],
        ylable: "No. Of Cohorts",
      };

      // Set Piechart Data
      var pData = {
        name: "Cohort Information",
        total: data.total,
        chartData: [
          {
            label: "Cohorts part of listed projects",
            value: 0,
          },
          {
            label: "Not listed in project",
            value: 0,
          },
        ],
      };

      var tData = [];

      data.projects.map((val) => {
        // Bar Data
        bData.chartData.push({
          label: val.name,
          value: val.cohorts.length,
        });

        // Pie Data
        if (val.name !== "Not Listed In Project") {
          val.cohorts.map((cohortName) => {
            if (!all_cohorts.includes(cohortName)) {
              all_cohorts.push(cohortName);
            }
          });
        } else {
          pData.chartData[1].value += val.cohorts.length;
        }

        var temp = {
          title: val.name,
          content: {
            cols: [
              {
                name: "Cohorts",
                rows: [],
              },
            ],
          },
        };

        val.cohorts.map((cohort) =>
          temp.content.cols[0].rows.push({
            val: cohort,
            desc: "",
          })
        );

        tData.push(temp);
        return 1;
      });

      pData.chartData[0].value = all_cohorts.length;

      setBardata(bData);
      setPieData(pData);
      setTabs(tData);

      setIsLoading(false);
    };

    setTimeout(fetchedData, 2000);
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      {isLoading ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={250} animation="wave" />
          </Grid>

          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={250} animation="wave" />
          </Grid>

          <Grid item xs={12}>
            <Skeleton variant="rounded" height={450} animation="wave" />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                py: 2,
                px: 3,
                alignContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#332A7C",
                  pb: 1,
                }}
              >
                {barData.name}
              </Typography>
              <Divider
                sx={{
                  borderBottomWidth: 2,
                  bgcolor: colors.yellowAccent[500],
                  borderColor: colors.yellowAccent[500],
                }}
              />
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <Grid item sx={{ height: 250, flex: 2 }}>
                  <CustomBarChart
                    chartData={barData.chartData}
                    name={barData.name}
                    ylable={barData.ylable}
                  />
                </Grid>

                <Grid
                  item
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "column",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#332A7C",
                      margin: 5,
                    }}
                  >
                    Total Cohorts
                  </Typography>
                  <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                    {barData.total}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ width: "100%", height: "100%", py: 2, px: 3 }}>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#332A7C",
                  pb: 1,
                }}
              >
                {pieData.name}
              </Typography>
              <Divider
                sx={{
                  borderBottomWidth: 2,
                  bgcolor: colors.yellowAccent[500],
                  borderColor: colors.yellowAccent[500],
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <CustomPieChart
                    chartData={pieData.chartData}
                    name={pieData.name}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ width: "100%", height: "100%", py: 2, px: 3 }}>
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
                <Typography variant="h3">Projects</Typography>
              </Box>

              <BasicTabs tabData={tabs} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Home;
