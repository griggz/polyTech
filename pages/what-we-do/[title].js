import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import Post from "../../components/views/Post";
import Container from "../../components/prebuilt/Container";
import { UpperFirstLetter } from "../../utils/StringHelper";
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

function Article() {
  const [post, setPost] = useState();
  const [tags, setTags] = useState();
  const [featuredContent, setFeaturedContent] = useState();
  const [doneLoading, setDoneLoading] = useState();

  const router = useRouter();

  const loadPosts = async () => {
    let article;
    if (router.query.title) {
      article = await axios
        .get(`/api/posts/post/${router.query.title}`)
        .then((r) => r.data);
    } else {
      console.log(router);
    }
    // build tags obj for each post
    // post.tagChips = buildTags(post.tags);
    // setState
    const featured = {
      title: article.title
        .split("_")
        .map((s) => {
          return UpperFirstLetter(s);
        })
        .join(" "),
      image: `https://source.unsplash.com/${article.image}/1600x900`,
      imgText: "main image description",
    };
    setFeaturedContent(featured);
    setPost(article);
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
      posts={post}
      sections={sections}
      mainFeaturedContent={featuredContent}
      sidebar={sidebar}
      list={false}
    />
  );
}

export default withRouter(Article);

// Added the following so the page retains its url query on page refresh (no idea why this is needed...)
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
