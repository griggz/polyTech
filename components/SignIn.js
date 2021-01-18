import withRoot from './prebuilt/withRoot';
// --- Post bootstrap -----
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from './prebuilt/Typography';
import AppFooter from './views/AppFooter';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import { providers, signIn } from 'next-auth/client'
import { withRouter } from 'next/router';
import theme from './prebuilt/theme'

const useStyles = makeStyles(() => ({
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

function SignInForm({children}) {
  const classes = useStyles();

  return (
    <>
      <AppAppBar />
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
        </>
        <div className={classes.button}>
          {children}
        </div>
      </AppForm>
      <AppFooter />
    </>
  );
}

SignInForm.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}

export default withRouter(withRoot(SignInForm));
