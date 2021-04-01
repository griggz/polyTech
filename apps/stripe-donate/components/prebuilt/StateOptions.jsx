import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import States from "../prebuilt/States";
import translate from "../i18n/translate";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#fff",
  },
}));

export default function StateDropDown(props) {
  const classes = useStyles();
  const { handleChange, state, errors } = props;

  return (
    <>
      <Autocomplete
        id="countriesList"
        className={classes.paper}
        options={States}
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
            label={translate("state")}
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
