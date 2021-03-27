import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from "@material-ui/core/Container";
import Typography from "../prebuilt/Typography";
import Snackbar from "../prebuilt/Snackbar";
import axios from "axios";
import { Field, Form, FormSpy } from "react-final-form";
import { email, required } from "../form/validation";
import RFTextField from "../form/RFTextField";
import FormButton from "../form/FormButton";
import FormFeedback from "../form/FormFeedback";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: "flex",
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.warning.main,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
  imagesWrapper: {
    position: "relative",
  },
  imageDots: {
    position: "absolute",
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: "100%",
    background: "url(/static/onepirate/productCTAImageDots.png)",
  },
  image: {
    position: "absolute",
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: 600,
  },
});

function ProductCTA(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (values) => {
    setSent(true);
    await axios.post("/api/leads/subscribe/", {
      email: values.email,
      active: true,
    });
    setOpen(true);
    values.email = "";
    setSent(false);
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <Form
              onSubmit={onSubmit}
              subscription={{ submitting: true, pristine: true }}
              validate={validate}
            >
              {({ handleSubmit, values, form, submitting }) => (
                <form
                  onSubmit={handleSubmit}
                  className={classes.cardContent}
                  noValidate
                >
                  <Typography variant="h2" component="h2" gutterBottom>
                    Stay in the know!
                  </Typography>
                  <Typography variant="h5">
                    I promise we won't pester you! But let us brag about what
                    we've done, what we're doing, and where we're going.
                  </Typography>
                  <Field
                    autoComplete="email"
                    component={RFTextField}
                    disabled={submitting || sent}
                    fullWidth
                    margin="normal"
                    placeholder="Your email"
                    name="email"
                    required
                    size="large"
                    className={classes.textField}
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
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    {submitting || sent ? "In progress…" : "Keep Me Updated"}
                  </FormButton>
                </form>
              )}
            </Form>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <div className={classes.imageDots} />
            <img
              src="https://images.unsplash.com/photo-1583716919318-2bcaa60e758b?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=750&q=80"
              alt="call to action"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="Thank you so much! We look forward to working with you in the future!"
      />
    </Container>
  );
}

ProductCTA.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCTA);
