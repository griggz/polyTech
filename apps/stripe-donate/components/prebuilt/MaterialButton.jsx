import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import theme from "../ui/Theme";

const styledBy = (property, mapping) => (props) => mapping[props[property]];

// We can use inline-style
const styles = {
  root: {
    background: styledBy("color", {
      default: "transparent",
      flat: "transparent",
      blue: "#83bcff",
      orange: "#ff7f51",
    }),
    "&:hover": {
      background: styledBy("color", {
        default: "#e0e0e0",
        flat: "#e0e0e0",
        blue: "#83bcff",
        orange: "#ff7f51",
      }),
    },
    borderRadius: 1,
    border: 0,
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
    fontWeight: "bold",
    color: styledBy("color", {
      default: "#000",
      blue: "#fff",
      orange: "#fff",
    }),
    minWidth: styledBy("width", {
      50: "50%",
      100: "100%",
      "": "100%",
    }),
    height: 56,
    padding: "0 15px",
    boxShadow: styledBy("color", {
      default: "0 3px 5px 2px rgba(244, 244, 244, .3)",
      blue: "0 3px 5px 2px rgba(131, 188, 255, .3)",
      orange: "0 3px 5px 2px rgba(255, 127, 81, .3)",
    }),
  },
};

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
  <Button className={classes.root} {...other} />
));

export default function MaterialButton({
  onClick,
  text,
  color,
  disabled,
  type,
  width,
  ...other
}) {
  return disabled !== true ? (
    <StyledButton
      color={color}
      width={width}
      onClick={onClick}
      type={type}
      {...other}
    >
      {text}
    </StyledButton>
  ) : (
    <StyledButton
      color="default"
      width={width}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </StyledButton>
  );
}
