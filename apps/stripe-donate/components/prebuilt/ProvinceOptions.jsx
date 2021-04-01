import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Provinces from "../prebuilt/Provinces";
import translate from "../i18n/translate";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#fff",
  },
}));

export default function ProvinceDropDown(props) {
  const classes = useStyles();
  const { handleChange, state, errors } = props;

  return (
    <>
      <Autocomplete
        id="countriesList"
        className={classes.paper}
        options={Provinces}
        value={state}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          handleChange(newValue);
        }}
        getOptionSelected={(option, value) => state.value === value.value}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label={translate("province")}
            variant="outlined"
          />
        )}
      />
      {errors === true ? (
        <FormHelperText style={{ color: "red" }}>
          {translate("error", { e: translate("state") })}
        </FormHelperText>
      ) : (
        ""
      )}
    </>
  );
}
