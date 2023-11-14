import * as React from "react";
import PropTypes from "prop-types";

import {
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Tooltip,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function TableSkeleton() {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
      <TableContainer sx={{ minHeight: 350 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Standard Properties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  mb: 3,
                }}
              >
                <TableCell>
                  <Skeleton variant="h1" animation="wave" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function BasicTable({ data }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Standard Properties</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                {row.desc ? (
                  <TableCell align="right">
                    <Tooltip title={row.desc}>
                      <IconButton>
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
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
      {value === index && <Box>{children}</Box>}
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

export default function BasicTabs({ name }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createData = (name, calories, fat, carbs, protein, desc) => {
    desc = desc ? desc : "";
    return { name, calories, fat, carbs, protein, desc };
  };

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(
      "Ice cream sandwich",
      237,
      9.0,
      37,
      4.3,
      "An Ice cream layered between cake slices"
    ),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Gingerbread", 356, 16.0, 49, 3.9, "Some Description"),
  ];

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
          <Tab label="Demographics" {...a11yProps(0)} />
          <Tab label="Cognitive" {...a11yProps(1)} />
          <Tab label="Neuropsychiatric" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BasicTable data={rows} />
        {/* <TableSkeleton />  */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BasicTable data={rows} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BasicTable data={rows} />
      </CustomTabPanel>
    </Box>
  );
}
