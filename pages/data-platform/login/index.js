import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import moment from "moment";
// import Login from "../../components/login/login";
// import Register from "../../components/login/register";
// MUaI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { green } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
    box: {
      paddingTop: 0,
    },
  },
  AppBar: {
    backgroundColor: `rgba(246, 249, 255, 1)`,
  },
}));

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function HfcApp() {
  // Authentication Login
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState({
    email: "",
    email2: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    homeState: { value: "", name: "" },
  });
  const [processing, setProcessing] = useState();
  const [doneLoading, setDoneLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const [messages, setMessages] = useState();
  // Nav
  const router = useRouter();
  // Style
  const classes = useStyles();
  const theme = useTheme();

  const defaultState = () => {
    setLogin({
      email: "",
      password: "",
    });
    setRegister({
      email: "",
      email2: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      homeState: { value: "", name: "" },
    });
    setProcessing();
    setDoneLoading(false);
    setStage(0);
  };

  const validateValues = async () => {
    if (register.email !== register.email2) {
      return { status: false, message: "emails do not match!" };
    } else if (register.password !== register.password2) {
      return { status: false, message: "passwords do not match!" };
    } else {
      return {
        status: true,
        message:
          "Your request has been submitted! You will be notified once your request has been approved.",
      };
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const validation = await validateValues();

    if (validation.status === false) {
      setMessages(validation.message);
      setProcessing(false);
    } else if (validation.status === true) {
      await axios
        .post("/api/account/register/", {
          email: register.email,
          password: register.password,
          password2: register.password2,
          first_name: register.firstName,
          last_name: register.lastName,
          meta: `{"usca": {"state": "${register.homeState.value}"}}`,
        })
        .then(async function (response) {
          setMessages(validation.message);
          defaultState();
        })
        .catch(function (error) {
          const authError = error.toString().includes("401");
          if (authError) {
            setMessages(
              "The credentials provided are either incorrect, suspended or not yet active."
            );
            setProcessing();
          }
        });
    }
  };

  if (doneLoading === true && stage === 0) {
    router.push("/hfc/");
  }

  const handleChange = (event, newValue) => {
    setStage(newValue);
  };

  const handleChangeIndex = (index) => {
    setStage(index);
  };

  const handleInputChange = (event, newValue) => {
    setMessages();
    const stateObjName = event.target.id;
    const stateObjValue = event.target.value;
    if (stage === 0) {
      setLogin({ ...login, [stateObjName]: stateObjValue });
    } else if (stage === 1)
      setRegister({ ...register, [stateObjName]: stateObjValue });
  };

  const handleStateChange = (newValue) => {
    setMessages();
    setRegister({ ...register, homeState: newValue });
  };

  return (
    <Grid container justify={"center"}>
      <Grid item xs={12} md={6} lg={5}>
        <Paper className={classes.root} elevation={3}>
          <AppBar position="static" className={classes.AppBar}>
            <Tabs
              value={stage}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Login" {...a11yProps(0)} />
              <Tab label="Register" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={stage}
            onChangeIndex={handleChangeIndex}
          >
            {/* <TabPanel value={stage} index={0} dir={theme.direction}>
              <Login
                handleChange={handleInputChange}
                login={login}
                handleLogin={() => {
                  console.log("test");
                }}
                processing={processing}
                messages={messages}
              />
            </TabPanel>
            <TabPanel value={stage} index={1} dir={theme.direction}>
              <Register
                handleChange={handleInputChange}
                register={register}
                handleRegistration={handleRegistration}
                handleStateChange={handleStateChange}
                processing={processing}
                messages={messages}
              />
            </TabPanel> */}
          </SwipeableViews>
        </Paper>
      </Grid>
    </Grid>
  );
}
