import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function InfoCard({ title, value }) {
  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          gutterBottom
          sx={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: 40, color: "#332A7C", fontWeight: "bold" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
