import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "../components/prebuilt/MaterialButton";
import translate from "./i18n/translate";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import CountryDropDown from "../components/prebuilt/CountryOptions";
import StateDropDown from "../components/prebuilt/StateOptions";
import ProvinceDropDown from "../components/prebuilt/ProvinceOptions";
import PhoneInput from "react-phone-number-input";
import CustomPhoneNumber from "../components/prebuilt/PhoneNumber";
import "react-phone-number-input/style.css";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  input: {
    backgroundColor: "#fff",
  },
  inputPhone: {
    width: "100%",
  },
}));

const BillingForm = ({
  handleBack,
  handleFormSubmit,
  BuildNameState,
  buildBillingFields,
  personalSettings,
  billingDetails,
}) => {
  const classes = useStyles();
  const [stateError, setStateError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const { language, locale } = personalSettings;
  const {
    country,
    state,
    phone,
    firstName,
    middleName,
    lastName,
    email,
    line1,
    postalCode,
    city,
  } = billingDetails;
  const formStyle = {
    width: "100%",
  };

  // validates the form fields that can't self validate
  const handleValidation = async (ev) => {
    ev.preventDefault();
    if (country.value === "US" || country.value === "CA") {
      // check if state field s populated
      if (!state) {
        setStateError(true);
      } else if (state) {
        setStateError(false);
      }
      // check if country field is populated
      if (!country || country === null) {
        setCountryError(true);
      } else if (country) {
        setCountryError(false);
      }
      // check if both fields are populated
      if (state && country) {
        setStateError(false);
        setCountryError(false);
        handleFormSubmit();
      }
    } else {
      // check if country field is populated
      if (!country || country.value === "") {
        setCountryError(true);
      } else if (country) {
        setCountryError(false);
        handleFormSubmit();
      }
    }
  };
  // Function to return a specific dropdown field depending upon the chosen Country
  const stateDropDown = () =>
    country && country.value === "US" ? (
      <StateDropDown
        handleChange={(value) => buildBillingFields({ state: value })}
        state={state}
        errors={stateError}
      />
    ) : (
      country &&
      country.value === "CA" && (
        <ProvinceDropDown
          handleChange={(value) => buildBillingFields({ state: value })}
          state={state}
          errors={stateError}
        />
      )
    );
  // Form fields specific to countries who dont require a middle name or state
  const chineseFields = (
    <Grid container spacing={1} className={classes.container}>
      <Grid item xs={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={firstName || ""}
          name="firstName"
          label={translate("first_name")}
          type="text"
          size="small"
          onChange={(e) => BuildNameState({ firstName: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={lastName || ""}
          name="lastName"
          label={translate("last_name")}
          type="text"
          size="small"
          onChange={(e) => BuildNameState({ lastName: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={line1 || ""}
          name="address"
          label={translate("address")}
          onChange={(e) => buildBillingFields({ line1: e.target.value })}
          type="text"
          size="small"
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={city || ""}
          name="city"
          label={translate("city")}
          onChange={(e) => buildBillingFields({ city: e.target.value })}
          type="text"
          size="small"
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={postalCode || ""}
          name="zip"
          label={translate("postal_code")}
          onChange={(e) => buildBillingFields({ postalCode: e.target.value })}
          type="text"
          size="small"
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CountryDropDown
          handleChange={(e) => buildBillingFields({ country: e })}
          locale={locale}
          country={country}
          errors={countryError}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        {stateDropDown()}
      </Grid>
      <Grid item xs={12} sm={6}>
        <PhoneInput
          value={phone || ""}
          onChange={(e) => buildBillingFields({ phone: e })}
          inputComponent={CustomPhoneNumber}
          limitMaxLength
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={email || ""}
          name="email"
          label={translate("email")}
          onChange={(e) => buildBillingFields({ email: e.target.value })}
          type="email"
          size="small"
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
    </Grid>
  );
  // default form fields
  const defaultFields = (
    <Grid container spacing={1} className={classes.container}>
      <Grid item xs={12} sm={4} md={4}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={firstName || ""}
          name="firstName"
          label={translate("first_name")}
          type="text"
          size="small"
          onChange={(e) => BuildNameState({ firstName: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={middleName || ""}
          name="middleName"
          label={translate("middle_name")}
          type="text"
          size="small"
          onChange={(e) => BuildNameState({ middleName: e.target.value })}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={lastName || ""}
          name="lastName"
          label={translate("last_name")}
          type="text"
          size="small"
          onChange={(e) => BuildNameState({ lastName: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={line1 || ""}
          name="address"
          label={translate("address")}
          type="text"
          size="small"
          onChange={(e) => buildBillingFields({ line1: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={city || ""}
          name="city"
          label={translate("city")}
          type="text"
          size="small"
          onChange={(e) => buildBillingFields({ city: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={postalCode || ""}
          name="zip"
          label={translate("postal_code")}
          type="text"
          size="small"
          onChange={(e) => buildBillingFields({ postalCode: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CountryDropDown
          handleChange={(e) => buildBillingFields({ country: e })}
          country={country}
          locale={locale}
          errors={countryError}
          required
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        {stateDropDown()}
      </Grid>
      <Grid item xs={12} sm={6}>
        <PhoneInput
          value={phone || ""}
          onChange={(e) => buildBillingFields({ phone: e })}
          inputComponent={CustomPhoneNumber}
          limitMaxLength
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            className: classes.input,
          }}
          value={email || ""}
          name="email"
          label={translate("email")}
          onChange={(e) => buildBillingFields({ email: e.target.value })}
          type="email"
          size="small"
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
    </Grid>
  );

  return (
    <form onSubmit={handleValidation} style={formStyle}>
      {language === "CHINESE" ? chineseFields : defaultFields}
      <Grid container>
        <MaterialButton
          onClick={handleBack}
          text={translate("back")}
          color="flat"
          width="50"
        />
        <MaterialButton
          type="submit"
          text={translate("next")}
          color="blue"
          width="50"
        />
      </Grid>
    </form>
  );
};

export default BillingForm;
