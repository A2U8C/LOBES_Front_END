import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckIcon from "@mui/icons-material/Check";

function BasicTable({ data }) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
      <TableContainer sx={{ maxHeight: 350 }}>
        <Table stickyHeader>
          {data.map((val, index) => (
            <>
              <TableHead key={val + index}>
                <TableRow>
                  <TableCell
                    sx={{ color: "#332A7C", fontSize: 17, fontWeight: "bold" }}
                  >
                    {val.name}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {val.rows.map((row, index) => (
                  <TableRow
                    key={val + index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: 17,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 2,
                        }}
                      >
                        <Box>{row.val}</Box>
                        {row.exists && <CheckIcon />}
                      </Box>
                      {row.desc ? (
                        <Tooltip title={row.desc}>
                          <IconButton>
                            <InfoOutlinedIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          ))}
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default BasicTable;
