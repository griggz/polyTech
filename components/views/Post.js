import Main from '../prebuilt/Main';
import withRoot from '../prebuilt/withRoot';
import MainFeaturedContent from '../prebuilt/MainFeaturedContent';
import AppAppBar from '../views/AppAppBar';
import Header from '../prebuilt/Header';
import Sidebar from '../prebuilt/SideBar'
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));


function Post(props) {
  const classes = useStyles();
  const {posts, sections, mainFeaturedContent, sidebar} = props
  return (
    <>
    <AppAppBar />
    <Header sections={sections} />
    <MainFeaturedContent post={mainFeaturedContent} />
    <Container maxWidth="lg">
      <main>
        <Grid container spacing={5} className={classes.mainGrid}>
          <Main posts={posts} />
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
        </Grid>
      </main>
  </Container>
  </>
  )
}

export default withRoot(Post)