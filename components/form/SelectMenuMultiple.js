import React from "react";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "../prebuilt/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const StyledTextField = ({ classes, ...other }) => <TextField {...other} />;

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      },
    },
  },
});

export default function SelectMultiple({ onChange, value, values, ...other }) {
  return (
    <StyledTextField
      id="demo-mutiple-checkbox"
      select
      input={<Input />}
      SelectProps={{
        multiple: true,
        value: value,
        onChange: onChange,
        renderValue: (selected) => selected.join(", "),
      }}
      {...other}
    >
      {values.map((option) => (
        <MenuItem key={option.value} value={option.label}>
          <Checkbox checked={value.indexOf(option.label) > -1} />
          <MuiThemeProvider theme={theme}>
            <Tooltip title={option.toolTip} style={{ fontSize: "23px" }}>
              <ListItemText primary={option.label} />
            </Tooltip>
          </MuiThemeProvider>
        </MenuItem>
      ))}
      ``
    </StyledTextField>
  );
}
