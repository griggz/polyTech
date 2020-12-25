import withRoot from '../prebuilt/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '../prebuilt/Typography';
import AppFooter from './AppFooter';
import AppAppBar from './AppAppBar';
import AppForm from './AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import CheckBox from '../prebuilt/CheckBox';

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

function ContactUs() {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);

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

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm maxWidth={'lg'}>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contact Us
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ handleSubmit2, submitting }) => (
            <form onSubmit={handleSubmit2} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="firstName"
                  autoComplete="firstName"
                  label="First Name"
                  margin="normal"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="Last Name"
                  autoComplete="lastName"
                  label="Last Name"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="email"
                  autoComplete="email"
                  label="Email"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="workPhone"
                  autoComplete="workPhone"
                  label="Work Phone"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="jobTitle"
                  autoComplete="jobTitle"
                  label="Job Title"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="organization"
                  autoComplete="organization"
                  label="Organization"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="webSite"
                  autoComplete="webSite"
                  label="Web Site"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="numberOfStaff"
                  autoComplete="numberOfStaff"
                  label="Number of Staff"
                  margin="normal"
                  type='number'
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="industry"
                  autoComplete="industry"
                  label="Industry"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="solutionOption"
                  autoComplete="solutionOption"
                  label="Solution Request"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="methodOfReferral"
                  autoComplete="methodOfReferral"
                  label="How Did You Hear About Us?"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  name="additionalDetails"
                  autoComplete="additionalDetails"
                  label="Tell Us A Little More About What You're Looking For!"
                  margin="normal"
                  multiline
                  rows={10}
                />
              </Grid>
              <Grid item xs={12}>
                <CheckBox text={"Want to stay up to date with what we're up to?"} />
              </Grid>

            </Grid>
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
              {submitting || sent ? 'In progress…' : 'Submit'}
            </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(ContactUs);
