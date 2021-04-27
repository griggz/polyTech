import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { UpperFirstLetter } from "../../utils/StringHelper";
import { useRouter, withRouter } from "next/router";
import Chips from "../../components/prebuilt/Chips";
import Image from "next/image";
import Paginate from "../../components/prebuilt/Pagination";
import ChipMenu from "../../components/prebuilt/ChipMenu";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  title: {
    fontSize: 25,
  },
  item: {
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
  excerpt: {
    fontSize: 18,
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
  },
}));

const StyledLink = styled.a`
  color: #ff3366;
  cursor: pointer;
  font-size: 25px;
`;

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
            width={150}
            height={150}
          />
        ) : (
          ""
        )}
      </ListItemIcon>
      <ListItemText
        primary={
          <>
            <Link href={`what-we-do/${post.title}`}>
              <StyledLink>
                {post.title
                  .split("-")
                  .map((s) => {
                    return UpperFirstLetter(s);
                  })
                  .join(" ")}
              </StyledLink>
            </Link>
          </>
        }
        secondary={
          <>
            <div className={classes.excerpt}>
              {truncString(post.excerpt, 500)}
            </div>
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

function MainList({ posts, tags }) {
  const classes = useStyles();
  const router = useRouter();
  const [postList, setPostList] = useState(posts);

  // pagination
  const postsPerPage = 10;
  const total = Math.ceil(postList.length / postsPerPage);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [tagFilter, setTagFilter] = useState([]);
  const [postsDisplay, setPostsDisplay] = useState(
    postList.slice(postsPerPage * (page - 1), postsPerPage * page)
  );
  const handleSlideRight = () => slide(1);
  const handleSlideLeft = () => slide(-1);

  const slide = (offset) => {
    const newIndex = Math.min(Math.max(index + offset, 0), total);
    const newPage = Math.min(Math.max(page + offset, 0), total);
    setIndex(newIndex);
    setPage(newPage);
    setPostsDisplay(
      posts.slice(postsPerPage * (newPage - 1), postsPerPage * newPage)
    );
  };

  const handleTopicFilter = async (value) => {
    const values = value.map((v) => {
      return v.title;
    });
    if (value.length === 0) {
      setTagFilter(value);
      setPostList(posts);
      setPostsDisplay(
        posts.slice(postsPerPage * (page - 1), postsPerPage * page)
      );
    } else {
      setTagFilter(value);
      const filter = posts.filter(function (item) {
        return values.every((v) => item.tagTitles.includes(v));
      });
      setPostsDisplay(
        filter.slice(postsPerPage * (page - 1), postsPerPage * page)
      );
    }
  };

  return (
    <Grid item xs={12} md={8} className={classes.item}>
      <ChipMenu
        handleChange={handleTopicFilter}
        toggleOptions={tagFilter}
        options={tags}
        title={"Topics"}
      />
      {postsDisplay.length > 0 ? (
        postsDisplay.map(
          (post, index) =>
            !post.draft && (
              <LineItem
                post={post}
                classes={classes}
                router={router}
                key={index}
              />
            )
        )
      ) : (
        <p>No articles meet the filter criteria</p>
      )}
      <Paginate
        index={index}
        total={total}
        handleSlideLeft={handleSlideLeft}
        handleSlideRight={handleSlideRight}
      />
    </Grid>
  );
}

MainList.propTypes = {
  posts: PropTypes.array,
};

export default withRouter(MainList);
