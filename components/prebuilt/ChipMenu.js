/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: theme.palette.primary.main,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#7bcbe2",
    },
    "& .MuiChip-root": {
      color: "#fff",
      backgroundColor: "#7bcbe2",
    },
    "& .MuiChip-deleteIcon": {
      color: "#fff",
    },
  },
  input: {
    "& .MuiFormLabel-root": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function ChipMenu({
  handleChange,
  toggleOptions,
  options,
  title,
}) {
  const classes = useStyles();
  const [error, setError] = useState();

  const handleChangeMiddle = (value) => {
    if (value.length === 10) {
      setError(
        "Max number of States selected! Please remove a State before adding another."
      );
    } else {
      setError();
      handleChange(value);
    }
  };
  return (
    <>
      <Autocomplete
        multiple
        id="tags-outlined"
        classes={{ inputRoot: classes.inputRoot }}
        options={options}
        value={toggleOptions || ""}
        getOptionLabel={(option) => option.title}
        defaultValue={toggleOptions[0]}
        getOptionSelected={(option, value) => option.id === value.id}
        disableClearable
        filterSelectedOptions
        onChange={(event, newValue) => {
          handleChangeMiddle(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.input}
            variant="outlined"
            placeholder="Select"
            label={title}
          />
        )}
      />
      {error ? (
        <FormHelperText style={{ color: "#fe7f2d" }}>{error}</FormHelperText>
      ) : (
        ""
      )}
    </>
  );
}
