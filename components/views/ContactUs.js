import withRoot from "../prebuilt/withRoot";
// --- Post bootstrap -----
import React, { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "../prebuilt/Typography";
import AppFooter from "./AppFooter";
import AppAppBar from "./AppAppBar";
import AppForm from "./AppForm";
import { email, required } from "../form/validation";
import RFTextField from "../form/RFTextField";
import FormButton from "../form/FormButton";
import FormFeedback from "../form/FormFeedback";
import CheckBox from "../prebuilt/CheckBox";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import SelectMenu from "../form/SelectMenu";
import SelectMenuMultiple from "../form/SelectMenuMultiple";
import IndustryTypes from "../form/selections/IndustryTypes";
import OrgSize from "../form/selections/OrgSize";
import Solutions from "../form/selections/SolutionOptions";

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
  const [industry, setIndustry] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [solution, setSolution] = useState([]);

  const router = useRouter();

  const handleIndustryChange = (event) => setIndustry(event.target.value);
  const handleOrgSizeChange = (event) => setOrgSize(event.target.value);
  const handleSolutionChange = (event) => {
    setSolution(event.target.value);
  };

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "content"],
      values
    );

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
    await axios.post("/api/leads/contact_us/", {
      firstName: values.firstName || "",
      lastName: values.lastName || "",
      email: values.email || "",
      jobTitle: values.jobTitle || "",
      organization: values.organization || "",
      workPhone: values.workPhone || "",
      webSite: values.webSite || "",
      orgSize: orgSize || "",
      industry: industry || "",
      solution: solution || "",
      leadSource: values.leadSource || "",
      content: values.content || "",
      subscribe: subscribe || "",
    });

    if (router.asPath.includes("next=")) {
      router.push({
        pathname: router.asPath.split("next=")[1],
        query: { access: true },
      });
    } else {
      router.push({
        pathname: "/",
        query: {
          snackOpen: true,
          snackMessage:
            "Thank you so much! We look forward to working with you!",
        },
      });
    }
  };

  // prefetch next page for faster loading
  if (router.asPath.includes("next=")) {
    router.prefetch(router.asPath.split("next=")[1]);
  }

  return (
    <>
      <AppAppBar hideMenu={true} />
      <AppForm maxWidth={"lg"}>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Contact Us
          </Typography>
        </>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true, pristine: true }}
          validate={validate}
        >
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
                    name="webSite"
                    autoComplete="webSite"
                    label="Web Site"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <SelectMenu
                    name="Number of Staff"
                    fullWidth
                    value={orgSize}
                    values={OrgSize}
                    type="default"
                    onChange={handleOrgSizeChange}
                    variant="standard"
                    disabled={submitting || sent}
                    margin="normal"
                    size="large"
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <SelectMenu
                    name="Industry"
                    fullWidth
                    value={industry}
                    values={IndustryTypes}
                    type="default"
                    onChange={handleIndustryChange}
                    variant="standard"
                    disabled={submitting || sent}
                    margin="normal"
                    size="large"
                    sortData={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectMenuMultiple
                    fullWidth
                    margin="normal"
                    size="large"
                    label="What solutions are you looking for?"
                    value={solution}
                    onChange={handleSolutionChange}
                    values={Solutions}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    fullWidth
                    size="large"
                    component={RFTextField}
                    disabled={submitting || sent}
                    name="leadSource"
                    autoComplete="leadSource"
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
                    name="content"
                    required
                    autoComplete="content"
                    label="Tell us more about what you're looking for!"
                    margin="normal"
                    multiline
                    rows={10}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CheckBox
                    checked={subscribe}
                    setChecked={setSubscribe}
                    text={"Want to stay up to date with what we're up to?"}
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
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Submit"}
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
