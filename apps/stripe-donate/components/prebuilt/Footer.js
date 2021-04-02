import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  footer: {
    display: "flex",
    minHeight: "2%",
    flexDirection: "column",
    backgroundColor: "transparent",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  footerText: {
    fontFamily: ["Permanent Marker", "serif"].join(","),
    fontSize: "1rem",
    color: "#ff3366",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography className={classes.footerText} align="right">
        Engineered by Avec Analytics
      </Typography>
    </div>
  );
}
