import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../prebuilt/AppBar';
import Toolbar, { styles as toolbarStyles } from '../prebuilt/Toolbar';
import MuiTooltip from '../prebuilt/Tooltip';
import {Database} from '@styled-icons/remix-line/Database';
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
      fontSize: 11,
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
    justifyContent: 'space-betw een',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
});

function AppAppBar(props) {
  const { classes, sections, subHeaderVisible } = props;
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
            {'dac'}
          </Link>
          <div className={classes.right}>
            <ButtonGroup variant="text" aria-label="outlined primary button group">
              <MuiTooltip text={!session ? 'Sign In': 'DataHub'}>
                <Button
                  color="inherit"
                  component='a'
                  className={classes.rightLink}
                  href= {session ? 'https://dac-datahub-staging.herokuapp.com' : undefined}
                  onClick={!session ? signIn : undefined}
                >
                  {!session ? 'Sign In' : <Database className={classes.icon}/>}
                </Button>
              </MuiTooltip>
              <MuiTooltip text={!session ? 'Sign Up': 'Sign Out'}>
                <Button
                  color="inherit"
                  component='a'
                  className={clsx(classes.rightLink, classes.linkSecondary)}
                  href= {!session ? "/auth/sign-up/" : undefined}
                  onClick={session ? signOut : undefined}
                >
                  {!session ? 'Sign Up' : <SignOut className={classes.icon}/>}
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
