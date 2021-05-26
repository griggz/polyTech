import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter, withRouter } from "next/router";

import { List, ListItem, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemSelected: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    borderLeft: "solid",
    color: theme.palette.secondary.main,
  },
  button: {
    color: "#A1A1B5",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontSize: 14,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.secondary.main,
      "& $icon": {
        color: theme.palette.secondary.main,
      },
    },
  },
  icon: {
    color: theme.palette.primary.main,
    minWidth: 30,
    minHeight: 30,
    maxHeight: 30,
    maxWidth: 30,
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(4),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const SidebarNav = ({ pages, className, changeView, setPages, ...rest }) => {
  const classes = useStyles();

  const navSelect = (page, index) => {
    const currPages = pages;
    currPages.map((p) => {
      if (currPages.indexOf(p) === index) {
        currPages[currPages.indexOf(p)].select = true;
      } else {
        currPages[currPages.indexOf(p)].select = false;
      }
    });
    setPages(currPages);
    return changeView(page.title);
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page, index) => (
        <ListItem
          className={page.select === true ? classes.itemSelected : classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            onClick={() => navSelect(page, index)}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title.toUpperCase()}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default withRouter(SidebarNav);
