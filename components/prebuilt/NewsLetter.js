import { Field, Form, FormSpy } from 'react-final-form';
import AppForm from '../views/AppForm';
import { email, required } from '../form/validation';
import RFTextField from '../form/RFTextField';
import FormButton from '../form/FormButton';
import FormFeedback from '../form/FormFeedback';
import Paper from './Paper';
// MUI
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  sidebarSection: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(4)
  },
  imageSrc: {
    // position: 'absolute',
    width: 90,
    height: 90
    // backgroundSize: 'cover',
    // backgroundPosition: 'center 40%',
  },
  customPaper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
  }));

export default function Topics () {
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
    <Paper variant="outlined" className={classes.customPaper}>
      <Typography variant="h4" gutterBottom className={classes.sidebarSection}>
        Email Newsletter
      </Typography>
      <Typography variant="h5" gutterBottom className={classes.sidebarSection}>
        Subscribe to our Newsletter for new blog posts, tech tips or news about our latest projects.
      </Typography>
      <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
        {({ handleSubmit2, submitting }) => (
          <form onSubmit={handleSubmit2} className={classes.form} noValidate>
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
    </Paper>
  )
}
