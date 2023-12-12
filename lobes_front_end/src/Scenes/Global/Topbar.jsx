import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import React, { useContext, useState } from "react";
import { ColorContextMode } from "../../theme";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

function Topbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorContextMode);

  const [wg, setWg] = useState("PD WG");

  const handleChange = (event) => {
    setWg(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="space-between" px={2} my={2}>
      {/* Working Group Select Dropdown  */}
      <Box sx={{ minWidth: "50%" }}>
        <FormControl fullWidth>
          <InputLabel id="WG-select-label">Working Group</InputLabel>
          <Select
            labelId="WG-select-label"
            id="WG-simple-select"
            value={wg}
            label="Working Group"
            onChange={handleChange}
          >
            <MenuItem value="PD WG">Parkinson's Disease Working Group</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Icons  */}
      {/* <Box display="flex" justifyContent="space-evenly">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
      </Box> */}
    </Box>
  );
}

export default Topbar;
