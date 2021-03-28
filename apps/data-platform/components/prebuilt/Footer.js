import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../views/ui/MaterialTheme";

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
    color: theme.palette.secondary,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Typography
        className={classes.footerText}
        color="secondary"
        align="right"
      >
        Engineered by Avec Analytics
      </Typography>
    </div>
  );
}
