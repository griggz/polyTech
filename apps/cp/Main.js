import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import AppAppBar from "../../components/views/AppAppBar";

import Sidebar from "./components/SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    display: "flex",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: "100%",
    minHeight: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const Main = ({ children, changeView }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  const [openDrawer, setOpenDrawer] = useState(true);

  const handleDrawer = () => {
    if (openDrawer === true) {
      setOpenDrawer(false);
    } else {
      setOpenDrawer(true);
    }
  };

  // const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div className={classes.root}>
      <AppAppBar hideMenu={true} collapse={true} handleDrawer={handleDrawer} />
      <Sidebar
        open={openDrawer}
        variant={isDesktop ? "persistent" : "temporary"}
        changeView={changeView}
      />
      {/* <div className={classes.toolbar} /> */}
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
