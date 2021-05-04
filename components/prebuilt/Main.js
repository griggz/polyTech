import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Markdown from "../prebuilt/Markdown";
import { useSession } from "next-auth/client";
import { useRouter, withRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Typography from "../prebuilt/Typography";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  item: {
    maxWidth: 900,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    display: "flex",
  },
  adminContent: {
    margin: 0,
    padding: 0,
  },
}));

const fancyContent = ({ content, classes }) => {
  const re = "^(.*?)\\n";
  const intro = content.match(re)[0];
  const outro = content.split(intro)[1];

  const fancy = `<div><p style="font-family: Permanent Marker; font-size: 150px; margin-top: -110px; height: 150px; float: left; padding: 10px">${intro.slice(
    0,
    1
  )}</p><p style="">${intro.slice(1)}</p></div>`;

  return fancy + outro;
};

function Main({ posts }) {
  const classes = useStyles();
  const [session, loading] = useSession();

  const router = useRouter();

  const fancy = fancyContent({
    content: posts.content,
    classes: classes,
  });

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
        <Markdown className={classes.markdown}>{fancy}</Markdown>
      </Grid>
    </>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

export default withRouter(Main);
