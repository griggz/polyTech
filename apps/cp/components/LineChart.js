import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import LineViz from "../../../components/prebuilt/charts/NivoLine";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    width: "100%",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: 500,
    width: "100%",
    margin: theme.spacing(1),
  },
  item: {
    width: "100%",
  },
  icon: {
    color: theme.palette.secondary.main,
    minWidth: 40,
    minHeight: 40,
    maxHeight: 40,
    maxWidth: 40,
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
    position: "relative",
  },
  container: {
    width: "100%",
  },
  backSplash: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    background: "hotpink",
  },
}));

const LineChart = ({ className, lineData, title, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <Grid container justify="space-between" className={classes.container}>
          <Grid item className={classes.item}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h3"
            >
              {title}
            </Typography>
            <LineViz
              data={lineData}
              height={300}
              yAxisTitle={"Count"}
              xAxisTitle={"Date"}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

LineChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  lineData: PropTypes.array,
};

export default LineChart;
