import React from "react";
import csvDownload from "json-to-csv-export";
import PropTypes from "prop-types";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
// My Componants
import theme from "../../views/ui/MaterialTheme";
import LineViz from "../viz/LineViz.js";
import CustomMaterialTable from "../../prebuilt/CustomMaterialTable";
import StateDropDownMultiple from "../../prebuilt/StateOptionsMultiple";
import ScenarioDropDown from "../../prebuilt/ScenarioOptions";

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 715,
    margin: theme.spacing(1),
    padding: 25,
  },
  table: {
    margin: theme.spacing(1),
    padding: 25,
  },
  item: {
    textAlign: "center",
    minWidth: 25,
  },
  container: {
    height: "100%",
  },
  slider: {
    maxHeight: "30%",
    marginLeft: 15,
  },
  pageHeader: {
    padding: theme.spacing(2),
    fontWeight: "400",
    flexGrow: 1,
  },
  title: {
    flex: "1 1 100%",
  },
}));

const tableCols = [
  { title: "State", field: "state", type: "string" },
  { title: "Year", field: "year", type: "numeric" },
  { title: "MeasurementA", field: "measurementA", type: "numeric" },
  { title: "MeasurementB", field: "measurementB", type: "numeric" },
  { title: "MeasurementC", field: "measurementC", type: "numeric" },
  { title: "MeasurementD", field: "measurementD", type: "numeric" },
];

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

// converts the standard metric style with a more presentable structure
const showcaseMetric = (metric) => {
  const words = metric.split("_");
  if (words.length > 2) {
    return words.join(", ").toUpperCase();
  } else {
    return words.join(" & ").toUpperCase();
  }
};

// chart toolbar
const ChartToolbar = (props) => {
  const classes = useToolbarStyles();
  const { metric, handleScenarioChange, data } = props;

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Metrics Consolidation & Outlook ({showcaseMetric(metric)})
      </Typography>

      <ButtonGroup
        variant="text"
        color="secondary"
        aria-label="text primary button group"
      >
        <ScenarioDropDown
          scenario={metric}
          type="default"
          minwidth={120}
          margin="none"
          onChange={handleScenarioChange}
          variant="standard"
        />
      </ButtonGroup>
    </Toolbar>
  );
};

const DataCompareInline = (props) => {
  const classes = useStyles();
  const {
    lineVizData,
    toggleStates,
    tableData,
    handleStateChange,
    handleScenarioChange,
    metric,
    doneLoading,
    reloading,
  } = props;
  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <Typography variant="h3" color="secondary" align="left">
          State Comparison Tool
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.chart}>
          <ChartToolbar
            metric={metric}
            handleScenarioChange={handleScenarioChange}
          />
          {!reloading && <LineViz data={lineVizData} />}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.table}>
          <StateDropDownMultiple
            handleStateChange={handleStateChange}
            toggleStates={toggleStates}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.table}>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <CustomMaterialTable
            title="Data Comparison"
            columns={tableCols}
            data={
              doneLoading &&
              !reloading &&
              tableData.length > 0 &&
              tableData[0] !== undefined &&
              tableData
            }
            options={{
              search: true,
              columnsButton: true,
              exportMenu: [
                {
                  label: "Export CSV",
                  exportFunc: (columns, data) => {
                    csvDownload(data, "comparison_report.csv");
                  },
                },
              ],
              pageSize: 11 || "",
              pageSizeOptions: [11, 22, 44],
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

DataCompareInline.propTypes = {
  lineVizData: PropTypes.array.isRequired,
  toggleStates: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  handleScenarioChange: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
  doneLoading: PropTypes.bool.isRequired,
  reloading: PropTypes.bool.isRequired,
};

export default DataCompareInline;
