import React, { useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Container from "@material-ui/core/Container";
import Typography from "../prebuilt/Typography";
import Grid from "@material-ui/core/Grid";
import Markdown from "../prebuilt/Markdown";
import AboutIntro from "../prebuilt/posts/landing/about_intro.md";
import AboutEnding from "../prebuilt/posts/landing/about_ending.md";
import { useSpring, animated as a } from "react-spring";

const imageFront =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=800&q=80";

const imageBack =
  "https://images.unsplash.com/photo-1603457616812-2ab4f9a4dc55?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=800&q=80";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  item: {
    maxWidth: 900,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(0, 0),
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "40vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100,
    },
    "&:hover": {
      zIndex: 1,
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15,
    },
    "&:hover $imageMarked": {
      opacity: 0,
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor",
    },
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrcFront: {
    position: "absolute",
    backgroundImage: `url(${imageFront})`,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    borderRadius: 75,
  },
  imageSrcBack: {
    position: "absolute",
    backgroundImage: `url(${imageBack})`,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    borderRadius: 75,
  },
});

const WrappedComponentAbout = forwardRef(function ProductAbout(props, ref) {
  const { classes } = props;
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <Container className={classes.root} component="section" ref={ref}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Who We Are
      </Typography>
      <Grid item xs={12} className={classes.item}>
        <Markdown className={classes.markdown}>{AboutIntro}</Markdown>
        <div onClick={() => set((state) => !state)}>
          <div className={classes.images}>
            <ButtonBase
              className={classes.imageWrapper}
              component="div"
              style={{
                width: 500,
                minHeight: 250,
              }}
            >
              <a.div
                className={classes.imageSrcFront}
                style={{
                  opacity: opacity.interpolate((o) => 1 - o),
                  transform,
                }}
              />
              <a.div
                className={classes.imageSrcBack}
                style={{
                  opacity,
                  transform: transform.interpolate(
                    (t) => `${t} rotateX(180deg)`
                  ),
                }}
              />
            </ButtonBase>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={8} className={classes.item}>
        <Markdown className={classes.markdown}>{AboutEnding}</Markdown>
      </Grid>
    </Container>
  );
});

WrappedComponentAbout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WrappedComponentAbout);
