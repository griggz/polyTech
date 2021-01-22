import withRoot from './prebuilt/withRoot';
// --- Post bootstrap -----
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './prebuilt/Typography';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import { providers } from 'next-auth/client'
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
      <AppAppBar hideMenu={true} />
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
    </>
  );
}

SignInForm.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}

export default withRouter(withRoot(SignInForm));
