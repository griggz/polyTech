import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Markdown from "../prebuilt/Markdown";
import { useSession } from "next-auth/client";
import { useRouter, withRouter } from "next/router";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  item: {
    maxWidth: 900,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    whiteSpace: "pre-wrap",
  },
  adminContent: {
    margin: 0,
    padding: 0,
  },
}));

function Main({ posts }) {
  const classes = useStyles();
  const [session, loading] = useSession();

  const router = useRouter();

  return (
    <>
      {session && session.user.groups.includes("admin") && (
        <Grid xs={12} md={8} className={classes.adminContent}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push(`/posts/${posts.id}`)}
          >
            Edit
          </Button>
        </Grid>
      )}
      <Grid item xs={12} md={8} className={classes.item}>
        <Markdown className={classes.markdown}>{posts.content}</Markdown>
      </Grid>
    </>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

export default withRouter(Main);
