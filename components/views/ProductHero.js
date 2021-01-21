import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '../prebuilt/Button';
import Typography from '../prebuilt/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Typer from '../prebuilt/Typer';

const backgroundImage =
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?ixid?auto=format&fit=crop&w=1400&q=80';
const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(7),
    },
  },
  more: {
    marginTop: theme.spacing(4),
  },
  typer: {
    color: theme.palette.accent.main
  }
});

function ProductHero(props) {
  const { classes } = props;
  const typerOptions = ['business.', 'startup.', 'non-profit.', 'agency.']

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        A modern approach to data for your
        <Typography className={classes.typer} align="center" variant="h2">
          <Typer options={typerOptions}/>
        </Typography>
      </Typography>

      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        We pride ourselves on our ability to achieve success, no matter the challenge.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/contact-us/"
      >
        Get Started
      </Button>
      <Typography variant="body1" align="center" color="inherit" className={classes.more}>
        Let's partner together and engineer your next game-changing idea.
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);
