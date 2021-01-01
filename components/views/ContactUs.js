import withRoot from '../prebuilt/withRoot';
// --- Post bootstrap -----
import React, {useState} from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
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
import axios from 'axios';
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

function ContactUs() {
  const classes = useStyles();
  const [sent, setSent] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const router = useRouter();

  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }
    return errors;
  };

  const onSubmit = async (values) => {
    console.log('submit!');
    setSent(true);
    await axios.post('/api/leads/contact_us/', {
      first_name: values.firstName || '',
      last_name: values.lastName || '',
      email: values.email || '',
      job_title: values.jobTitle || '',
      organization: values.organization || '',
      work_phone: +values.workPhone || '',
      web_site: values.webSite || '',
      number_of_staff: +values.numberOfStaff || '',
      industry: values.industry || '',
      solution_option: values.solutionOption || '',
      method_of_referral: values.methodOfReferral || '',
      contact_source: values.contactSource || '',
      additional_details: values.additionalDetails || '',
      subscribe: subscribe || ''
    })
    router.push('/')
  };

  return (
    <>
      <AppAppBar />
      <AppForm maxWidth={'lg'}>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contact Us
          </Typography>
        </>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true, pristine: true }}
          validate={validate}>
          {({ handleSubmit, values, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
                  name="lastName"
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
                <CheckBox checked={subscribe} setChecked={setSubscribe} text={"Want to stay up to date with what we're up to?"} />
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
    </>
  );
}

export default withRouter(withRoot(ContactUs));
