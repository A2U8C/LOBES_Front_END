import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../theme";

function Header({ title, subTitle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="100%"
      my="10px"
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      gap="10px"
    >
      <Typography variant="h4" color={colors.blues[500]}>
        {title}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {subTitle}
      </Typography>
    </Box>
  );
}

export default Header;
