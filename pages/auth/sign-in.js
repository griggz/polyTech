import SignInForm from "../../components/SignIn";
import { providers, signIn, csrfToken } from "next-auth/client";
import Button from "../../components/prebuilt/Button";
import { Github } from "@styled-icons/evaicons-solid/Github";
import { Email } from "@styled-icons/material/Email";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../components/prebuilt/theme";
import { email, required } from "../../components/form/validation";
import RFTextField from "../../components/form/RFTextField";
import FormButton from "../../components/form/FormButton";
import FormFeedback from "../../components/form/FormFeedback";
import { Field, Form, FormSpy } from "react-final-form";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  icon: {
    height: 55,
    color: theme.palette.common.white,
    marginRight: 20,
  },
  buttonGithub: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonEmail: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  buttons: {
    marginBottom: 20,
  },
}));

export default function SignIn({ providers }) {
  const classes = useStyles();

  const onSubmit = async (values) => {
    signIn(provider.id, { email: values.email });
  };

  const validate = (values) => {
    const errors = required(["email"], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }
    return errors;
  };

  return (
    <SignInForm>
      <>
        {Object.values(providers).map((provider) => (
          <>
            <div key={provider.name} className={classes.buttons}>
              {provider.id === "github" && (
                <Button
                  onClick={() => signIn(provider.id)}
                  className={classes.buttonGithub}
                  variant="contained"
                  fullWidth
                  size="large"
                >
                  <>
                    <Github className={classes.icon} />
                    Sign in with {provider.name}
                  </>
                </Button>
              )}

              {provider.id === "email" && (
                <Form
                  onSubmit={(values) => {
                    signIn(provider.id, { email: values.email });
                  }}
                  subscription={{ submitting: true, pristine: true }}
                  validate={validate}
                >
                  {({ handleSubmit, values, submitting }) => (
                    <form
                      onSubmit={handleSubmit}
                      className={classes.form}
                      noValidate
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            size="large"
                            component={RFTextField}
                            disabled={submitting}
                            required
                            name="email"
                            autoComplete="email"
                            label="Email"
                            margin="normal"
                          />
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
                        disabled={submitting}
                        size="large"
                        color="secondary"
                        fullWidth
                      >
                        <Email className={classes.icon} />
                        {submitting
                          ? "In progress…"
                          : `Sign in with ${provider.name}`}
                      </FormButton>
                    </form>
                  )}
                </Form>
              )}
            </div>
          </>
        ))}
      </>
    </SignInForm>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};
