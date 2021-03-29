import React, { useState } from "react";
import csvDownload from "json-to-csv-export";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
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
import LineViz from "../../views/viz/LineViz";
import RadarViz from "../../views/viz/RadarViz";
import BarViz from "../../views/viz/BarViz";
import MetricsForm from "../../prebuilt/MetricsForm";
import RainbowLoader from "../../prebuilt/RainbowLoader";
import MeasurementsForm from "../../prebuilt/MeasurementsForm";
import { UpperFirstLetter } from "../../prebuilt/Helper";

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 725,
    margin: theme.spacing(1),
    padding: 25,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
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

function buildFileName(stateName) {
  return `${stateName}_data_export.csv`;
}

const Cols = [
  {
    title: "Year",
    field: "year",
    type: "numeric",
  },
  {
    title: "Category",
    field: "category",
    type: "string",
  },
  {
    title: "MeasurementA",
    field: "measurementA",
    type: "numeric",
  },
  {
    title: "MeasurementB",
    field: "measurementB",
    type: "numeric",
  },
  {
    title: "MeasurementC",
    field: "measurementC",
    type: "numeric",
  },
  {
    title: "MeasurementD",
    field: "measurementD",
    type: "numeric",
  },
];

function DashboardInline(props) {
  const classes = useStyles();
  const {
    stateName,
    lineVizData,
    radarVizData,
    barVizData,
    tableData,
    toggleStateName,
    handleStateToggle,
    doneLoading,
    reloading,
  } = props;
  const [record, setRecord] = useState();
  const [openMeasurementsForm, setOpenMeasurementsForm] = useState(false);
  const [openMetricsForm, setOpenMetricsForm] = useState(false);
  const [modType, setModType] = useState();
  // ROUTER
  const router = useRouter();
  // Transiton
  const { transform, opacity, marginTop } = useSpring({
    from: {
      scale: 10,
      opacity: 0,
      marginTop: 1000,
    },
    to: {
      scale: 150,
      opacity: 1,
      marginTop: 0,
    },
    config: {
      duration: 700,
    },
  });
  const tableOptions = {
    exportButton: true,
    exportCsv: (columns, data) => {
      csvDownload(data, buildFileName(stateName));
    },
    pageSize: 25,
    pageSizeOptions: [25, 50, 75],
  };

  const handleModData = ({ action, rowData }) => {
    if (action === "edit") {
      setRecord(rowData);
      setModType(action);
      setOpenMeasurementsForm(true);
    } else if (action === "create") {
      setRecord([]);
      setModType(action);
      setOpenMeasurementsForm(true);
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
          {UpperFirstLetter(stateName)}
        </Typography>
        {reloading && <RainbowLoader />}
        <ButtonGroup variant="text" color="secondary">
          <StateDropDown
            stateName={stateName}
            handleChange={handleStateToggle}
            toggleStateName={toggleStateName}
          />
        </ButtonGroup>
      </Toolbar>
      <Grid item xs={12}>
        <animated.div
          style={{
            transform,
            opacity,
            marginTop,
          }}
        >
          <Paper className={classes.chart}>
            <LineViz data={lineVizData} />
          </Paper>
        </animated.div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.chart}>
          <RadarViz data={radarVizData} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.chart}>
          <BarViz data={barVizData} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.table}>
          <>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <CustomMaterialTable
              title="Data"
              columns={Cols}
              data={tableData}
              options={tableOptions}
              components={{
                Container: (props) => props.children,
              }}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit Record",
                  onClick: (event, rowData) =>
                    handleModData({ action: "edit", rowData }),
                },
                {
                  icon: "add",
                  tooltip: "Add Data",
                  isFreeAction: true,
                  onClick: (event, rowData) =>
                    handleModData({ action: "create", rowData }),
                },
                {
                  icon: "publish",
                  tooltip: "Bulk Upload",
                  isFreeAction: true,
                  onClick: (event, rowData) => bulkUpload(),
                },
              ]}
            />
          </>
        </Paper>
      </Grid>
      <MetricsForm
        data={record}
        openDialog={openMetricsForm}
        handleClose={closeDialogForm}
        stateName={stateName}
        // mode={mode}
        status={modType}
      />
      <MeasurementsForm
        data={record}
        openDialog={openMeasurementsForm}
        handleClose={closeDialogForm}
        stateName={stateName}
        // mode={mode}
        status={modType}
      />
    </Grid>
  );
}

DashboardInline.propTypes = {
  lineVizData: PropTypes.array.isRequired,
  radarVizData: PropTypes.array.isRequired,
  barVizData: PropTypes.object.isRequired,
  tableData: PropTypes.array.isRequired,
};

export default DashboardInline;
