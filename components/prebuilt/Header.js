import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Paper from "../prebuilt/Paper";
import { useTransition, animated } from "react-spring";

const useStyles = makeStyles((theme) => ({
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
  subBar: {
    toolbar: theme.mixins.toolbar,
  },
}));

export default function Header({ sections, visible }) {
  const classes = useStyles();

  return (
    <Paper variant="outlined">
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section, idx) => (
          <Link
            color="inherit"
            noWrap
            key={idx}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </Paper>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
