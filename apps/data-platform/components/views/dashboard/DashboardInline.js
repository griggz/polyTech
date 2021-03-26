import React, { useState } from "react";
import csvDownload from "json-to-csv-export";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
// Material UI;
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
// My Components;
import theme from "../ui/MaterialTheme";
import StateDropDown from "../../prebuilt/StateOptions";
import CustomMaterialTable from "../../prebuilt/CustomMaterialTable";
import LineViz from "../../views/viz/LineChart";
import MetricsForm from "../../prebuilt/MetricsForm";
import RadarViz from "../../prebuilt/RadarViz";
import MixBarChart from "../../prebuilt/MixBarChart";
import MeasurementsForm from "../../prebuilt/MeasurementsForm";
import { UpperFirstLetter } from "../../prebuilt/Helper";
import Container from "../../prebuilt/Container";

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 625,
    margin: theme.spacing(2),
    padding: 25,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    textAlign: "center",
    minWidth: 25,
  },
  container: {
    textAlign: "center",
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

const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingRight: theme.spacing(3),
    textAlign: "right",
  },
  title: {
    flex: "1 1 100%",
    textAlign: "left",
  },
  dropDown: {
    minWidth: 100,
  },
}));

function buildFileName(mode, stateName) {
  return `${mode}_${stateName}.csv`;
}

const measurementCols = [
  {
    title: "Year",
    field: "year",
  },
  {
    title: "Category",
    field: "category",
  },
  {
    title: "End Use",
    field: "end_use",
  },
  {
    title: "bau",
    field: "bau_web",
    type: "numeric",
  },
  {
    title: "rmp",
    field: "rmp_web",
    type: "numeric",
  },
  {
    title: "snap",
    field: "snap_web",
    type: "numeric",
  },
  {
    title: "kigali",
    field: "kigali_web",
    type: "numeric",
  },
  {
    title: "slcp",
    field: "slcp_web",
    type: "numeric",
  },
];

const metricCols = [
  {
    title: "Year",
    field: "year",
    type: "numeric",
  },
  {
    title: "Population",
    field: "state_population_web",
    type: "numeric",
  },
  {
    title: "Population Growth Rate",
    field: "population_growth_rate_web",
    type: "numeric",
  },
  {
    title: "Number of Households",
    field: "households_web",
    type: "numeric",
  },
  {
    title: "Household Growth Rate",
    field: "household_growth_rate_web",
    type: "numeric",
  },
  {
    title: "Light Duty Vehicles",
    field: "light_duty_vehicles_web",
    type: "numeric",
  },
  {
    title: "Vehicle Growth Rate",
    field: "light_duty_vehicles_growth_rate_web",
    type: "numeric",
  },
];

function DashboardInline(props) {
  const classes = useStyles();
  const {
    data,
    stateMetrics,
    stateName,
    stateMember,
    staff,
    lineVizData,
    radarVizData,
    toggleStateName,
    readOnly,
    credAdminStatus,
    handleStateToggle,
    polarVizData,
    mixBarData,
    doneLoading,
  } = props;
  const [tableData, setTableData] = useState([]);
  const [record, setRecord] = useState();
  const [tableDoneLoading, setTableDoneLoading] = useState(true);
  const [mode, setMode] = useState("measurements");
  const [openMeasurementsForm, setOpenMeasurementsForm] = useState(false);
  const [openMetricsForm, setOpenMetricsForm] = useState(false);
  const [modType, setModType] = useState();
  // ROUTER
  const router = useRouter();

  const metricTableOptions = {
    exportButton: true,
    exportCsv: (columns, data) => {
      csvDownload(data, buildFileName(mode, stateName));
    },
    pageSize: 25,
    pageSizeOptions: [25, 50, 75],
  };
  const measurementsTableOptions = {
    exportButton: true,
    exportCsv: (columns, data) => {
      csvDownload(data, buildFileName(mode, stateName));
    },
    pageSize: 100,
    pageSizeOptions: [100, 200, 300],
  };

  // Triggard by the view button, this enables you to edit data on the page
  const changeDataMode = async () => {
    await setTableDoneLoading(false);
    if (mode === "metrics") {
      await setMode("measurements");
      await setTableData(hfcMetrics);
      await setTableDoneLoading(true);
    } else if (mode === "measurements") {
      // prepping metrics => the data that is displayed
      await setMode("metrics");
      await setTableData(stateMetrics);
      await setTableDoneLoading(true);
    }
  };

  const handleModData = ({ action, rowData }) => {
    if (mode === "measurements") {
      if (action === "edit") {
        setRecord(rowData);
        setModType(action);
        setOpenMeasurementsForm(true);
      } else if (action === "create") {
        setRecord([]);
        setModType(action);
        setOpenMeasurementsForm(true);
      }
    } else if (mode === "metrics") {
      if (action === "edit") {
        setRecord(rowData);
        setModType(action);
        setOpenMetricsForm(true);
      } else if (action === "create") {
        setRecord([]);
        setModType(action);
        setOpenMetricsForm(true);
      }
    }
  };

  const bulkUpload = () => {
    router.push("/hfc/upload/");
  };

  const closeDialogForm = () => {
    setOpenMeasurementsForm(false);
    setOpenMetricsForm(false);
    setRecord();
  };
  return (
    <Grid container className={classes.container}>
      <Toolbar className={classes.pageHeader}>
        <Typography
          className={classes.title}
          variant="h3"
          color="secondary"
          align="left"
        >
          {" "}
          {UpperFirstLetter(stateName)}
        </Typography>
        <ButtonGroup variant="text" color="secondary">
          <StateDropDown
            stateName={stateName}
            handleChange={handleStateToggle}
            toggleStateName={toggleStateName}
          />
        </ButtonGroup>
      </Toolbar>
      <Grid item xs={12}>
        <Paper className={classes.chart}>
          <LineViz data={lineVizData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.chart}>
          <RadarViz data={radarVizData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.chart}>
          {/* {mixBarData.length > 0
                ? <MixBarChart mixBarData={mixBarData} />
                : <Container><CircularProgress color='secondary' /></Container>} */}
        </Paper>
      </Grid>
      {/* <Grid item xs={12} md={12} lg={12} className={classes.gridItem}>
                          <Paper className={classes.table}>
                            {tableDoneLoading ? <>
                              <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
                              <CustomMaterialTable
                                title={UpperFirstLetter(mode)}
                                columns={mode === 'measurements' ? measurementCols : metricCols}
                                data={tableData}
                                options={mode === 'measurements' ? measurementsTableOptions : metricTableOptions}
                                components={{
                                  Container: props => props.children
                                }}
                                actions={[
                                  {
                                    icon: 'edit',
                                    tooltip: 'Edit Record',
                                    onClick: (event, rowData) => handleModData({ action: 'edit', rowData })
                                  },
                                  {
                                    icon: 'flip',
                                    tooltip: 'Toggle Data Set',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => changeDataMode()
                                  },
                                  {
                                    icon: 'add',
                                    tooltip: 'Add Data',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => handleModData({ action: 'create', rowData })
                                  },
                                  {
                                    icon: 'publish',
                                    tooltip: 'Bulk Upload',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => bulkUpload()
                                  }
                                ]}
                              />
                            </> : <CircularProgress color='secondary' />}
                          </Paper>
                        </Grid>
                      </Grid>
                      <MetricsForm
                        data={record}
                        openDialog={openMetricsForm}
                        handleClose={closeDialogForm}
                        stateName={stateName}
                        stateMember={stateMember}
                        staff={staff}
                        readOnly={readOnly}
                        mode={mode}
                        status={modType}
                      />
                      <MeasurementsForm
                        data={record}
                        openDialog={openMeasurementsForm}
                        handleClose={closeDialogForm}
                        stateName={stateName}
                        stateMember={stateMember}
                        staff={staff}
                        readOnly={readOnly}
                        mode={mode}
                        status={modType}
                      /> */}
    </Grid>
  );
}

DashboardInline.propTypes = {
  lineVizData: PropTypes.array.isRequired,
  radarVizData: PropTypes.array.isRequired,
};

export default DashboardInline;
