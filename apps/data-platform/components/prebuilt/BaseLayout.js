import React, { useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";
// My Componants;
import theme from "../views/ui/MaterialTheme";
import CustomAppBar from "../prebuilt/AppBar";
import Footer from "../prebuilt/Footer";
// Material-UI;
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// Icons;
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import MapIcon from "@material-ui/icons/Map";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PublishIcon from "@material-ui/icons/Publish";

// defaults required for interacting with django API
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const drawerWidth = 240;

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles(() => ({
  root: {
    // display: "flex",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
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
    marginLeft: theme.spacing(9),
    backgroundColor: "#f8f9fa",
    padding: theme.spacing(2),
    height: "100%",
  },
  divider: {
    background: theme.palette.primary.light,
  },
  list: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  icon: {
    color: theme.palette.common.white,
  },
}));

function HfcApp(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // ROUTER
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = (event) => {
    router.push("/");
  };

  const childrenWithProps = React.Children.map(props.children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    const props = { baseLayout: "testing" };
    if (React.isValidElement(child)) {
      return React.cloneElement(child, props);
    }
    return child;
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <CustomAppBar handleLogout={handleLogout} open={open} />
        <Drawer
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
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon className={classes.icon} />
              ) : (
                <ChevronLeftIcon className={classes.icon} />
              )}
            </IconButton>
          </div>
          <List>
            <ListItemLink
              className={classes.list}
              href="/data-platform/portal/"
            >
              <ListItemIcon>
                <Tooltip id="tip-dashboard" title="Dashboard">
                  <DashboardIcon
                    className={classes.icon}
                    area-label="Dashboard"
                  />
                </Tooltip>
              </ListItemIcon>
              <ListItemText background="primary" primary="Dashboard" />
            </ListItemLink>

            <Divider className={classes.divider} />
            <ListSubheader
              style={{ color: "#676b70", fontWeight: "400" }}
              inset
            >
              Tools
            </ListSubheader>

            <ListItemLink
              className={classes.list}
              href="/data-platform/portal/upload/"
            >
              <ListItemIcon>
                <Tooltip id="tip-comparison" title="Bulk Upload">
                  <PublishIcon
                    className={classes.icon}
                    area-label="Bulk Upload"
                  />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Bulk Upload" />
            </ListItemLink>

            <ListItemLink
              className={classes.list}
              href="/data-platform/portal/data-comparison-tool"
            >
              <ListItemIcon>
                <Tooltip id="tip-comparison" title="State Comparison">
                  <CompareArrowsIcon
                    className={classes.icon}
                    area-label="State Comparison"
                  />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="State Comparison" />
            </ListItemLink>

            <ListItemLink
              className={classes.list}
              href="/data-platform/portal/regional-analysis"
            >
              <ListItemIcon>
                <Tooltip id="tip-regions" title="Region Analysis">
                  <MapIcon
                    className={classes.icon}
                    area-label="Region Analysis"
                  />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Region Analysis" />
            </ListItemLink>

            <Divider className={classes.divider} />

            <ListItemLink className={classes.list} onClick={handleLogout}>
              <ListItemIcon>
                <Tooltip id="tip-logout" title="Logout">
                  <ExitToAppIcon className={classes.icon} area-label="Logout" />
                </Tooltip>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemLink>

            <Divider className={classes.divider} />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {childrenWithProps}
          <Footer />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default HfcApp;
