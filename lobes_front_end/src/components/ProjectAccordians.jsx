import React, { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import SendIcon from "@mui/icons-material/Send";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

function ProjectAccordians({ projects }) {
  const [expandedPanel, setExpandedPanel] = useState(false);
  const [listExpandPanel, setListExpandPanel] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const toggleList = (index) => {
    setListExpandPanel((prevOpenList) =>
      prevOpenList === index ? null : index
    );
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

      {projects.length ? (
        <>
          {projects.map((proj, index) => (
            <Accordion
              key={index}
              expanded={expandedPanel === proj.name}
              onChange={handleAccordionChange(proj.name)}
            >
              <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                <Typography variant="h4" sx={{ color: "#28BE8E" }}>
                  {proj.name}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {proj.cohortProjects.map((coProj, i) => (
                  <>
                    {coProj.projGroups.length ? (
                      <List
                        key={i}
                        sx={{
                          width: "100%",
                          maxWidth: 360,
                        }}
                      >
                        <ListItemButton
                          onClick={() => {
                            toggleList(coProj.name);
                          }}
                        >
                          <ListItemText primary={coProj.name} />
                          {listExpandPanel === coProj.name ? (
                            <ExpandLessRoundedIcon />
                          ) : (
                            <ExpandMoreRoundedIcon />
                          )}
                        </ListItemButton>
                        {listExpandPanel === coProj.name && (
                          <ul>
                            {coProj.projGroups.map((group, groupIndex) => (
                              <li key={groupIndex}>
                                <a href={group.url}>{group.name}</a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </List>
                    ) : (
                      <Typography sx={{ fontSize: 20, color: "#a9a9a9" }}>
                        No Project Groups Available
                      </Typography>
                    )}
                  </>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              color: "#a9a9a9",
            }}
          >
            No Projects Available
          </Typography>
        </Box>
      )}
    </>
  );
}

export default ProjectAccordians;
