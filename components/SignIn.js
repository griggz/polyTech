import withRoot from './prebuilt/withRoot';
// --- Post bootstrap -----
import React, {useState} from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from './prebuilt/Typography';
import AppFooter from './views/AppFooter';
import AppAppBar from './views/AppAppBar';
import AppForm from './views/AppForm';
import { email, required } from './form/validation';
import RFTextField from './form/RFTextField';
import FormButton from './form/FormButton';
import FormFeedback from './form/FormFeedback';
import { useSession, signIn } from 'next-auth/client'
import { useRouter, withRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn({csrfToken}) {
  const classes = useStyles();
  const [sent, setSent] = useState(false);

  const { query: { callbackUrl } } = useRouter();

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async (values) => {
    setSent(true);
    await signIn('credentials', { email: values.email, password: values.password, callbackUrl: callbackUrl})
  };

  return (
    <>
      <AppAppBar />
      <AppForm>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link href="/sign-up/" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true, pristine: true }}
          validate={validate}>
          {({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken}/>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </>
  );
}

export default withRouter(withRoot(SignIn));
