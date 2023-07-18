import React, { useState } from "react";

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import Logo from "../../Assets/Logo.svg";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import { Home, MenuOutlined, Groups, Close } from "@mui/icons-material";
import { tokens } from "../../theme";

const Item = ({ title, icon, to, isSelected, setIsSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={isSelected === title}
      onClick={() => {
        setIsSelected(title);
      }}
      icon={icon}
      component={<Link to={to} />}
      rootStyles={{
        color: colors.grey[100],
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function CustomSideBar() {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState("Home");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.blues[900]} !important`,
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },

        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },

        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
      }}
      height="100%"
    >
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.blues[600]}
        rootStyles={{
          height: "100%",
        }}
      >
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : <Close />}
            rootStyles={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              height: "100%",
            }}
          />
          {!isCollapsed ? (
            <Box mb="25px" width="100%">
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <img
                  src={Logo}
                  alt="Lobes Logo"
                  width="50px"
                  color={colors.grey[100]}
                />

                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  mt="10px"
                  textTransform="uppercase"
                >
                  Lobes
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              my="30px"
            >
              <img src={Logo} alt="Lobes Logo" width="50px" />
            </Box>
          )}

          <Divider light />

          <Box>
            <Item
              title="Home"
              icon={<Home />}
              to="/"
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />

            <Item
              title="Cohorts"
              icon={<Groups />}
              to="/cohorts"
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default CustomSideBar;
