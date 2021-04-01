import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "auto",
  },
}));

export default function LocaleDropDown(props) {
  const classes = useStyles();
  const { handleChange, lang } = props;
  return (
    <FormControl required className={classes.formControl}>
      <Select
        name="lang"
        value={lang || ""}
        className={classes.select}
        onChange={handleChange}
      >
        <MenuItem value="ENGLISH">English</MenuItem>
        <MenuItem value="SPANISH">Español</MenuItem>
        <MenuItem value="GERMAN">Deutsche</MenuItem>
        <MenuItem value="FRENCH">Français</MenuItem>
        <MenuItem value="ITALIAN">Italiano</MenuItem>
        <MenuItem value="CHINESE">简体中文</MenuItem>
        <MenuItem value="RUSSIAN">русский</MenuItem>
        <MenuItem value="ARABIC">عربى</MenuItem>
      </Select>
    </FormControl>
  );
}
