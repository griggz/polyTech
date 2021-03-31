import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilterData } from "../../prebuilt/Helper.js";
import * as d3 from "d3";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
// My Componants
import theme from "../ui/MaterialTheme";
import RegionTable from "./RegionalTable.js";
import RegionChart from "./RegionalChart.js";
import Container from "../../prebuilt/Container";
import regions from "../../prebuilt/Regions";

const useStyles = makeStyles(() => ({
  container: {
    padding: theme.spacing(1),
    position: "relative",
  },
  pageHeader: {
    padding: theme.spacing(1),
    fontWeight: "400",
    flexGrow: 1,
  },
  container_new: {
    padding: theme.spacing(1),
    position: "relative",
    marginTop: "25px",
  },
  horizontalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
  },
  verticalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 1,
  },
  gridItem: {
    position: "relative",
  },
}));

function RegionalAnalysis(props) {
  const classes = useStyles();
  // state
  const [doneLoading, setDoneLoading] = useState(false);
  const [data, setData] = useState([]);
  const [regionData, setRegionData] = useState();

  // Loads data specific to the mode
  const loadData = async (stateName) => {
    const { lineDataRaw } = await axios
      .get(`/api/data-platform/fake_data`)
      .then((r) => r.data);
    // Structure LineData
    const { regionData } = await buildRegionData(lineDataRaw);
    const group = groupBy(regionData, "state", "year");
    const clean = ungroup(group);
    // update state
    setData(clean);
    setDoneLoading(true);
  };

  // Data Prep
  const buildRegionData = (data_) => {
    data_.forEach((d) => {
      d["region"] = regions[d.state].region;
    });
    return { regionData: data_ };
  };

  // group data with single key
  const groupBy = (data, key, key2) => {
    const dataRollup = d3
      .nest()
      .key((d) => d[key])
      .key((d) => d[key2])
      .rollup((v) => ({
        region: v.map((d) => {
          return d.region;
        })[0],
        measurementA: +d3.sum(v, (d) => d.measurementA),
        measurementB: +d3.sum(v, (d) => d.measurementB),
        measurementC: +d3.sum(v, (d) => d.measurementC),
        measurementD: +d3.sum(v, (d) => d.measurementD),
      }))
      .entries(data);
    return dataRollup;
  };

  const ungroup = (data) => {
    const arr = [];
    data.forEach(function (keys) {
      keys.values.map((d) => {
        arr.push({
          state: keys.key,
          year: d.key,
          region: d.value.region,
          measurementA: d.value.measurementA,
          measurementB: d.value.measurementB,
          measurementC: d.value.measurementC,
          measurementD: d.value.measurementD,
        });
      });
    });
    return arr;
  };

  const defineRegion = (region) => {
    if (region) {
      const filter = FilterData(data, "region", region, "equals");
      setRegionData(filter);
    } else {
      setRegionData(data);
    }
  };

  // Grabs credentials with home State details
  useEffect(() => {
    async function load() {
      loadData();
    }
    // Load
    load();
  }, []);

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />
      </Container>
    );
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Grid container className={classes.pageHeader}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant="h5" color="secondary" align="left">
              Region Analysis
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid container className={classes.pageHeader}>
          <Grid item xs={12} md={12} lg={12}>
            <RegionChart
              data={data}
              handleRegion={(region) => defineRegion(region)}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper className={classes.verticalPaper}>
              <RegionTable data={data} regionData={regionData} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default RegionalAnalysis;
