import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "../prebuilt/Typography";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import Button from "@material-ui/core/Button";
import { Brain } from "@styled-icons/boxicons-regular/Brain";
import { FlowTree } from "@styled-icons/entypo/FlowTree";
import { CodeBlock } from "@styled-icons/boxicons-regular/CodeBlock";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundImage: "url(" + "/images/SGrid.svg" + ")",
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
    fontSize: 60,
    color: theme.palette.secondary.main,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  header: {
    pointerEvents: "none",
    position: "absolute",
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    width: "100%",
    height: "100%",
  },
  button: {
    marginTop: theme.spacing(8),
  },
  button2: {
    border: ".5px solid currentColor",
    width: "100%",
    borderRadius: 0,
    height: "auto",
    marginTop: theme.spacing(4),
    marginBottom: "-50px",
    padding: theme.spacing(2, 2),
    margin: 0,
  },
});

const WrappedComponentValues = forwardRef(function ProductValues(props, ref) {
  const { classes } = props;

  return (
    <section className={classes.root} ref={ref}>
      <Typography
        className={classes.header}
        variant="h4"
        marked="center"
        align="center"
        component="h2"
      >
        What We Do
      </Typography>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <MultilineChartIcon
                color="secondary"
                className={classes.image}
                alt="curvy lines"
              />
              <Typography variant="h6" className={classes.title}>
                Analysis & Reporting
              </Typography>
              <Typography variant="h5" marked="center" align="center">
                {"We'll make your data useful again by "}
                {
                  "consolidating, cleaning, and transforming it into something beautiful."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <DashboardIcon
                color="secondary"
                className={classes.image}
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Visualization
              </Typography>
              <Typography variant="h5" marked="center" align="center">
                {
                  "Using modern technologies and elegant web designs, we'll make your data work for you. "
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <WorkOutlineIcon
                color="secondary"
                className={classes.image}
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Consulting & Strategy
              </Typography>
              <Typography variant="h5" marked="center" align="center">
                {
                  "Now more than ever it's critical you have a knowledgeable advocate in your corner. "
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <CodeBlock className={classes.image} alt="CodeBlock" />
              <Typography variant="h6" className={classes.title}>
                Web Development
              </Typography>
              <Typography variant="h5" marked="center" align="center">
                {"We design and develop beautiful, lightning fast, scalable, "}
                {
                  "and analytics-focused websites tailored to grow your business."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <FlowTree className={classes.image} alt="FlowTree" />
              <Typography variant="h6" className={classes.title}>
                Automation
              </Typography>
              <Typography variant="h5" marked="center" align="center">
                {
                  "We help your business gain leverage and efficiency through smart & focused automation."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Brain className={classes.image} alt="brain" />
              <Typography variant="h6" className={classes.title}>
                Integrations
              </Typography>
              <Typography variant="h5" marked="center" align="center">
                {
                  "We unify your ideas with your ecosystem, truly making more out of what you have."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.item}>
              <Button
                className={classes.button2}
                component="a"
                href="/what-we-do/"
              >
                Read More
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
});

WrappedComponentValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WrappedComponentValues);
