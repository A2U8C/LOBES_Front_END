import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import QuerySelector from "../../components/QuerySelector";
import StorageIcon from "@mui/icons-material/Storage";
import ClearIcon from "@mui/icons-material/Clear";
import { tokens } from "../../theme";
import TableComponent from "../../components/TableComponent";

function Covariates() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box mx={2}>
      <Header title="Covariates" />
      <Grid container spacing={2} rowSpacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              width: "100%",
              height: 450,
              px: 2,
              py: 3,
            }}
          >
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
              <StorageIcon sx={{ fontSize: "2rem" }} />
              <Typography variant="h3">Search Query</Typography>
            </Box>
            <Divider
              sx={{
                borderBottomWidth: 2,
                bgcolor: colors.yellowAccent[500],
                borderColor: colors.yellowAccent[500],
                mb: 3,
              }}
            />
            <QuerySelector
              setResults={setResults}
              setIsLoading={setIsLoading}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {results ? (
          <Paper
            sx={{
              width: "100%",
              px: 2,
              py: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 2,
                color: "#332A7C",
              }}
            >
              <Typography variant="h3">Results</Typography>
              <IconButton
                onClick={() => {
                  setResults(undefined);
                  setIsLoading(false);
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>
            <Divider
              sx={{
                borderBottomWidth: 2,
                bgcolor: colors.yellowAccent[500],
                borderColor: colors.yellowAccent[500],
                mb: 3,
              }}
            />
            {results.length ? (
              <TableComponent results={results} headers={["Cohort Name"]} />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 230,
                  color: "#a9a9a9",
                }}
              >
                <h1>No Cohorts Found</h1>
              </Box>
            )}
          </Paper>
        ) : isLoading ? (
          <Paper
            sx={{
              width: "100%",
              px: 2,
              py: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 2,
                color: "#332A7C",
              }}
            >
              <Typography variant="h3">Results</Typography>
            </Box>
            <Divider
              sx={{
                borderBottomWidth: 2,
                bgcolor: colors.yellowAccent[500],
                borderColor: colors.yellowAccent[500],
                mb: 3,
              }}
            />

            <Skeleton variant="rounded" height={350} animation="wave" />
          </Paper>
        ) : (
          <Box></Box>
        )}
      </Grid>
    </Box>
  );
}

export default Covariates;
