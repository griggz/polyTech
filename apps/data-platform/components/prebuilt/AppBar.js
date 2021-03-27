import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
// My Comps;
import Feedback from "../views/control_panel/Feedback.js";
import ChangeLogDialog from "../views/control_panel/ChangeLog.js";
import theme from "../views/ui/MaterialTheme";
// MUI;
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Apps
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => router.push("/policy/")}>Policy</MenuItem>
          <MenuItem onClick={() => router.push("/hfc/")}>Data</MenuItem>
        </Menu>
        <Feedback />
        {props.credAdminStatus ? (
          <IconButtonLink href="https://unf-datahub-staging.herokuapp.com/admin/">
            <Badge badgeContent={0} color="secondary">
              <AccountCircleIcon />
            </Badge>
          </IconButtonLink>
        ) : (
          ""
        )}
        <ChangeLogDialog />

        <IconButtonLink onClick={props.handleLogout}>
          <Tooltip id="tip-logout" title="Logout">
            <ExitToAppIcon area-label="Logout" />
          </Tooltip>
        </IconButtonLink>
      </Toolbar>
    </AppBar>
  );
}
