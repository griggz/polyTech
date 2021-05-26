import React from "react";
import AppBar from "../../../components/prebuilt/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

const Header = ({ classes, handleDrawerOpen, open }) => (
  <AppBar
    position="fixed"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: open,
    })}
  >
    <Toolbar className={classes.toolbar}>
      <div className={classes.left} />
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: open,
        })}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit">
        My Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
