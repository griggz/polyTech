import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../prebuilt/AppBar';
import Toolbar, { styles as toolbarStyles } from '../prebuilt/Toolbar';
import MuiTooltip from '../prebuilt/Tooltip';
import {SignOut} from '@styled-icons/octicons/SignOut';
import { signIn, signOut, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Header from '../prebuilt/Header';

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    [theme.breakpoints.down('md')]: {
      flex: 0,
    },
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      visibility: 'hidden'
    },
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  icon: {
    width: 30,
    [theme.breakpoints.down('xs')]: {
      width: 20,
    },
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
});

function AppAppBar(props) {
  const { classes, sections, subHeaderVisible, handleClick } = props;
  const [ session, loading ] = useSession();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'avec'}
          </Link>
          <div className={classes.right}>
            <ButtonGroup variant="text" aria-label="outlined primary button group">
              <Button
                  color="inherit"
                  component='a'
                  className={classes.rightLink}
                  onClick={handleClick ? handleClick.values : ''}
                >
                  {'Our Work'}
               </Button>
               <Button
                  color="inherit"
                  component='a'
                  className={classes.rightLink}
                  onClick={handleClick ? handleClick.about : ''}
                >
                  {'About Us'}
               </Button>
               <Button
                  color="inherit"
                  component='a'
                  className={classes.rightLink}
                  onClick={handleClick ? handleClick.contact : ''}
                >
                  {'Contact Us'}
               </Button>
                <MuiTooltip text={!session && !loading ? 'Sign In': 'Sign Out'}>
                  <Button
                    color="inherit"
                    component='a'
                    className={clsx(classes.rightLink, classes.linkSecondary)}
                    onClick={!session ? signIn : signOut}
                  >
                    {!session && !loading ? 'Sign In' : <SignOut className={classes.icon}/>}
                  </Button>
                </MuiTooltip>
            </ButtonGroup>
          </div>
        </Toolbar>
        {sections && subHeaderVisible
          ? <Header sections={sections} visible={subHeaderVisible} />
          : ''
        }
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
