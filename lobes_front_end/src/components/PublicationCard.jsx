import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";

function PublicationCard({ title, name, link = "" }) {
  return (
    <>
      <Card sx={{ height: "100%", position: "relative" }}>
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
            <Typography variant="h3" color="#332A7C">
              <a href={link} target="_blank">
                {name}
              </a>
            </Typography>
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
              padding: "8px",
              left: 0,
              bottom: 0,
              position: "relative",
            }}
          >
            <Box height={30} />

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
              <DescriptionIcon style={{ fontSize: "4rem" }} />
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export default PublicationCard;
