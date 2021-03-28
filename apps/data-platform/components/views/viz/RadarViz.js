import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RadarChart from "../../prebuilt/RadarChart";
import theme from "../ui/MaterialTheme";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  Slider: {
    paddingTop: "50px",
  },
}));

// chart toolbar styles
const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

// chart toolbar
const PaperToolbar = ({ year, min, max, handlePolarChange }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        color="secondary"
        variant="h6"
        id="tableTitle"
      >
        Total Metrics by Category
      </Typography>
      {/* <Slider
        className={classes.Slider}
        value={year}
        color="secondary"
        getAriaValueText={(value) => `${value}`}
        valueLabelDisplay="on"
        onChange={handlePolarChange}
        step={1}
        marks
        min={min}
        max={max}
      /> */}
    </Toolbar>
  );
};

PaperToolbar.propTypes = {
  year: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handlePolarChange: PropTypes.func.isRequired,
};

export default function RadarVizSlider({ data }) {
  const classes = useStyles();
  const [year, setYear] = useState(2020);
  // const [data, setData] = useState();
  const [max, setMax] = useState(2030);
  const [min, setMin] = useState(2020);
  // const [max, setMax] = setMax(Math.max(...years));
  // const [min, setMin] = setMin(Math.min(...years));
  const handlePolarChange = async (event, newValue) => {
    setYear(newValue);
    if (newValue !== year) {
      // await prepData(newValue, metric);
    }
  };
  return (
    <>
      <PaperToolbar
        year={year}
        min={min}
        max={max}
        handlePolarChange={handlePolarChange}
      />
      <RadarChart data={data} />
    </>
  );
}

RadarVizSlider.propTypes = {
  data: PropTypes.array.isRequired,
};
