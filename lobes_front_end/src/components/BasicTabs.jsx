import { useState } from "react";
import PropTypes from "prop-types";

import { Tabs, Tab, Box } from "@mui/material";
import BasicTable from "./BasicTable";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const { tabData } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          {tabData.map((tabs, index) => (
            <Tab label={tabs.title} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </Box>

      {tabData.map((tab, index) => (
        <CustomTabPanel value={value} index={index}>
          <BasicTable data={tab.content.cols} />
        </CustomTabPanel>
      ))}
    </Box>
  );
}

BasicTabs.prototype = {
  name: PropTypes.string.isRequired,
  tabsNames: PropTypes.array.isRequired,
};
