import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "../prebuilt/AppBar";
import Toolbar, { styles as toolbarStyles } from "../prebuilt/Toolbar";
import MuiTooltip from "../prebuilt/Tooltip";
import { SignOut } from "@styled-icons/octicons/SignOut";
import { signIn, signOut, useSession } from "next-auth/client";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Header from "../prebuilt/Header";
import MenuDrop from "../prebuilt/MenuDrop";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import Slide from "@material-ui/core/Slide";

const styles = (theme) => ({
  title: {
    fontSize: 24,
    fontFamily: "Permanent Marker",
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      flex: 0,
    },
    [theme.breakpoints.down("xs")]: {
      flex: 1,
    },
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      display: "none",
    },
  },
  rightLinkAlt: {
    fontSize: 16,
    color: theme.palette.accent.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      display: "none",
    },
  },
  rightStackedMenu: {
    [theme.breakpoints.up("xl")]: {
      display: "none",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  icon: {
    width: 30,
    [theme.breakpoints.down("xs")]: {
      width: 20,
    },
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
});

const MenuLink = ({ title, session, loading, classes }) => {
  const path = {
    "Data Portal": "/data-platform/portal/",
    "Stripe Integration Flow": "/stripe-donate/",
  };
  if (session) {
    return (
      <Link
        underline="none"
        color="inherit"
        href={
          session.user.leads ? path[title] : `/contact-us?next=${path[title]}`
        }
      >
        <MenuItem>{title}</MenuItem>
      </Link>
    );
  } else {
    return (
      <Link underline="none" color="inherit" onClick={signIn}>
        <MenuItem>{title}</MenuItem>
      </Link>
    );
  }
};

function AppAppBar(props) {
  const { classes, sections, subHeaderVisible, handleClick, hideMenu } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [session, loading] = useSession();

  const handleAppClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {"avec"}
          </Link>
          <div className={classes.right}>
            <div className={classes.rightStackedMenu}>
              <MenuDrop>
                <MenuItem onClick={!session ? signIn : signOut}>
                  {!session && !loading ? "Sign In" : "Sign Out"}
                </MenuItem>
                <MenuLink
                  title="Data Portal"
                  session={session}
                  loading={loading}
                  classes={classes}
                />
                <MenuLink
                  title="Stripe Integration Flow"
                  session={session}
                  loading={loading}
                  classes={classes}
                />
              </MenuDrop>
            </div>
            <ButtonGroup
              variant="text"
              aria-label="outlined primary button group"
            >
              {!hideMenu && (
                <>
                  <Button
                    color="inherit"
                    component="a"
                    className={classes.rightLink}
                    onClick={handleClick ? handleClick.values : ""}
                  >
                    {"Our Work"}
                  </Button>
                  <Button
                    color="inherit"
                    component="a"
                    className={classes.rightLink}
                    onClick={handleClick ? handleClick.about : ""}
                  >
                    {"About Us"}
                  </Button>
                  <Button
                    color="inherit"
                    component="a"
                    className={classes.rightLink}
                    onClick={handleClick ? handleClick.contact : ""}
                  >
                    {"Contact Us"}
                  </Button>
                  <>
                    <Button
                      aria-controls="fade-menu"
                      color="inherit"
                      aria-haspopup="true"
                      className={classes.rightLinkAlt}
                      onClick={handleAppClick}
                    >
                      Demos
                    </Button>
                    <Menu
                      id="fade-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={() => {
                        setAnchorEl(null);
                      }}
                      TransitionComponent={Fade}
                    >
                      <MenuLink
                        title="Data Portal"
                        session={session}
                        loading={loading}
                        classes={classes}
                      />
                      <MenuLink
                        title="Stripe Integration Flow"
                        session={session}
                        loading={loading}
                        classes={classes}
                      />
                    </Menu>
                  </>
                </>
              )}
              <MuiTooltip text={!session && !loading ? "Sign In" : "Sign Out"}>
                <Button
                  color="inherit"
                  component="a"
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  onClick={!session ? signIn : signOut}
                >
                  {!session && !loading ? (
                    "Sign In"
                  ) : (
                    <SignOut className={classes.icon} />
                  )}
                </Button>
              </MuiTooltip>
            </ButtonGroup>
          </div>
        </Toolbar>
        {sections && subHeaderVisible ? (
          <Slide direction="down">
            <Header sections={sections} visible={subHeaderVisible} />
          </Slide>
        ) : (
          ""
        )}
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
