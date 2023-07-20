import React, { useEffect, useState } from "react";

import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
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

  // Responsive Side Bar behaviour
  const [width, setWidth] = useState();
  function getSize() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", getSize);

    if (width < 800) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }

    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, [window.innerWidth]);

  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.blues[600]}
        rootStyles={{
          height: "100%",
        }}
        width="250px"
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  backgroundColor: active
                    ? colors.yellowAccent[500]
                    : undefined,
                  borderRadius: "0 50px 50px 0",
                  marginRight: "20px",
                  "&:hover": {
                    backgroundColor: colors.blues[100],
                    color: colors.grey[700],
                    transition: "0.5s",
                  },
                };
            },
          }}
        >
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
            <Box marginY="25px" width="100%">
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <img
                  src={Logo}
                  alt="Lobes Logo"
                  width="50px"
                  className="logo-filter"
                />

                <Typography
                  variant="h3"
                  color="#fff"
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
              <img
                src={Logo}
                alt="Lobes Logo"
                width="50px"
                className="logo-filter"
              />
            </Box>
          )}

          <Divider light />

          <Box my={3}>
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
