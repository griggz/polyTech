import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "../prebuilt/Button";
import Typography from "../prebuilt/Typography";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import { Rocket } from "@styled-icons/icomoon/Rocket";

const styles = (theme) => ({
  root: {
    display: "flex",
    backgroundImage: "url(" + "/images/SGrid.svg" + ")",
    backgroundColor: theme.palette.secondary.light,
    overflow: "hidden",
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    fontSize: 60,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

const WrappedComponentContact = forwardRef(function ProductHowItWorks(
  props,
  ref
) {
  const { classes } = props;

  return (
    <section className={classes.root} ref={ref}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          How we work
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <QuestionAnswerIcon alt="suitcase" className={classes.image} />
                <Typography variant="h5" align="center">
                  Send us a message!
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <EmojiPeopleIcon alt="graph" className={classes.image} />
                <Typography variant="h5" align="center">
                  {"Let's chat and learn more about how we can help you!"}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <Rocket alt="clock" className={classes.image} />
                <Typography variant="h5" align="center">
                  {"Let's build something amazing, together."}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="/contact-us/"
        >
          Get started
        </Button>
      </Container>
    </section>
  );
});

WrappedComponentContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WrappedComponentContact);
