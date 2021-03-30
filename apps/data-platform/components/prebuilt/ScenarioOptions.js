import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import theme from "../views/ui/MaterialTheme";
import Scenarios from "./Scenarios";

const styledBy = (property, mapping) => (props) => mapping[props[property]];

// We can use inline-style
const styles = {
  root: {
    "& .MuiSvgIcon-root": {
      color: styledBy("type", {
        default: "",
        secondary: "#fff",
      }),
    },
    "& .MuiSelect-root": {
      color: styledBy("type", {
        default: "",
        secondary: "#fff",
      }),
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: styledBy("type", {
        default: "",
        secondary: "#fff",
      }),
    },
    "& .MuiFormLabel-root": {
      color: styledBy("type", {
        default: "",
        secondary: "#fff",
      }),
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: styledBy("type", {
        default: "",
        secondary: theme.palette.primary.light,
      }),
    },
    minWidth: styledBy("minWidth", {
      120: "120px",
      0: 0,
      full: "100%",
    }),
    margin: styledBy("margin", {
      default: theme.spacing(1),
      0: 0,
    }),
  },
};

const StyledTextField = withStyles(styles)(({ classes, ...other }) => (
  <TextField className={classes.root} {...other} />
));

export default function ScenarioDropDown({
  onChange,
  scenario,
  type,
  variant,
  minwidth,
  margin,
  ...other
}) {
  return (
    <>
      <StyledTextField
        select
        type={type}
        value={scenario}
        minwidth={minwidth}
        onChange={onChange}
        margin={margin ? margin : "none"}
        variant={variant}
        label="Scenario"
        id="scenarioChoice"
        name="scenario"
      >
        {Scenarios.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledTextField>
    </>
  );
}
