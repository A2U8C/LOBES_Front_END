import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Tooltip, Typography } from "@mui/material";

const PersonsCard = ({ title, name = "", email = "", education = "" }) => {
  var names = [];
  if (Array.isArray(name)) {
    for (let index = 0; index < name.length; index++) {
      names.push(name[index]);
    }
  } else {
    names.push(name);
  }
  return (
    <Card style={{ height: "100%", position: "relative" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h4" }}
        title={title}
        sx={{
          color: "#332A7C",
        }}
      />
      {name ? (
        <CardContent
          sx={{
            pb: 10,
            display: "flex",
            alignItems: "start",
            justifyContent: "space-evenly",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {names.map((val, index) => (
            <Typography variant="h1" color="#332A7C" key={index}>
              {val.split(" ")[0]}
              <br />
              <span style={{ color: "#FFA000" }}>
                {val.split(" ").slice(1).join(" ")}
              </span>
            </Typography>
          ))}
        </CardContent>
      ) : (
        <CardContent>
          <Typography
            sx={{
              fontSize: 40,
              color: "#a9a9a9",
              pb: 10,
            }}
          >
            Unavailable
          </Typography>
        </CardContent>
      )}

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
            padding: 8,
            left: 0,
            bottom: 0,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {education ? (
              <Tooltip title={education}>
                <IconButton aria-label="education">
                  <SchoolIcon style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Box height={30} />
            )}

            {email ? (
              <Tooltip title={email}>
                <IconButton aria-label="email">
                  <EmailIcon style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Box height={30} />
            )}
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
