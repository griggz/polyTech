import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Paper from '../prebuilt/Paper';
import { useTransition, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
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
}));

export default function Header({sections, visible}) {
  const classes = useStyles();
  console.log(visible)
  const transitions = useTransition(visible, null, {
    from: { opacity: 0, transform: "translate3d(100%, 0 ,0)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0, 0)" },
    })

  return (
    transitions.map(({ item, key, props }) =>
      item && <animated.div key={key} style={props}>
      <Paper variant="outlined">
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          {sections.map((section, idx) => (
            <Link
              color="inherit"
              noWrap
              key={idx}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </Paper>
    </animated.div>
  ))
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};