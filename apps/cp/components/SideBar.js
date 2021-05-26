import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { Pen } from "@styled-icons/boxicons-regular/Pen";
import { CheckCircle } from "@styled-icons/boxicons-regular/CheckCircle";
import { Users } from "@styled-icons/entypo/Users";
import { Dashboard } from "@styled-icons/material-outlined/Dashboard";
import { LightningBolt } from "@styled-icons/heroicons-outline/LightningBolt";
import SidebarNav from "./SideBarNav";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    paddingTop: theme.spacing(12),
  },
  divider: {
    margin: theme.spacing(4, 0, 1),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    borderRight: "none",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    borderRight: "none",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Sidebar = ({ open, className, changeView, ...rest }) => {
  const classes = useStyles();
  const [pages, setPages] = useState([
    {
      title: "dashboard",
      href: "/dashboard",
      icon: <Dashboard />,
      select: true,
    },
    {
      title: "users",
      href: "/users",
      icon: <Users />,
      select: false,
    },
    {
      title: "subscriptions",
      href: "/subscriptions",
      icon: <CheckCircle />,
      select: false,
    },
    {
      title: "leads",
      href: "/leads",
      icon: <LightningBolt />,
      select: false,
    },
    {
      title: "posts",
      href: "/posts",
      icon: <Pen />,
      select: false,
    },
  ]);

  return (
    <Drawer
      anchor="left"
      open={open}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        {/* <Profile /> */}
        {/* <Divider className={classes.divider} /> */}
        <SidebarNav
          className={classes.nav}
          pages={pages}
          setPages={setPages}
          changeView={changeView}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
