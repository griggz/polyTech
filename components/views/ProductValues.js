import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../prebuilt/Typography';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundImage: 'url(' + '/images/SGrid.svg' + ')',
    backgroundColor: theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
    fontSize: 60
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 50,
    width: '100%',
    height: '100%'
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      {/* <Image src="/images/scribble-light.png" alt="me" layout='fill' top="-180" /> */}
        {/* <img
          src="/images/scribble.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */ }
      <Container className={classes.container}>
        {/* <img src='/images/SGrid.svg' className={classes.curvyLines}/> */}
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
            <MultilineChartIcon
              color="secondary"
              className={classes.image}
              alt="curvy lines"
            />
              <Typography variant="h6" className={classes.title}>
                Data Analysis and Reporting
              </Typography>
              <Typography variant="h5">
                {"We'll make your data useful again by "}
                {'consolidating, cleaning, and transforming it into something beautiful.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <DashboardIcon
                color="secondary"
                className={classes.image}
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Interactive Dashboards
              </Typography>
              <Typography variant="h5">
                {"Take your data to the next level! "}
                {"Using modern technologies and elegant web designs, we'll make your data work for you. "}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <WorkOutlineIcon
                color="secondary"
                className={classes.image}
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Consulting
              </Typography>
              <Typography variant="h5">
                {"Now more than ever it's critical you have a knowledgeable advocate in your corner. "}
                {"Whether it's tech, policy, or analysis it's better when we're involved. "}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
