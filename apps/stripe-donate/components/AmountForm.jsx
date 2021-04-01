import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MaterialButton from "../components/prebuilt/MaterialButton";
import NumberFormat from "react-number-format";
import ContributeInHonorForm from "../components/prebuilt/ContributeInHonorForm";
import PropTypes from "prop-types";

// import CurrencyOptions from '../components/prebuilt/CurrencyOptions.jsx'
import { makeStyles } from "@material-ui/core/styles";
import translate from "./i18n/translate";

const useStyles = makeStyles((theme) => ({
  currency: {
    padding: 0,
    margin: 0,
  },
  buttons: {
    padding: theme.spacing(1),
  },
  gridItem: {
    padding: 0,
    margin: 0,
  },
  input: {
    backgroundColor: "#fff",
  },
}));

const AmountForm = ({
  handleChange,
  handleSubscription,
  handlehonoree,
  cart,
  personalSettings,
}) => {
  // state
  const classes = useStyles();
  const [btnActive, setBtnActive] = useState({
    25: "blue",
    50: "blue",
    100: "blue",
    500: "blue",
    1000: "blue",
    2500: "blue",
  });
  const defaultBtnValues = {
    25: "blue",
    50: "blue",
    100: "blue",
    500: "blue",
    1000: "blue",
    2500: "blue",
  };
  const amount = cart.value;
  const labelValues = cart.valueOptions;
  const subscriptionCheck = cart.subscription;
  const honoreeCheck = cart.honoreeCheck;
  const { currencySymbol } = personalSettings;

  const handleRecurringChange = (event) => {
    handleSubscription(event.target.checked);
  };
  const CustomEntryValidation = (val) => {
    if (val.value === "." || val.value === "0") {
      return false;
    } else if (val.value.includes(".") && val.value.split(".")[1].length > 2) {
      return false;
    } else {
      return true;
    }
  };

  const handleUpdate = (btnNum) => {
    if (!btnNum.custom && btnNum.custom !== "") {
      setBtnActive({ ...defaultBtnValues, [btnNum]: "orange" });
      handleChange(btnNum);
    } else if (btnNum.custom !== "") {
      setBtnActive({ ...defaultBtnValues, custom: btnNum.custom });
      handleChange(btnNum);
    } else if (btnNum.custom === "" && cart.customValue) {
      handleChange(btnNum);
      setBtnActive({ ...defaultBtnValues, custom: btnNum.custom });
    }
  };

  const getAmountInit = () => {
    if (cart.customValue) {
      setBtnActive({
        ...defaultBtnValues,
        custom: cart.valueOptions[cart.value].value,
      });
      handleChange(amount);
    } else {
      setBtnActive({ ...defaultBtnValues, [amount]: "orange" });
      handleChange(amount);
    }
  };

  useEffect(() => {
    async function load() {
      getAmountInit();
    }
    // Load
    load();
  }, []);

  return (
    <Grid container spacing={1} className={classes.buttons}>
      <Grid item xs={6} sm={3}>
        <MaterialButton
          onClick={() => handleUpdate(25)}
          text={labelValues[25].value}
          color={btnActive[25]}
          width="100"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <MaterialButton
          onClick={() => handleUpdate(50)}
          text={labelValues[50].value}
          color={btnActive[50]}
          width="100"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <MaterialButton
          onClick={() => handleUpdate(100)}
          text={labelValues[100].value}
          color={btnActive[100]}
          width="100"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <MaterialButton
          onClick={() => handleUpdate(500)}
          text={labelValues[500].value}
          color={btnActive[500]}
          width="100"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <MaterialButton
          onClick={() => handleUpdate(1000)}
          text={labelValues[1000].value}
          color={btnActive[1000]}
          width="100"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <MaterialButton
          onClick={() => handleUpdate(2500)}
          text={labelValues[2500].value}
          color={btnActive[2500]}
          width="100"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <NumberFormat
          InputProps={{
            className: classes.input,
          }}
          customInput={TextField}
          value={btnActive.custom || ""}
          variant="outlined"
          label={translate("amount")}
          fullWidth
          placeholder={`${currencySymbol}0.00`}
          prefix={currencySymbol}
          type="text"
          isAllowed={CustomEntryValidation}
          thousandSeparator
          onValueChange={(value) => handleUpdate({ custom: value.value })}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={subscriptionCheck}
              onChange={handleRecurringChange}
            />
          }
          label={translate("make_contribution_monthly")}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={honoreeCheck}
              onChange={(e) => handlehonoree({ check: e.target.checked })}
            />
          }
          label={translate("make_contribution_in_honor")}
        />
        {honoreeCheck && (
          <ContributeInHonorForm handlehonoree={handlehonoree} cart={cart} />
        )}
      </Grid>
    </Grid>
  );
};

AmountForm.propTypes = {
  handleSubscription: PropTypes.func.isRequired,
  handlehonoree: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  // cart: PropTypes.obj.isRequired,
  // personalSettings: PropTypes.obj.isRequired,
};

export default AmountForm;
