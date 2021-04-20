import { useState, useEffect } from "react";
import Layout from "../../apps/stripe-donate/components/Layout";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  withStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CheckoutForm from "../../apps/stripe-donate/components/CheckoutForm";
import AmountForm from "../../apps/stripe-donate/components/AmountForm";
import BillingForm from "../../apps/stripe-donate/components/BillingForm";
import MaterialButton from "../../apps/stripe-donate/components/prebuilt/MaterialButton";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
import SuccessDialog from "../../apps/stripe-donate/components/prebuilt/SuccessMessage";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UpperFirstLetter from "../../apps/stripe-donate/utils/UpperFirstLetter";
import CircularProgress from "@material-ui/core/CircularProgress";
import LocaleDropDown from "../../apps/stripe-donate/components/prebuilt/LocaleOptions";
import CurrencyOptions from "../../apps/stripe-donate/components/prebuilt/CurrencyOptions";
import axios from "axios";
import getCurrencyValue from "../../apps/stripe-donate/utils/GetCurrencyValue";
import clsx from "clsx";
import PropTypes from "prop-types";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import Numeral from "numeral";
import Container from "../../apps/stripe-donate/components/prebuilt/Container";
import theme from "../../apps/stripe-donate/components/ui/Theme";
import InfoIcon from "@material-ui/icons/Info";
import { useSpring, animated } from "react-spring";
import Footer from "../../apps/stripe-donate/components/prebuilt/Footer";
import DemoDialog from "../../apps/stripe-donate/components/prebuilt/DemoDescription";
import { useRouter, withRouter } from "next/router";
import { useSession } from "next-auth/client";

// translate
import {
  I18nProvider,
  LOCALES,
} from "../../apps/stripe-donate/components/i18n";
import translate from "../../apps/stripe-donate/components/i18n/translate";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    position: "relative",
  },
  horizontalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  verticalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "600px",
  },
  input: {
    backgroundColor: "transparent",
  },
  stepper: {
    padding: theme.spacing(2, 0, 2),
    width: "100%",
    backgroundColor: "transparent",
  },
  stepIcon: {
    color: "#ff7f51",
  },
  layout: {
    flex: 1,
    width: "auto",
    marginLeft: 0,
    marginRight: 0,
    left: 0,
    top: 0,
    backgroundColor: "#f4f4f4",
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      maxWidth: "100%",
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: "#f4f4f4",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
  exchange: {
    display: "flex",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: ".5rem",
  },
}));

// Stepper Styles
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#ff7f51",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#ff7f51",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

// Stepper Styles
const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#ff7f51",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#02c39a",
    zIndex: 1,
    fontSize: 18,
  },
});

// Stepper Functionality
function QontoStepIcon({ active, completed }) {
  const classes = useQontoStepIconStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}
QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ExchangeNotification = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="caption" className={classes.exchange}>
      <InfoIcon
        color="secondary"
        fontSize="small"
        className={classes.infoIcon}
      />
      {children}
    </Typography>
  );
};

const MainPage = ({ language, currency, currencySymbol }) => {
  const router = useRouter();
  const classes = useStyles();
  const [session, loading] = useSession();
  const [activeStep, setActiveStep] = useState(0);
  const [successStatus, setSuccessStatus] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState();
  const [billingDetails, setBillingDetails] = useState();
  const [checkoutDetails, setCheckoutDetails] = useState();
  const [personalSettings, setPersonalSettings] = useState({
    locale: LOCALES.ENGLISH,
    language: "ENGLISH",
    currencySymbol: "$",
  });
  const [cart, setCart] = useState({
    value: 100,
    currency: "USD",
    subscription: false,
    honoreeCheck: false,
    honoreeType: "",
    honoreeFirstName: "",
    honoreeLastName: "",
    customValue: false,
    valueOptions: {
      0: {
        value: Numeral(0).format(`${personalSettings.currencySymbol}0,0.00`),
        amount: Numeral(0).format("0,0.00"),
      },
      25: {
        value: getCurrencyValue({ value: 25, symbol: "$" }),
        amount: getCurrencyValue({ value: 25 }),
      },
      50: {
        value: getCurrencyValue({ value: 50, symbol: "$" }),
        amount: getCurrencyValue({ value: 50 }),
      },
      100: {
        value: getCurrencyValue({ value: 100, symbol: "$" }),
        amount: getCurrencyValue({ value: 100 }),
      },
      500: {
        value: getCurrencyValue({ value: 500, symbol: "$" }),
        amount: getCurrencyValue({ value: 500 }),
      },
      1000: {
        value: getCurrencyValue({ value: 1000, symbol: "$" }),
        amount: getCurrencyValue({ value: 1000 }),
      },
      2500: {
        value: getCurrencyValue({ value: 2500, symbol: "$" }),
        amount: getCurrencyValue({ value: 2500 }),
      },
    },
  });
  const [billingFields, setBillingFields] = useState({
    firstName: null,
    middleName: null,
    lastName: null,
    email: null,
    phone: null,
    line1: null,
    city: null,
    state: null,
    postalCode: null,
    country: "",
  });

  // default option values
  const cleanOptions = (values) => ({
    0: values[0],
    25: values[25],
    50: values[50],
    100: values[100],
    500: values[500],
    1000: values[1000],
    2500: values[2500],
  });

  // validation for custom amount entries
  // const validateAmountChange = async (amount) => {
  // }

  // Handles the amount toggle
  const handleAmountChange = async (e) => {
    if (e !== undefined) {
      if (e.custom && e.custom > 0) {
        setCart({
          ...cart,
          value: e.custom,
          customValue: true,
          valueOptions: {
            ...cleanOptions(cart.valueOptions),
            [e.custom]: {
              value: getCurrencyValue({
                value: e.custom,
                symbol: personalSettings.currencySymbol,
              }),
              amount: getCurrencyValue({ value: e.custom }),
            },
          },
        });
      } else if (e.custom === "" && cart.customValue) {
        setCart({
          ...cart,
          value: 0,
          customValue: false,
          valueOptions: {
            ...cleanOptions(cart.valueOptions),
          },
        });
      } else {
        setCart({
          ...cart,
          value: e,
          customValue: false,
        });
      }
    }
  };

  // handles what the app does after a successful payment
  const handleSuccess = async (paymentDetails) => {
    setDoneLoading(false);
    setCheckoutDetails(paymentDetails);
    setActiveStep(0);
    setSuccessStatus(true);
    setCart({
      ...cart,
      value: 100,
      subscription: false,
      honoreeCheck: false,
      honoreeType: "",
      honoreeFirstName: "",
      honoreeLastName: "",
      customValue: false,
    });
    setBillingFields({
      firstName: null,
      middleName: null,
      lastName: null,
      email: null,
      phone: null,
      line1: null,
      city: null,
      state: null,
      postalCode: null,
      country: null,
    });
    setDoneLoading(true);
  };

  // handles how the checkbox for "make this a monthly contrib" is handled
  const handleSubscription = async (value) => {
    setCart({
      ...cart,
      subscription: value,
    });
  };

  // handles how the checkbox for "I'd like to make this contrib in honor" is handled
  const handlehonoree = async (value) => {
    setCart({
      ...cart,
      honoreeCheck:
        value.check === true || value.check === false
          ? value.check
          : cart.honoreeCheck,
      honoreeType: value.radio ? value.radio : cart.honoreeType,
      honoreeFirstName:
        value.firstName || value.firstName === ""
          ? value.firstName
          : cart.honoreeFirstName,
      honoreeLastName:
        value.lastName || value.lastName === ""
          ? value.lastName
          : cart.honoreeLastName,
    });
  };

  // Payment Steps at the top of the form
  const steps = [
    isProcessing ? (
      <CircularProgress color="secondary" size=".9rem" />
    ) : (
      cart.valueOptions[cart.value].value || translate("amount")
    ),
    translate("billing"),
    translate("payment"),
  ];

  const animatedStyle = useSpring({
    opacity: doneLoading ? 1 : 0,
    config: { duration: 250 },
    width: "100% ",
  });
  // Provides the component for associate to each step
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <animated.div style={animatedStyle}>
            <AmountForm
              handleChange={handleAmountChange}
              handleSubscription={handleSubscription}
              handlehonoree={handlehonoree}
              handleCurrencyChange={handleCurrencyChange}
              cart={cart}
              personalSettings={personalSettings}
            />
          </animated.div>
        );
      case 1:
        return (
          <BillingForm
            handleBack={handleBack}
            handleFormSubmit={handleFormSubmit}
            BuildNameState={BuildNameState}
            personalSettings={personalSettings}
            buildBillingFields={buildBillingFields}
            billingDetails={billingFields}
          />
        );
      case 2:
        return (
          <CheckoutForm
            cart={cart}
            onSuccessfulCheckout={(receipt) => handleSuccess(receipt)}
            handleBack={handleBack}
            billingDetails={billingDetails}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  // pushes the app to the next page
  const handleNext = async () => {
    if (activeStep <= 1 && cart.value !== 0) {
      if (successStatus === true) {
        setSuccessStatus(false);
        setCheckoutDetails();
        setActiveStep(activeStep + 1);
      }
      if (cart.value !== null) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  // pushes he app back to the previous page
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // Billing Related functions
  const [name, setName] = useState({
    fName: "",
    mName: "",
    lName: "",
  });

  // Builds the name as it is entered
  const BuildNameState = ({ firstName, middleName, lastName }) => {
    if (firstName !== undefined) {
      setName({ ...name, fName: firstName });
      setBillingFields({ ...billingFields, firstName: firstName });
    } else if (middleName !== undefined) {
      setName({ ...name, mName: middleName });
      setBillingFields({ ...billingFields, middleName: middleName });
    } else if (lastName !== undefined) {
      setName({ ...name, lName: lastName });
      setBillingFields({ ...billingFields, lastName: lastName });
    }
  };

  // Compile name pieces into single name
  const constructName = () => {
    const nameConstruct = "";

    return nameConstruct.concat(
      name.fName ? `${name.fName} ` : "",
      name.mName ? `${name.mName} ` : "",
      name.lName ? `${name.lName} ` : ""
    );
  };

  // Builds the name as it is entered
  const buildBillingFields = async ({
    line1,
    city,
    postalCode,
    country,
    state,
    phone,
    email,
  }) => {
    setBillingFields({
      ...billingFields,
      line1: line1 || line1 === "" ? line1 : billingFields.line1,
      city: city || city === "" ? city : billingFields.city,
      postalCode:
        postalCode || postalCode === "" ? postalCode : billingFields.postalCode,
      country:
        country || country === "" || country === null
          ? country
          : billingFields.country,
      state:
        state || state === "" || state === null ? state : billingFields.state,
      phone: phone || phone === "" ? phone : billingFields.phone,
      email: email || email === "" ? email : billingFields.email,
    });
  };

  // handles the biiling details form upon submission
  const handleFormSubmit = async () => {
    setBillingDetails(
      {
        name: constructName(),
        email: billingFields.email,
        phone: billingFields.phone,
        address: {
          line1: billingFields.line1,
          city: UpperFirstLetter(billingFields.city),
          state: billingFields.state ? billingFields.state.name : "",
          postal_code: billingFields.postalCode,
          country: billingFields.country.value,
        },
      },
      handleNext()
    );
  };

  // handle language changes
  const handleLangChange = async (e) => {
    if (successStatus) {
      setSuccessStatus(false);
    }
    setDoneLoading(false);
    setPersonalSettings({
      ...personalSettings,
      locale: LOCALES[e.target.value],
      language: e.target.value,
    });
    setDoneLoading(true);
  };

  // Handle Currency Changes and Conversions
  const handleCurrencyChange = async ({ currency, symbol }) => {
    if (successStatus) {
      setSuccessStatus(false);
    }
    setIsProcessing(true);
    try {
      // use api to fetch new currency exchange values
      const values = await axios.post(
        "/api/stripe-donate/currency_exchange_rate",
        {
          currency: currency,
          symbol: symbol,
          values: cart.valueOptions,
        }
      );

      // update cart
      setCart({
        ...cart,
        currency: currency,
        valueOptions: values.data,
      });

      // update app settings
      setPersonalSettings({
        ...personalSettings,
        currencySymbol: symbol,
      });

      setIsProcessing();
    } catch (err) {
      console.log(err);
    }
  };
  // Loads the application
  useEffect(() => {
    async function load() {
      // nothing here for now
      if (language && !currency) {
        setPersonalSettings({
          ...personalSettings,
          locale: LOCALES[language],
          language: language,
        });
      }
      // if currency is received
      if (currency && language) {
        const values = await axios.post(
          "/api/stripe-donate/currency_exchange_rate",
          {
            currency: currency,
            symbol: currencySymbol,
            values: cart.valueOptions,
          }
        );
        // update cart
        setCart({
          ...cart,
          currency: currency,
          valueOptions: values.data,
        });
        // update app settings
        setPersonalSettings({
          ...personalSettings,
          locale: LOCALES[language],
          language: language,
          currencySymbol: currencySymbol,
        });
      }
      setDoneLoading(true);
    }
    // Load
    if (session && !session.user.leads && !router.query.access)
      location.replace("/contact-us?next=/stripe-donate/");
    load();
  }, [session, loading]);

  const DonationCardTitle = withStyles({
    root: {
      color: "#ff7f51",
    },
  })(Typography);

  if (!doneLoading) {
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <CircularProgress color="secondary" size="2.5rem" thickness={2} />
        </ThemeProvider>
      </Container>
    );
  }

  if (loading) return null;

  if (!loading && !session) return <p>Access Denied</p>;

  return (
    ((session && session.user.leads) || router.query.access) && (
      <>
        <ThemeProvider theme={theme}>
          <I18nProvider locale={personalSettings.locale}>
            <Layout title="Donate" lang={personalSettings.locale}>
              <CssBaseline />
              <main className={classes.layout} id="stripe-form-content">
                {successStatus === true ? (
                  <SuccessDialog open checkoutDetails={checkoutDetails} />
                ) : (
                  ""
                )}
                <Toolbar className={classes.root}>
                  <DonationCardTitle
                    className={classes.title}
                    edge="start"
                    variant="h6"
                    noWrap
                  >
                    {translate("donate_now")}
                  </DonationCardTitle>
                  <CurrencyOptions
                    handleChange={handleCurrencyChange}
                    currency={cart.currency}
                  />
                  <LocaleDropDown
                    handleChange={handleLangChange}
                    lang={personalSettings.language}
                  />
                </Toolbar>
                <Grid container className={classes.container}>
                  <Stepper
                    activeStep={activeStep}
                    className={classes.stepper}
                    connector={<QontoConnector />}
                  >
                    {steps.map((label, index) => (
                      <Step key={index}>
                        <StepLabel StepIconComponent={QontoStepIcon}>
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {getStepContent(activeStep)}
                </Grid>
                {activeStep < steps.length - 2 && (
                  <Grid container className={classes.container}>
                    <MaterialButton
                      onClick={handleNext}
                      text={translate("next")}
                      color="blue"
                      width="100"
                    />
                  </Grid>
                )}
                <Grid container className={classes.container}>
                  {cart.currency !== "USD" &&
                    cart.value !== 0 &&
                    !cart.customValue && (
                      <ExchangeNotification>
                        {cart.valueOptions[cart.value].value}{" "}
                        {translate("exchange_notification", {
                          exchange: `${personalSettings.currencySymbol}${
                            cart.valueOptions[cart.value].amount
                          } = $${cart.value}`,
                        })}
                      </ExchangeNotification>
                    )}
                </Grid>
              </main>
              <Footer />
            </Layout>
          </I18nProvider>
        </ThemeProvider>
        <DemoDialog open />
      </>
    )
  );
};

MainPage.propTypes = {
  language: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
};

export default withRouter(MainPage);
