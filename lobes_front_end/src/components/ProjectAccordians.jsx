import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";

function ProjectAccordians() {
  const projects = ["PD Proj FS", "PD Proj TBSS"];
  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    console.log({ event, isExpanded });
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 2,
          mb: 2,
          color: "#332A7C",
        }}
      >
        <FolderRoundedIcon sx={{ fontSize: "2rem" }} />
        <Typography variant="h3">Projects</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />
      {projects.map((proj, index) => (
        <Accordion
          key={index}
          expanded={expandedPanel === proj}
          onChange={handleAccordionChange(proj)}
        >
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
            <Typography variant="h4" sx={{ color: "#28BE8E" }}>
              {proj}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}

export default ProjectAccordians;
