import React from "react";
import Main from "../prebuilt/Main";
import MainList from "../prebuilt/MainList";
import withRoot from "../prebuilt/withRoot";
import MainFeaturedContent from "../prebuilt/MainFeaturedContent";
import AppAppBar from "../views/AppAppBar";
import Sidebar from "../prebuilt/SideBar";
import Carousel from "../prebuilt/Carousel";

//MUI
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  container: {
    // This container hides the overflow from the react-slick carousel comp
    overflow: "hidden",
  },
}));

function Post({ posts, tags, mainFeaturedContent, sidebar, list }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AppAppBar hideMenu={true} />
      {list ? (
        <Carousel>
          {mainFeaturedContent.map((d, index) => (
            <MainFeaturedContent
              key={index}
              post={d}
              center={!list ? true : false}
            />
          ))}
        </Carousel>
      ) : (
        <MainFeaturedContent
          post={mainFeaturedContent}
          center={!list ? true : false}
        />
      )}
      <Container maxWidth="xl">
        <main>
          <Grid container spacing={5} className={classes.mainGrid}>
            {list ? (
              <MainList posts={posts} tags={tags} />
            ) : (
              <Main posts={posts} />
            )}
            <Sidebar social={sidebar.social} />
          </Grid>
        </main>
      </Container>
    </div>
  );
}

export default withRoot(Post);
