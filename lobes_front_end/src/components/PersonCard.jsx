import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Tooltip, Typography } from "@mui/material";

const PersonsCard = ({ title, name, email, education }) => {
  return (
    <Card style={{ height: "100%", position: "relative" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h5" }}
        title="Principal Investigator"
        sx={{
          color: "#332A7C",
        }}
      />
      <CardContent>
        <Typography variant="h1" color="#332A7C">
          John <span style={{ color: "#FFA000" }}>Doe</span>
        </Typography>
      </CardContent>

      <Box
        sx={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <Box
          style={{
            background: "linear-gradient(to right, #0857C5, #55BCCE)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            left: 0,
            bottom: 0,
            position: "relative",
          }}
        >
          <Box>
            <Tooltip title="PhD">
              <IconButton aria-label="education">
                <SchoolIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="example@usc.edu">
              <IconButton aria-label="email">
                <EmailIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            style={{
              marginLeft: "auto",
              color: "white",
              backgroundColor: "#28BE8E",
              borderRadius: "50%",
              border: "4px solid white",
              position: "absolute",
              bottom: "10%",
              right: "5%",
              height: "6rem",
              width: "6rem",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <PersonIcon style={{ fontSize: "4rem" }} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PersonsCard;
