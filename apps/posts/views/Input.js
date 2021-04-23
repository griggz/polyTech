import withRoot from "../../../components/prebuilt/withRoot";
// --- Post bootstrap -----
import React, { useState, useEffect } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "../../../components/prebuilt/Typography";
import AppFooter from "../../../components/views/AppFooter";
import AppAppBar from "../../../components/views/AppAppBar";
import AppForm from "../../../components/views/AppForm";
import { required } from "../../../components/form/validation";
import RFTextField from "../../../components/form/RFTextField";
import FormButton from "../../../components/form/FormButton";
import FormFeedback from "../../../components/form/FormFeedback";
import Markdown from "../../../components/prebuilt/Markdown";
import Snackbar from "../../../components/prebuilt/Snackbar";
import Container from "../../../components/prebuilt/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  preview: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    whiteSpace: "pre-wrap",
  },
}));

function Input({ post }) {
  const classes = useStyles();
  const [doneLoading, setDoneLoading] = useState();
  const [sent, setSent] = useState(false);
  const [notification, setNotification] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [existingPosts, setExistingPosts] = useState();

  const handleNotification = () => setNotification(false);

  const validate = (values) => {
    const errors = required(["title", "content"], values);
    // validate title
    if (values.title) {
      const newTitle = values.title
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .join("_")
        .toLowerCase()
        .trim();
      if (existingPosts.includes(newTitle)) {
        errors.title = "Post already exists!";
      }
    }

    return errors;
  };

  const onSubmit = async (values) => {
    setSent(true);
    if (post) {
      await axios.post("/api/posts/[id]/", {
        title: values.title || "",
        content: values.content || "",
        postId: post.id,
      });
    } else {
      const posted = await axios.post("/api/posts/create/", {
        title: values.title || "",
        content: values.content || "",
      });
      if (posted.data) {
        setSubmitMessage(`Post submitted succesfully => id: ${posted.data.id}`);
        setSent(false);
        // scroll to top
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setNotification(true);
      }
    }
  };

  const loadPosts = async () => {
    const existingPosts = await axios.get("/api/posts").then((r) => r.data);
    if (existingPosts) {
      const allPosts = existingPosts.map((d) => {
        return d.title;
      });
      setExistingPosts(allPosts);
    }
  };

  useEffect(() => {
    async function load() {
      await loadPosts();
      setDoneLoading(true);
    }
    // Load
    load();
  }, []);

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />
      </Container>
    );
  }

  return (
    <>
      <AppAppBar hideMenu={true} />
      <AppForm maxWidth={"xl"}>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Post Create
          </Typography>
        </>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, values, form, errors }) => {
            return (
              <form
                onSubmit={async (e) => {
                  await handleSubmit(e);
                  if (Object.keys(errors).length === 0) {
                    form.reset();
                  }
                }}
                className={classes.form}
                noValidate
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <Field
                      fullWidth
                      size="large"
                      component={RFTextField}
                      disabled={submitting || sent}
                      required
                      name="title"
                      autoComplete="title"
                      label="Title"
                      margin="normal"
                      autoFocus
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
                      label="Content"
                      margin="normal"
                      multiline
                      rows={20}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.preview}>
                  <Markdown className={classes.markdown}>
                    {values.content || ""}
                  </Markdown>
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
            );
          }}
        />
      </AppForm>
      <AppFooter />
      <Snackbar
        open={notification}
        onClose={handleNotification}
        message={submitMessage}
      />
    </>
  );
}

export default withRoot(Input);
