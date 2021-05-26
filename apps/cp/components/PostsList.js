import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListItem,
  Button,
  Grid,
  Typography,
  Divider,
  Toolbar,
} from "@material-ui/core";
import { Edit } from "@styled-icons/entypo/Edit";
import Paper from "@material-ui/core/Paper";
import { useRouter, withRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    position: "relative",
  },
  itemSelected: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    borderLeft: "solid",
  },
  button: {
    color: "#A1A1B5",
    padding: "10px 8px",
    textAlign: "inherit",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontSize: 14,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.secondary.main,
      "& $icon": {
        color: theme.palette.secondary.main,
      },
    },
  },
  paper: {
    borderRadius: "0px 0px 20px 20px",
  },
  container: {
    display: "inline-block",
  },
  containerList: {
    display: "flex",
    padding: 10,
    // justifyContent: "center",
  },
  containerCard: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
  },
  paperCard: {},
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  button: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  icon: {
    minWidth: 30,
    minHeight: 30,
    maxHeight: 30,
    maxWidth: 30,
  },
}));

const CardToolbar = ({ post }) => {
  const classes = useToolbarStyles();
  const router = useRouter();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        {post.title.split("-").join(" ")}
      </Typography>
      <Button
        className={classes.button}
        onClick={() => router.push(`/posts/${post.id}`)}
      >
        <div className={classes.icon}>
          <Edit />
        </div>
      </Button>
    </Toolbar>
  );
};

const PostCards = ({ post }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperCard}>
      <CardToolbar post={post} />
      <Grid container className={classes.containerCard} spacing={1}>
        <Grid item xs={12}>
          {post.excerpt ? post.excerpt.slice(0, 300) + "..." : ""}
        </Grid>
      </Grid>
    </Paper>
  );
};

const PostsList = ({ className, posts, edit }) => {
  const classes = useStyles();
  const postsToShow = posts.slice(0, 5);

  return (
    <Paper elevation={1} className={classes.paper}>
      {edit ? (
        <Grid container className={classes.containerList} spacing={1}>
          {posts.map((post, index) => (
            <Grid item key={index} xs={3}>
              <PostCards post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <List className={clsx(classes.root, className)}>
          {postsToShow.map((post, index) => (
            <>
              <ListItem className={classes.item} disableGutters key={post.id}>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                >
                  <Grid container className={classes.container}>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Title: {post.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Excerpt:{" "}
                        {post.excerpt
                          ? post.excerpt.slice(0, 100) + "..."
                          : post.content.slice(0, 100) + "..."}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Created: {new Date(post.createdAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </ListItem>
              {index !== postsToShow.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </>
          ))}
        </List>
      )}
    </Paper>
  );
};

PostsList.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
};

export default withRouter(PostsList);
