import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonCard from "./PersonCard";
import { Grid, Paper } from "@mui/material";
import PublicationCard from "./PublicationCard";
import BrainDataTypeCard from "./BrainDataTypeCard";
import BasicTable from "./BasicTable";
import SummaryTable from "./SummaryTable";

function InfoCards({ data }) {
  return (
    <>
      <Grid container spacing={3}>
        {data.desc && (
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ px: 1, py: 2, pb: 0 }}>
              {data.desc}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper>
            {data.cohorts ? (
              <BasicTable
                data={[
                  {
                    name: "Cohorts",
                    rows: data.cohorts,
                  },
                ]}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a9a9a9",
                  height: 250,
                  fontSize: 30,
                }}
              >
                No Cohorts present
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <PersonCard
            title="Project Lead"
            name={data.person.name}
            education={data.person.education}
            email={data.person.email}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <PublicationCard
            title="Publication"
            name={data.publication.name}
            link={data.publication.url}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <BrainDataTypeCard
            title="Brain Scan Type"
            name={data.brainScanType}
          />
        </Grid>

        {data.summary && (
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 20, py: 5 }}>
              Covariates Summary
            </Typography>
            <SummaryTable data={data.summary} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function InfoTabs({ headers, data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          {headers.map((tabVal, index) => (
            <Tab label={tabVal} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {data.map((tabData, index) => (
        <CustomTabPanel value={value} index={index}>
          <InfoCards data={tabData} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}
