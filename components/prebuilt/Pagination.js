import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline";

const useStyles = makeStyles((theme) => ({
  image: {
    height: 35,
  },
  container: {
    padding: "0 0.5rem",
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    postion: "realtive",
    display: "inline-block",
    fontSize: 25,
  },
}));

export default function Paginate({
  index,
  total,
  handleSlideLeft,
  handleSlideRight,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <IconButton
        className={classes.item}
        onClick={handleSlideLeft}
        disabled={index === 0 ? true : false}
      >
        <ArrowIosBackOutline className={classes.image} />
      </IconButton>
      <div className={classes.item}>{index + 1 + " / " + total}</div>
      <IconButton
        className={classes.item}
        onClick={handleSlideRight}
        disabled={index === total - 1 ? true : false}
      >
        <ArrowIosForwardOutline className={classes.image} />
      </IconButton>
    </div>
  );
}
