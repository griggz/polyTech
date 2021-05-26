import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    background: `linear-gradient(
      to right,
      ${theme.palette.secondary.light} 0%,
      ${theme.palette.secondary.light} 50%,
      ${theme.palette.secondary.light} 50%,
      white 100%
    )`,
    borderRadius: "20px 20px 0px 0px",
  },
  content: {
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  title: {
    fontWeight: 500,
    display: "flex",
    width: "100%",
    margin: theme.spacing(1),
  },
  item: {
    display: "inline-flex",
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
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    background: "hotpink",
  },
}));

const KPIChart = (props) => {
  const classes = useStyles();
  const { className, title, count, icon, content, ...rest } = props;

  return (
    <div>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardContent className={classes.content}>
          <Grid container justify="space-between" className={classes.container}>
            <Grid item className={classes.item}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                <div className={classes.icon}>{icon}</div>
              </Typography>
              <Typography variant="h3" className={classes.counter}>
                <Typography variant="h5">{title}</Typography>
                <CountUp end={count} duration={2} separator="," decimals={0} />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {content ? content : ""}
    </div>
  );
};

KPIChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  content: PropTypes.array,
};

export default KPIChart;
