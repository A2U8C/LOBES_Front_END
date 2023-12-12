import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const renderRow = (row) => {
  let rowKeys = Object.keys(row).slice(2);
  return row.Cohorts.map((cohort, index) => (
    <TableRow key={index}>
      {index === 0 && (
        <TableCell rowSpan={row.Cohorts.length} sx={{ fontSize: 14 }}>
          {row.Site}
        </TableCell>
      )}
      <TableCell sx={{ fontSize: 14 }}>{cohort}</TableCell>
      {rowKeys.map((key) => {
        if (Array.isArray(row[key])) {
          return (
            <React.Fragment key={key}>
              {row[key][index] && (
                <TableCell sx={{ fontSize: 14 }}>
                  {row[key][index].HC}
                </TableCell>
              )}
              {row[key][index] && (
                <TableCell sx={{ fontSize: 14 }}>
                  {row[key][index].PD}
                </TableCell>
              )}
            </React.Fragment>
          );
        }
        return null;
      })}
    </TableRow>
  ));
};

const SummaryTable = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <TableContainer component={Paper} elevation={5} sx={{ px: 2, py: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableCell
                key={index}
                colSpan={index > 1 ? 2 : 1}
                sx={{
                  fontSize: 14,
                  fontWeight: "bolder",
                  color: colors.blues[500],
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {data.subHeaders.map((subHeader, index) => (
              <TableCell
                key={index}
                sx={{
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              >
                {subHeader}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body  */}
        <TableBody>{data.rows.map((row) => renderRow(row))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryTable;
