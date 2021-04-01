import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";

// We can use inline-style
const styles = {
  root: {
    background: "#1b95e0",
    "&:hover": {
      background: "#1577b3",
    },
    borderRadius: 6,
    border: 0,
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffff",
    height: 30,
    padding: "12px",
    boxShadow: "0 3px 5px 2px rgba(0, 141, 201, .3)",
  },
};

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
  <Button startIcon={<TwitterIcon />} className={classes.root} {...other} />
));

export default function TwitterButton({ text, onClick }) {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
}
