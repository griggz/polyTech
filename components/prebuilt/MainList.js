import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { UpperFirstLetter } from "../../utils/StringHelper";
import { useRouter, withRouter } from "next/router";
import Chips from "../../components/prebuilt/Chips";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  item: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  image: {
    margin: `auto ${theme.spacing(1)}px`,
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {},
  chips: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

function truncString(str, n) {
  if (str.length > n) {
    return str.substring(0, n) + "...";
  } else {
    return str;
  }
}

const LineItem = ({ post, classes, router }) => (
  <List className={classes.root}>
    <ListItem alignItems="flex-start">
      <ListItemIcon className={classes.image}>
        {post.image ? (
          <Image
            src={`https://source.unsplash.com/${post.image}`}
            width={75}
            height={75}
          />
        ) : (
          ""
        )}
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Link href={`what-we-do/${post.title}`}>
              {post.title
                .split("_")
                .map((s) => {
                  return UpperFirstLetter(s);
                })
                .join(" ")}
            </Link>
          </>
        }
        secondary={
          <>
            {truncString(post.content, 100)}
            {post.tags.length > 0 && (
              <Chips
                chipOptions={post.tagChips}
                styles={classes.chips}
                size="small"
              />
            )}
          </>
        }
      />
    </ListItem>
    <Divider variant="inset" component="li" />
  </List>
);

LineItem.propTypes = {
  post: PropTypes.object,
  classes: PropTypes.object,
};

function MainList({ posts }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid item xs={12} md={8} className={classes.item}>
      {posts.map((post, index) => (
        <LineItem post={post} classes={classes} router={router} key={index} />
      ))}
    </Grid>
  );
}

MainList.propTypes = {
  posts: PropTypes.array,
};

export default withRouter(MainList);
