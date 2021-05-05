import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Paper from "../prebuilt/Paper";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(4, 3),
    backgroundImage: "url(" + "/images/SGrid.svg" + ")",
    backgroundColor: theme.palette.secondary.light,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8, 6),
    },
  },
});

function AppForm(props) {
  const { children, classes, className, maxWidth, custom } = props;
  return (
    <div className={classes.root}>
      <Container maxWidth={maxWidth || "sm"}>
        <Box mt={7} mb={12}>
          <Paper className={className || classes.paper}>{children}</Paper>
        </Box>
      </Container>
    </div>
  );
}

AppForm.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppForm);
