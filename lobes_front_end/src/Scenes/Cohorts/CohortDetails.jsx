import Header from "../../components/Header";
import { Box, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import BasicTabs from "../../components/BasicTabs";
import PersonCard from "../../components/PersonCard";
import InfoCard from "../../components/InfoCard";
import ProjectAccordians from "../../components/ProjectAccordians";

function CohortDetails({ name }) {
  return (
    <>
      <Header title="Cohort Name" subTitle={name} />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={12}>
            <Paper style={{ height: "100%", padding: 20 }}>
              <BasicTabs />
            </Paper>
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} md={4}>
            <PersonCard />
          </Grid>

          {/* Nested Grid  */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoCard title="Total Participants" value={217} />
              </Grid>
              <Grid item xs={12}>
                <InfoCard title="Mean Age" value={67.6} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ height: "100%", padding: 20 }}>
              <ProjectAccordians />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CohortDetails;
