import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({ handleClick, chipOptions, styles, ...other }) {
  const classes = useStyles();

  return (
    chipOptions && (
      <div className={styles ? styles : classes.root}>
        {Object.keys(chipOptions).map((k, index) => (
          <Chip
            key={index}
            label={chipOptions[k].label}
            icon={chipOptions[k].value ? <DoneIcon /> : null}
            color="primary"
            onClick={handleClick ? () => handleClick(chipOptions[k]) : null}
            variant="outlined"
            {...other}
          />
        ))}
      </div>
    )
  );
}
