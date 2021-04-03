import React, { useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
// My Comps;
import ChangeLogDialog from "../views/control_panel/ChangeLog.js";
import theme from "../views/ui/MaterialTheme";
import PulseButton from "../../../../components/prebuilt/PulseButton";
import DemoDialog from "../prebuilt/DemoDescription";
// MUI;
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.common.white,
    color: "#272c33",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const drawerWidth = 240;

function IconButtonLink(props) {
  return <IconButton color="inherit" component="a" {...props} />;
}

export default function CustomAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [demoInfo, setDemoInfo] = useState();
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(demoInfo);
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.open,
      })}
    >
      <Toolbar>
        {/* <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={handleDrawerOpen}
        edge='start'
        className={clsx(classes.menuButton, {
        [classes.hide]: open
        })}
    >
        <MenuIcon />
    </IconButton> */}
        <Typography variant="h6" noWrap className={classes.title}>
          Data Portal
        </Typography>

        {/* <Feedback /> */}
        <PulseButton onClick={() => setDemoInfo(true)} />
        <ChangeLogDialog />

        <IconButtonLink onClick={props.handleLogout}>
          <Tooltip id="tip-logout" title="Logout">
            <ExitToAppIcon area-label="Logout" />
          </Tooltip>
        </IconButtonLink>
      </Toolbar>
      {demoInfo && (
        <DemoDialog open={demoInfo} handleClose={() => setDemoInfo(false)} />
      )}
    </AppBar>
  );
}
