import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { tokens } from "../../theme";

import React, { useState } from "react";

// Util Functions

// ------------------------------------------------------------------------------------------------------------------

function CohortTable({ data, ...props }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orderDirection, setOrderDirection] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Card
      {...props}
      sx={{
        padding: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        gap="10px"
        mb={3}
      >
        <Typography
          variant="h2"
          sx={{ color: colors.blues[500], fontWeight: "bold" }}
        >
          List of Cohorts
        </Typography>
        <Divider
          sx={{
            borderBottomWidth: 2,
            bgcolor: colors.yellowAccent[500],
            borderColor: colors.yellowAccent[500],
          }}
        />
      </Box>
      <TableContainer>
        <Table>
          {/* Table header  */}
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={orderDirection}
                  onClick={() => {}}
                >
                  <Typography variant="h4">Name</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body  */}
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="h5">{row.name}</Typography>
                  {/* <Tooltip
                    sx={{
                      [`&.tooltipClasses.tooltip`]: {
                        maxWidth: 500,
                      },
                    }}
                    title={row.description}
                    placement="right"
                  >
                    <IconButton>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default CohortTable;
