import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../components/prebuilt/theme";
import axios from "axios";
import Container from "../../../components/prebuilt/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LightningBolt } from "@styled-icons/heroicons-outline/LightningBolt";
import PostsList from "../components/PostsList";

import KPIChart from "../components/KpiChart";

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(4),
  },
  chart: {
    display: "grid",
  },
}));

const PostsView = ({ posts }) => {
  const classes = useStyles();
  const [doneLoading, setDoneLoading] = useState();
  const [card, setCard] = useState();

  const cleanLeads = (p) => {
    let createdAtDate = new Date(p.createdAt);

    return {
      id: p.id,
      createdAt: createdAtDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      title: p.title,
      excerpt: p.excerpt,
    };
  };

  const loadData = async () => {
    let postsData = null;
    if (!posts) {
      const posts = await axios.get("/api/posts").then((r) => r.data);
      postsData = posts;
    } else {
      postsData = posts;
    }
    const shapePosts = postsData
      .map((l) => {
        return cleanLeads(l);
      })
      .sort((a, b) => a.id - b.id);
    setCard({
      title: "Leads",
      count: postsData.length,
      icon: <LightningBolt />,
      content: <PostsList posts={shapePosts} edit={true} />,
    });
  };

  useEffect(() => {
    async function load() {
      await loadData();
      setDoneLoading(true);
    }
    // Load
    load();
  }, [posts]);

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />{" "}
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <KPIChart {...card} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PostsView;
