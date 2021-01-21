import React from 'react';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '../prebuilt/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const StyledTextField = (({ classes, ...other }) => (
  <TextField {...other} />
))

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      }
    }
  }
});

export default function ScenarioOptionsMultiple ({ onChange, value, values, ...other }) {
  return (
      <StyledTextField
          select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          // value={personName}
          onChange={onChange}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          // MenuProps={MenuProps}
          {...other}
        >
          {values.sort((a, b) => a.value.localeCompare(b.value)).map((option) => (
            <MuiThemeProvider theme={theme}>
              <Tooltip title={option.toolTip} style={{fontSize: '23px'}}>
                <MenuItem key={option.value} value={option.label}>
                  <Checkbox checked={value.indexOf(option) > -1} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              </Tooltip>
            </MuiThemeProvider>
          ))}
        </StyledTextField>
)
}