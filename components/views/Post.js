import React, { useState } from "react";
import Main from "../prebuilt/Main";
import MainList from "../prebuilt/MainList";
import withRoot from "../prebuilt/withRoot";
import MainFeaturedContent from "../prebuilt/MainFeaturedContent";
import AppAppBar from "../views/AppAppBar";
import Header from "../prebuilt/Header";
import Sidebar from "../prebuilt/SideBar";
import useScroll from "../../components/hooks/UseScroll";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

function Post({ posts, sections, mainFeaturedContent, sidebar, list }) {
  const classes = useStyles();
  const scrolled = useScroll();

  return (
    <>
      <AppAppBar sections={sections} subHeaderVisible={scrolled >= 504} />
      <MainFeaturedContent post={mainFeaturedContent} />
      <Header position="sticky" sections={sections} visible={true} />
      <Container maxWidth="xl">
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            {list ? <MainList posts={posts} /> : <Main posts={posts} />}
            <Sidebar social={sidebar.social} />
          </Grid>
        </main>
      </Container>
    </>
  );
}

export default withRoot(Post);
