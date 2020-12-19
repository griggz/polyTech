import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useSpring, animated } from 'react-spring'
import theme from './theme';

export default function withRoot(Component) {
  function WithRoot(props) {
    const { transform, opacity } = useSpring({
      from: { scale: 10, opacity: 0},
      to: { scale: 150, opacity: 1},
      config: { duration: 500 }
    })
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <animated.div style={{ transform, opacity }}>
          <Component {...props} />
        </animated.div>
      </ThemeProvider>
    );
  }

  return WithRoot;
}
