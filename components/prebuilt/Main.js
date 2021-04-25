import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Markdown from "../prebuilt/Markdown";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  item: {
    maxWidth: 900,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function Main({ posts }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8} className={classes.item}>
      <Markdown className={classes.markdown}>{posts.content}</Markdown>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};
