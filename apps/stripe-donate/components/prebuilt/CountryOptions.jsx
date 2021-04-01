import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import translate from "../i18n/translate";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Countries from "../prebuilt/Countries";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#fff",
  },
  formControl: {
    minWidth: "100%",
  },
}));

export default function CountryDropDown(props) {
  const classes = useStyles();
  const { handleChange, country, errors, locale } = props;

  const countries = Countries(locale);

  return (
    <>
      <Autocomplete
        id="countriesList"
        required
        className={classes.paper}
        options={countries}
        value={country}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          handleChange(newValue);
        }}
        getOptionSelected={(option, value) => country.value === value.value}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label={translate("country")}
            variant="outlined"
          />
        )}
      />
      {errors === true ? (
        <FormHelperText style={{ color: "red" }}>
          {translate("error", { e: translate("country") })}
        </FormHelperText>
      ) : (
        ""
      )}
    </>
  );
}
