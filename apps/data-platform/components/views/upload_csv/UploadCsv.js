import React, { useState } from "react";
import axios from "axios";
import CsvUploader from "../../prebuilt/CsvUpload";
import csvDownload from "json-to-csv-export";
// Material-UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import Toolbar from "@material-ui/core/Toolbar";
// My Componants
import theme from "../ui/MaterialTheme";
import HelpText from "./HelpText";
import CustomMaterialTable from "../../prebuilt/CustomMaterialTable";
import MaterialButton from "../../prebuilt/MaterialButton";
import SampleDataText from "./SampleDataText";
import {
  CleanHeader,
  WhichData,
  ShapeData,
  CheckColumns,
  Header,
  CheckCategory,
  CheckYear,
  CheckState,
} from "./DataChecks";
import UploadPop from "./UploadPop";

const useStyles = makeStyles(() => ({
  container: {
    padding: theme.spacing(0),
    position: "relative",
  },
  pageHeader: {
    padding: theme.spacing(0),
    fontWeight: "400",
    flexGrow: 1,
  },
  horizontalPaper: {
    padding: theme.spacing(0),
    margin: theme.spacing(1),
  },
  stagePaper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  csvUpload: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  gridItem: {
    position: "relative",
    margin: theme.spacing(1),
  },
  innerGrid: {
    padding: theme.spacing(1),
  },
  middlePaper: {
    height: "250px",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  innerGridEmpty: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  title: {
    flex: "1 1 100%",
  },
  csv: {
    paddingTop: "25px",
  },
}));

const sampleData = [
  {
    state: "virginia",
    year: "2029",
    category: "rouge",
    measurementA: 1232,
    measurementB: 3454,
    measurementC: 5342,
    measurementD: 9281,
  },
  {
    state: "virginia",
    year: "2030",
    category: "vert",
    measurementA: 3222,
    measurementB: 4321,
    measurementC: 5022,
    measurementD: 7787,
  },
  {
    state: "virginia",
    year: "2031",
    category: "gris",
    measurementA: 124,
    measurementB: 345,
    measurementC: 718,
    measurementD: 1232,
  },
  {
    state: "virginia",
    year: "2032",
    category: "bleu",
    measurementA: 9182,
    measurementB: 312,
    measurementC: 4531,
    measurementD: 3139,
  },
  {
    state: "virginia",
    year: "2033",
    category: "rouge",
    measurementA: 32312,
    measurementB: 3212,
    measurementC: 212,
    measurementD: 9387,
  },
  {
    state: "virginia",
    year: "2034",
    category: "argent",
    measurementA: 239,
    measurementB: 749,
    measurementC: 6428,
    measurementD: 782,
  },
];

const tableCols = [
  { title: "State", field: "state", type: "string" },
  { title: "Year", field: "year", type: "string" },
  { title: "Category", field: "category", type: "string" },
  { title: "MeasurementA", field: "measurementA", type: "string" },
  { title: "MeasurementB", field: "measurementB", type: "string" },
  { title: "MeasurementC", field: "measurementC", type: "string" },
  { title: "MeasurementD", field: "measurementD", type: "string" },
];

// generic filtering function
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map((el) =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

// generic filtering function
const reducedFilterId = (data, keys, fn) =>
  data.filter(fn).map((el) =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return el;
    }, {})
  );

const Upload = (props) => {
  const { error, setError, handleOnFileLoad, handleOnRemoveFile } = props;
  const classes = useStyles();

  return (
    <>
      <Typography variant="body1" color="primary" gutterBottom align="left">
        * NOTE: ALL non relevant fields will be ignored!
      </Typography>
      <Typography variant="body1" color="primary" gutterBottom align="left">
        * Please ensure your file ends with .csv.
      </Typography>
      <div className={classes.csv}>
        <CsvUploader
          setError={setError}
          handleOnFileLoad={handleOnFileLoad}
          handleOnRemoveFile={handleOnRemoveFile}
        />
      </div>
      {error ? (
        <FormHelperText style={{ color: "#fe7f2d" }}>{error}</FormHelperText>
      ) : (
        ""
      )}
    </>
  );
};

export default function UploadCsv() {
  const classes = useStyles();
  const [uploadData, setUploadData] = useState([]);
  const [dataSet, setDataSet] = useState(null);
  const [columns, setColumns] = useState(tableCols);
  const [error, setError] = useState();
  const [isProcessing, setIsProcessing] = useState();
  const [stateName, setStateName] = useState("virginia");
  const [existData, setExistData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [completeStatus, setCompleteStatus] = useState();
  const [checks, setChecks] = useState({
    invalidCols: [],
    errorRows: [],
  });

  const loadData = async () => {
    // Gather measurements data for specific state
    const { lineDataRaw, radarDataRaw } = await axios
      .get(`/api/data-platform/fake_data`)
      .then((r) => r.data);
    return radarDataRaw;
  };

  // add file to upload box
  const handleOnFileLoad = async (data_) => {
    const headerClean = CleanHeader(data_);
    const dataSetName = WhichData(headerClean);
    const cleanData = headerClean.map((d) => ShapeData(d));
    // analyze data
    const { invalidCols } = await CheckColumns({
      setName: "metrics",
      data: cleanData,
    });
    const { data, errorRows } = await runChecks(cleanData, dataSetName);
    // Update State
    setChecks({
      ...checks,
      invalidCols: invalidCols,
      errorRows: errorRows,
    });
    setUploadData(data);
    if (errorRows.length > 0) {
      setOpenDialog(true);
    }
  };

  // Remove file from upload field
  const handleOnRemoveFile = async (data) => {
    setUploadData([]);
    setColumns([]);
    setDataSet();
  };

  const handlePrepSubmit = async () => {
    if (checks.errorRows.length < 1) {
      setIsProcessing(true);
      // get data
      const apiData = await loadData();
      // check which records exist and which don't
      const { exist, notExist } = parseData({
        apiData: apiData,
        uploadData: uploadData,
      });

      setExistData(exist);
      setNewData(notExist);
      setOpenDialog(true);
    } else {
      setOpenDialog(true);
    }
  };

  const runChecks = async (data) => {
    // check if endUse values are correct
    const errorRows = [];
    data.forEach(async function (row) {
      const categoryStatus = CheckCategory(row.category);
      const stateStatus = CheckState(row.state, stateName);
      const yearStatus = CheckYear(row.year);
      if (categoryStatus === "fail") {
        errorRows.push(row);
        row.errors = true;
      } else if (stateStatus === "fail") {
        errorRows.push(row);
        row.errors = true;
      } else if (yearStatus === "fail") {
        errorRows.push(row);
        row.errors = true;
      } else {
        row.errors = false;
      }
    });
    return { data, errorRows };
  };

  // Check to see which are updates and which are new records
  const parseData = ({ apiData, uploadData }) => {
    const exist = [];
    const notExist = [];

    const header = [[...Header, ["id"]].flat()][0];
    uploadData.forEach(function (row) {
      const dbRecordsYear = reducedFilter(
        apiData,
        header,
        (item) => item.year === row.year
      );
      const dbRecordsCategory = reducedFilter(
        dbRecordsYear,
        header,
        (item) => item.category === row.category
      );
      const record = reducedFilter(
        dbRecordsCategory,
        header,
        (item) => item.measurementA === row.measurementA
      );
      const apiRecord = reducedFilterId(
        dbRecordsCategory,
        header,
        (item) => item.measurementA === row.measurementA
      );

      if (record.length > 0) {
        row.id = apiRecord[0].id;
        exist.push(row);
      } else if (record.length < 1) {
        notExist.push(row);
      }
    });
    return { exist, notExist };
  };

  // Dialog Actions
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const submitData = async () => {
    // await updateRecords(existData);
    // await createRecords(newData);
    setCompleteStatus(true);
  };

  const updateRecords = async (data) => {
    const recordLength = data.length;
    // If the object exists, update it via API
    if (recordLength > 0) {
      for (let i = 0; i < recordLength; i += 100) {
        const requests = await data.slice(i, i + 100).map((row) => {
          // Added await here
          return puts({
            row,
          }).catch((e) => console.log(`Error updating record: ${row} - ${e}`));
        });
        await Promise.all(requests); // Use this to await all the promises
      }
    }
  };
  // creates records
  const createRecords = async (data) => {
    const recordLength = data.length;
    // If the object exists, update it via API
    if (recordLength > 0) {
      for (let i = 0; i < recordLength; i += 100) {
        const requests = await data.slice(i, i + 100).map((row) => {
          // added await here
          return posts({
            row,
          }).catch((e) => console.log(`Error creating record: ${row} - ${e}`));
        });
        await Promise.all(requests); // Use this to await all the promises
      }
    }
  };

  const puts = async ({ row, location }) => {
    await axios
      .put(`/api/${location}/`, {
        data: row,
        headers: {
          Authorization: `Token ${window.localStorage
            .getItem("token")
            .replace(/['"]+/g, "")}`,
        },
      })
      .then((r) => r.data);
  };

  const posts = async ({ row, location }) => {
    const endpoint = `/api/${location}/create`;
    await axios.post(endpoint, row);
  };

  if (completeStatus) {
    window.location.reload();
  }

  return (
    <>
      <Grid container className={classes.container}>
        <Toolbar className={classes.pageHeader}>
          <Typography
            className={classes.title}
            variant="h3"
            color="secondary"
            align="left"
          >
            Upload Data
          </Typography>
        </Toolbar>
        <Grid item xs={12}>
          <Paper className={classes.stagePaper}>
            <HelpText />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.middlePaper}>
            <Grid container className={classes.container}>
              <Toolbar className={classes.pageHeader}>
                <Typography
                  className={classes.title}
                  variant="h5"
                  color="secondary"
                  align="left"
                >
                  Sample Data Sets
                </Typography>
              </Toolbar>
              <Grid item xs={12}>
                <SampleDataText />
              </Grid>
              <Grid item xs={12} className={classes.innerGrid}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  onClick={() =>
                    csvDownload(sampleData, "state_sample_data.csv")
                  }
                >
                  Data
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.middlePaper}>
            <Toolbar className={classes.pageHeader}>
              <Typography
                className={classes.title}
                variant="h5"
                color="secondary"
                align="left"
              >
                Upload .CSV File
              </Typography>
            </Toolbar>
            <Upload
              setError={setError}
              error={error}
              handleOnFileLoad={handleOnFileLoad}
              handleOnRemoveFile={handleOnRemoveFile}
            />
          </Paper>
        </Grid>
        {uploadData.length < 1 && checks.errorRows.length < 1 ? (
          ""
        ) : (
          <Grid item xs={12} className={classes.stagePaper}>
            <MaterialButton
              onClick={() => handlePrepSubmit()}
              disabled={isProcessing}
              text={
                isProcessing ? "PROCESSING PRELIM CHECKS..." : "BEGIN UPLOAD"
              }
              color="accent"
              width="100"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          {uploadData.length > 0 && (
            <Paper className={classes.stagePaper}>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
              />
              <CustomMaterialTable
                title="Preview Data"
                columns={uploadData.length > 0 ? columns : []}
                data={uploadData.length > 0 ? uploadData : []}
                components={{
                  Container: (props) => props.children,
                }}
                options={{
                  headerStyle: {
                    padding: "10px 4px 10px 4px",
                    fontSize: ".85rem",
                  },
                  cellStyle: {
                    padding: "14px 4px 14px 4px",
                    fontSize: ".8rem",
                  },
                  pageSize: uploadData.length > 0 ? uploadData.length : 10,
                  rowStyle: (rowData) => ({
                    backgroundColor: rowData.errors
                      ? theme.palette.error.light
                      : "",
                  }),
                }}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async () => {
                        const cleanNewData = ShapeData(newData);
                        const dataUpdate = [...uploadData, cleanNewData];
                        const { data, errorRows } = await runChecks(dataUpdate);
                        setChecks({ ...checks, errorRows: errorRows });
                        setUploadData(data);
                        setUploadData([...data]);
                        resolve();
                      }, 500);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async () => {
                        const dataUpdate = [...uploadData];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        const { data, errorRows } = await runChecks(dataUpdate);
                        setChecks({ ...checks, errorRows: errorRows });
                        setUploadData(data);
                        setUploadData([...data]);

                        resolve();
                      }, 500);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(async () => {
                        const dataDelete = [...uploadData];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        const { data, errorRows } = await runChecks(dataDelete);
                        setChecks({ ...checks, errorRows: errorRows });
                        setUploadData(data);
                        setUploadData([...data]);
                        resolve();
                      }, 500);
                    }),
                }}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
      <UploadPop
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        existData={existData}
        newData={newData}
        submitData={submitData}
        checks={checks}
        error={error}
      />
    </>
  );
}
