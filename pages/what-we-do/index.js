import React, { useState, useEffect } from "react";
import axios from "axios";
import introduction from "../../components/prebuilt/posts/web_development/introduction.md";
import Post from "../../components/views/Post";
import Container from "../../components/prebuilt/Container";
// MUI
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import CircularProgress from "@material-ui/core/CircularProgress";

const sections = [
  { title: "Our Process", url: "#" },
  { title: "Apps", url: "#" },
  { title: "Dashboards", url: "#" },
  { title: "Tailored Solutions", url: "#" },
];

const mainFeaturedContent = {
  title: "Build something uniquely tailored to your vision",
  description: [
    "Deploying effective web experiences is integral to any succesful project.",
    "Whether its a dashboard, a simple visualization, or an entire website, ",
    "we cover the breadth of what's possible.",
  ].join(" "),
  image:
    "https://images.unsplash.com/photo-1584291527908-033f4d6542c8?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format",
  imgText: "main image description",
};

const sidebar = {
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

const buildTags = (tags) => {
  const tagsObj = {};
  if (tags) {
    const existingTags = tags.map((t) => {
      return t.title;
    });
    // set existing tags
    existingTags.forEach(
      (key, i) =>
        (tagsObj[key] = {
          label: key,
          value: false,
        })
    );
    return tagsObj;
  }
};

export default function WhatWeDo() {
  const [posts, setPosts] = useState();
  const [tags, setTags] = useState();
  const [doneLoading, setDoneLoading] = useState();

  const loadPosts = async () => {
    const posts = await axios.get("/api/posts").then((r) => r.data);
    const tags = await axios.get("/api/posts/tags/").then((r) => r.data);

    // build tags obj for each post
    posts.map((p) => {
      p.tagChips = buildTags(p.tags);
    });
    setTags(tags);
    // setState
    setPosts(posts);
  };

  useEffect(() => {
    async function load() {
      await loadPosts();
      setDoneLoading(true);
    }
    // Load
    load();
  }, []);

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />
      </Container>
    );
  }

  return (
    <Post
      posts={posts}
      sections={sections}
      mainFeaturedContent={mainFeaturedContent}
      sidebar={sidebar}
      list={true}
    />
  );
}
