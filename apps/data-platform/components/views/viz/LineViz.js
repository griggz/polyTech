import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LineChart from "../../prebuilt/LineChart";
import theme from "../ui/MaterialTheme";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

// chart toolbar styles
const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

// chart toolbar
const PaperToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        color="secondary"
        variant="h6"
        id="tableTitle"
      >
        Metrics Consolidation
      </Typography>
    </Toolbar>
  );
};

export default function RadarVizSlider({ data }) {
  return (
    <>
      <PaperToolbar />
      <LineChart data={data} />
    </>
  );
}
