import withRoot from "../../../components/prebuilt/withRoot";
// --- Post bootstrap -----
import React, { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
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
import Chips from "../../../components/prebuilt/Chips";
import { UpperFirstLetter } from "../../../utils/StringHelper";
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

const getDateTime = () => {
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return time;
};

function Input() {
  const classes = useStyles();
  const [post, setPost] = useState();
  const [doneLoading, setDoneLoading] = useState();
  const [sent, setSent] = useState(false);
  const [notification, setNotification] = useState();
  const [submitMessage, setSubmitMessage] = useState("");
  const [existingPosts, setExistingPosts] = useState();
  const [tagOptions, setTagOptions] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [defaultTags, setDefaultTags] = useState();

  const router = useRouter();

  const handleChipClick = (option) => {
    // manages the functionality of the tag chips
    if (option && option.value === false) {
      setTagOptions({
        ...tagOptions,
        [option.label]: { label: option.label, value: true },
      });
      setSelectedTags([...selectedTags, option.label]);
    } else {
      setTagOptions({
        ...tagOptions,
        [option.label]: { label: option.label, value: false },
      });
      const currTags = [...selectedTags];
      const tagIndex = currTags.indexOf(option.label);
      if (tagIndex !== -1) {
        currTags.splice(tagIndex, 1);
        setSelectedTags(currTags);
      }
    }
  };

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
      if (existingPosts.includes(newTitle) && !router.query.id) {
        errors.title = "Post already exists!";
      } else if (
        existingPosts.includes(newTitle) &&
        post &&
        post.title !== values.title
      ) {
        errors.title = "Post already exists!";
      }
    }

    return errors;
  };

  const onSubmit = async (values) => {
    setSent(true);
    let posted;
    if (post) {
      setPost({ ...post, title: values.title, content: values.content });
      posted = await axios.put(`/api/posts/${post.id}/`, {
        title: values.title || "",
        content: values.content || "",
        tags: selectedTags,
      });
    } else {
      posted = await axios.post("/api/posts/create/", {
        title: values.title || "",
        content: values.content || "",
        tags: selectedTags,
      });
    }
    if (posted.data) {
      setSubmitMessage(
        `Post saved via => id: ${posted.data.id} @ ${getDateTime()}`
      );
      setSent(false);
      // scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setNotification(true);
    }
  };

  const loadPosts = async () => {
    // check if update request
    let post;
    let tags;
    if (router.query.id) {
      post = await axios
        .get(`/api/posts/${router.query.id}`)
        .then((r) => r.data);
      // update post state
      setPost({
        id: post.id,
        title: post.title
          .split("_")
          .map((s) => {
            return UpperFirstLetter(s);
          })
          .join(" "),
        content: post.content,
        tags: post.tags,
      });
      tags = post.tags;
    }

    const existingPosts = await axios.get("/api/posts").then((r) => r.data);
    const allTags = await axios.get("/api/posts/tags/").then((r) => r.data);
    if (existingPosts) {
      const allPosts = existingPosts.map((d) => {
        return d.title;
      });
      // build tags object
      const tagTitles = allTags.map((t) => {
        return t.title;
      });
      const tagsObj = {};
      if (tags) {
        const existingTags = tags.map((t) => {
          return t.title;
        });
        // set existing tags
        tagTitles.forEach(
          (key, i) =>
            (tagsObj[key] = {
              label: key,
              value: existingTags.includes(key) ? true : false,
            })
        );
        setSelectedTags(existingTags);
        setDefaultTags(tagsObj);
        setTagOptions(tagsObj);
      } else {
        // set default and existing tags
        tagTitles.forEach(
          (key, i) => (tagsObj[key] = { label: key, value: false })
        );
        setDefaultTags(tagsObj);
        setTagOptions(tagsObj);
      }
      // setState
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

  const resetForm = () => {
    if (!router.query.id) {
      setTagOptions(defaultTags);
      setSelectedTags([]);
    }
  };

  return (
    <>
      <AppAppBar hideMenu={true} />
      <AppForm maxWidth={"xl"}>
        <>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            {!post ? "Post Create" : "Post Update"}
          </Typography>
        </>
        <Form
          onSubmit={onSubmit}
          initialValues={post ? post : { title: "", content: "" }}
          validate={validate}
          render={({ handleSubmit, submitting, values, form, errors }) => {
            return (
              <form
                onSubmit={async (e) => {
                  await handleSubmit(e);
                  if (Object.keys(errors).length === 0) {
                    resetForm();
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
                {tagOptions && (
                  <Chips
                    handleClick={handleChipClick}
                    chipOptions={tagOptions}
                  />
                )}
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

export default withRouter(withRoot(Input));
