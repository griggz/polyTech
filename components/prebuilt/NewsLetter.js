import React, {useState} from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import Paper from './Paper';
import axios from 'axios';
// MUI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  imageSrc: {
    width: 90,
    height: 90
  },
  customPaper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
  }));

export default function Topics () {
  const classes = useStyles();
  const [sent, setSent] = useState(false);
  const [complete, setComplete] = useState()

  const validate = (values) => {
    const errors = required(['email'], values);

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
    await axios.post('/api/leads/subscribe/', {
      email: values.email
    }).then( function (res) {
      setComplete(true)
    })
  };

  return (
    <Paper variant="outlined" className={classes.customPaper}>
      <Typography variant="h4" gutterBottom>
        Email Newsletter
      </Typography>
      {complete ?
      <Typography variant="h4" gutterBottom className={classes.sidebarSection}>
        Thank you!
      </Typography>
      :
      <>
      <Typography variant="h5" gutterBottom>
        Subscribe to our Newsletter for new blog posts, tech tips or news about our latest projects.
      </Typography>
      <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true, pristine: true }}
          validate={validate}>
          {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
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
              {submitting || sent ? 'In progress…' : 'Subscribe'}
            </FormButton>
          </form>
        )}
      </Form>
      </>
      }
    </Paper>
  )
}
