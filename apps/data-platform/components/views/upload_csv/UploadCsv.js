// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CsvUploader from "../prebuilt/CsvUpload";
// import csvDownload from "json-to-csv-export";
// // Material-UI
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import { Typography } from "@material-ui/core";
// import { Alert, AlertTitle } from "@material-ui/lab";
// import Button from "@material-ui/core/Button";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import Toolbar from "@material-ui/core/Toolbar";
// // My Componants
// import theme from "../ui/MaterialTheme";
// import Footer from "../ui/Footer";
// import HelpText from "./HelpText";
// import CustomMaterialTable from "../prebuilt/CustomMaterialTable";
// import { stateData, hfcData } from "../prebuilt/SampleData";
// import MaterialButton from "../prebuilt/MaterialButton";
// import SampleDataText from "./SampleDataText";
// import {
//   CleanHeader,
//   WhichData,
//   ShapeStateData,
//   ShapeHfcData,
//   CheckColumns,
//   HfcHeader,
//   CheckEndUse,
//   CheckCategory,
//   CheckYear,
//   CheckState,
// } from "./DataChecks";
// import UploadPop from "./UploadPop";
// import Container from "../../prebuilt/Container";

// const useStyles = makeStyles(() => ({
//   container: {
//     padding: theme.spacing(1),
//     position: "relative",
//   },
//   pageHeader: {
//     padding: theme.spacing(0),
//     fontWeight: "400",
//     flexGrow: 1,
//   },
//   horizontalPaper: {
//     padding: theme.spacing(0),
//     margin: theme.spacing(1),
//   },
//   stagePaper: {
//     padding: theme.spacing(1),
//     margin: theme.spacing(1),
//   },
//   csvUpload: {
//     margin: theme.spacing(1),
//     padding: theme.spacing(1),
//   },
//   gridItem: {
//     position: "relative",
//     margin: theme.spacing(1),
//   },
//   innerGrid: {
//     padding: theme.spacing(1),
//   },
//   middlePaper: {
//     height: "250px",
//     padding: theme.spacing(1),
//     margin: theme.spacing(1),
//   },
//   innerGridEmpty: {
//     padding: theme.spacing(0),
//     margin: theme.spacing(0),
//   },
//   title: {
//     flex: "1 1 100%",
//   },
//   csv: {
//     paddingTop: "25px",
//   },
// }));

// const tableHfcCols = [
//   { title: "State", field: "state", type: "string" },
//   { title: "Year", field: "year", type: "string" },
//   { title: "Category", field: "category", type: "string" },
//   { title: "End Use", field: "end_use", type: "string" },
//   { title: "bau", field: "bau", type: "numeric" },
//   { title: "rmp", field: "rmp", type: "numeric" },
//   { title: "snap", field: "snap", type: "numeric" },
//   { title: "kigali", field: "kigali", type: "numeric" },
//   { title: "slcp", field: "slcp", type: "numeric" },
//   { title: "rmp & snap", field: "rmp_snap", type: "numeric" },
//   { title: "snap & kigali", field: "snap_kigali", type: "numeric" },
//   { title: "rmp, snap, slcp", field: "rmp_snap_slcp", type: "numeric" },
//   {
//     title: "rmp, snap, slcp, kigali",
//     field: "rmp_snap_slcp_kigali",
//     type: "numeric",
//   },
// ];

// const tableStateCols = [
//   { title: "State", field: "state", type: "string" },
//   { title: "Year", field: "year", type: "string" },
//   { title: "state population", field: "state_population", type: "numeric" },
//   {
//     title: "central ac growth rate",
//     field: "central_ac_growth_rate",
//     type: "numeric",
//   },
//   {
//     title: "heat pump growth rate",
//     field: "heat_pump_growth_rate",
//     type: "numeric",
//   },
//   {
//     title: "household central ac",
//     field: "household_central_ac",
//     type: "numeric",
//   },
//   {
//     title: "household growth rate",
//     field: "household_growth_rate",
//     type: "numeric",
//   },
//   {
//     title: "household heat pumps",
//     field: "household_heat_pumps",
//     type: "numeric",
//   },
//   { title: "household room ac", field: "household_room_ac", type: "numeric" },
//   { title: "households", field: "households", type: "numeric" },
//   {
//     title: "light duty vehicles",
//     field: "light_duty_vehicles",
//     type: "numeric",
//   },
//   {
//     title: "light duty vehicles growth rate",
//     field: "light_duty_vehicles_growth_rate",
//     type: "numeric",
//   },
//   {
//     title: "population growth rate",
//     field: "population_growth_rate",
//     type: "numeric",
//   },
//   {
//     title: "room ac growth rate",
//     field: "room_ac_growth_rate",
//     type: "numeric",
//   },
// ];

// // generic filtering function
// const reducedFilter = (data, keys, fn) =>
//   data.filter(fn).map((el) =>
//     keys.reduce((acc, key) => {
//       acc[key] = el[key];
//       return acc;
//     }, {})
//   );

// // generic filtering function
// const reducedFilterId = (data, keys, fn) =>
//   data.filter(fn).map((el) =>
//     keys.reduce((acc, key) => {
//       acc[key] = el[key];
//       return el;
//     }, {})
//   );

// const Upload = (props) => {
//   const { error, setError, handleOnFileLoad, handleOnRemoveFile } = props;
//   const classes = useStyles();

//   return (
//     <>
//       <Typography variant="body1" color="primary" gutterBottom align="left">
//         * NOTE: ALL non relevant fields will be ignored!
//       </Typography>
//       <Typography variant="body1" color="primary" gutterBottom align="left">
//         * Please ensure your file ends with .csv.
//       </Typography>
//       <div className={classes.csv}>
//         <CsvUploader
//           setError={setError}
//           handleOnFileLoad={handleOnFileLoad}
//           handleOnRemoveFile={handleOnRemoveFile}
//         />
//       </div>
//       {error ? (
//         <FormHelperText style={{ color: "#fe7f2d" }}>{error}</FormHelperText>
//       ) : (
//         ""
//       )}
//     </>
//   );
// };

// export default function UploadCsv(props) {
//   const classes = useStyles();
//   const [uploadData, setUploadData] = useState([]);
//   const [dataSet, setDataSet] = useState(null);
//   const [columns, setColumns] = useState(tableHfcCols);
//   const [error, setError] = useState();
//   const [isProcessing, setIsProcessing] = useState();
//   const [stateName, setStateName] = useState();
//   const [existData, setExistData] = useState([]);
//   const [newData, setNewData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [completeStatus, setCompleteStatus] = useState();
//   const [checks, setChecks] = useState({
//     invalidCols: [],
//     errorRows: [],
//   });

//   const loadData = async () => {
//     // Gather measurements data for specific state
//     if (dataSet === "hfc") {
//       const apiData = await axios
//         .get("/api/hfc/measurements/", {
//           params: { stateName },
//         })
//         .then((r) => r.data.hfc_metrics);
//       return apiData;
//     } else if (dataSet === "state") {
//       const apiData = await axios
//         .get("/api/hfc/metrics/", {
//           params: { stateName },
//         })
//         .then((r) => r.state_metrics);
//       return apiData;
//     }
//   };

//   // add file to upload box
//   const handleOnFileLoad = async (data) => {
//     const headerClean = await CleanHeader(data);
//     const dataSetName = await WhichData(headerClean);
//     if (dataSetName === "hfc") {
//       const cleanData = await headerClean.map((d) => ShapeHfcData(d));
//       // analyze data
//       const { invalidCols } = await CheckColumns({
//         setName: "hfc",
//         data: cleanData,
//       });
//       const { data, errorRows } = await runChecks(cleanData, dataSetName);
//       // Update State
//       await setChecks({
//         ...checks,
//         invalidCols: invalidCols,
//         errorRows: errorRows,
//       });
//       await setDataSet(dataSetName);
//       await setColumns(tableHfcCols);
//       await setUploadData(data);
//       if (errorRows.length > 0) {
//         await setOpenDialog(true);
//       }
//     } else if (dataSetName === "state") {
//       const cleanData = await headerClean.map((d) => ShapeStateData(d));
//       // analyze data
//       const { invalidCols } = await CheckColumns({
//         setName: "state",
//         data: cleanData,
//       });
//       const { data, errorRows } = await runChecks(cleanData, dataSetName);
//       // Update State
//       await setChecks({
//         ...checks,
//         invalidCols: invalidCols,
//         errorRows: errorRows,
//       });
//       await setDataSet(dataSetName);
//       await setColumns(tableStateCols);
//       await setUploadData(data);
//     }
//   };

//   // Remove file from upload field
//   const handleOnRemoveFile = async (data) => {
//     setUploadData([]);
//     setColumns([]);
//     setDataSet();
//   };

//   const handlePrepSubmit = async () => {
//     if (checks.errorRows.length < 1) {
//       setIsProcessing(true);
//       // get data
//       const apiData = await loadData();
//       // check which records exist and which don't
//       const { exist, notExist } = await parseData({
//         apiData: apiData,
//         uploadData: uploadData,
//       });

//       await setExistData(exist);
//       await setNewData(notExist);
//       await setOpenDialog(true);
//     } else {
//       await setOpenDialog(true);
//     }
//   };

//   const runChecks = async (data, dataSetName) => {
//     // check if endUse values are correct
//     const errorRows = [];
//     if (dataSetName === "hfc") {
//       data.forEach(async function (row) {
//         const endUseStatus = await CheckEndUse(row.end_use);
//         const categoryStatus = await CheckCategory(row.category);
//         const stateStatus = await CheckState(row.state, stateName);
//         const yearStatus = await CheckYear(row.year);
//         if (endUseStatus === "fail") {
//           errorRows.push(row);
//           row.errors = true;
//         } else if (categoryStatus === "fail") {
//           errorRows.push(row);
//           row.errors = true;
//         } else if (stateStatus === "fail") {
//           errorRows.push(row);
//           row.errors = true;
//         } else if (yearStatus === "fail") {
//           errorRows.push(row);
//           row.errors = true;
//         } else {
//           row.errors = false;
//         }
//       });
//       return { data, errorRows };
//     } else if (dataSetName === "state") {
//       data.forEach(async function (row) {
//         const stateStatus = await CheckState(row.state);
//         const yearStatus = await CheckYear(row.year);
//         if (stateStatus === "fail") {
//           errorRows.push(row);
//           row.errors = true;
//         } else if (yearStatus === "fail") {
//           errorRows.push(row);
//           row.errors = true;
//         } else {
//           row.errors = false;
//         }
//       });
//       return { data, errorRows };
//     }
//   };

//   // Check to see which are updates and which are new records
//   const parseData = ({ apiData, uploadData }) => {
//     const exist = [];
//     const notExist = [];

//     const hfcHeader = [[...HfcHeader, ["id"]].flat()][0];

//     uploadData.forEach(function (row) {
//       const dbRecordsYear = reducedFilter(
//         apiData,
//         hfcHeader,
//         (item) => item.year === row.year
//       );
//       const dbRecordsCategory = reducedFilter(
//         dbRecordsYear,
//         hfcHeader,
//         (item) => item.category === row.category
//       );
//       const record = reducedFilter(
//         dbRecordsCategory,
//         hfcHeader,
//         (item) => item.end_use === row.end_use
//       );
//       const apiRecord = reducedFilterId(
//         dbRecordsCategory,
//         hfcHeader,
//         (item) => item.end_use === row.end_use
//       );

//       if (record.length > 0) {
//         row.id = apiRecord[0].id;
//         exist.push(row);
//       } else if (record.length < 1) {
//         notExist.push(row);
//       }
//     });

//     return { exist, notExist };
//   };

//   // Dialog Actions
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//   };

//   const submitData = async () => {
//     await updateRecords(existData);
//     await createRecords(newData);
//     await setCompleteStatus(true);
//   };

//   const updateRecords = async (data) => {
//     const location = dataSet === "hfc" ? "measurements" : "metrics";
//     const recordLength = data.length;
//     // If the object exists, update it via API
//     if (recordLength > 0) {
//       for (let i = 0; i < recordLength; i += 100) {
//         const requests = await data.slice(i, i + 100).map((row) => {
//           // Added await here
//           return puts({
//             row,
//             location,
//           }).catch((e) => console.log(`Error updating record: ${row} - ${e}`));
//         });
//         await Promise.all(requests); // Use this to await all the promises
//       }
//     }
//   };
//   // creates records
//   const createRecords = async (data) => {
//     const location = dataSet === "hfc" ? "measurements" : "metrics";
//     const recordLength = data.length;
//     // If the object exists, update it via API
//     if (recordLength > 0) {
//       for (let i = 0; i < recordLength; i += 100) {
//         const requests = await data.slice(i, i + 100).map((row) => {
//           // added await here
//           return posts({
//             row,
//             location,
//           }).catch((e) => console.log(`Error creating record: ${row} - ${e}`));
//         });
//         await Promise.all(requests); // Use this to await all the promises
//       }
//     }
//   };

//   const puts = async ({ row, location }) => {
//     await axios
//       .put(`/api/hfc/${location}/`, {
//         data: row,
//         headers: {
//           Authorization: `Token ${window.localStorage
//             .getItem("token")
//             .replace(/['"]+/g, "")}`,
//         },
//       })
//       .then((r) => r.data);
//   };

//   const posts = async ({ row, location }) => {
//     const endpoint = `/api/${location}/create`;
//     await axios.post(endpoint, row);
//   };

//   if (completeStatus) {
//     window.location.href = "/portal/";
//   }

//   return (
//     <>
//       <Alert severity="info">
//         <AlertTitle>New Feature!</AlertTitle>
//         This new feature is still undergoing testing but is available for use.
//         Please let us know if you run into issues.
//       </Alert>
//       <Grid container className={classes.container}>
//         <Toolbar className={classes.pageHeader}>
//           <Typography
//             className={classes.title}
//             variant="h3"
//             color="secondary"
//             align="left"
//           >
//             Upload Data
//           </Typography>
//         </Toolbar>
//         <Grid item xs={12}>
//           <Paper className={classes.stagePaper}>
//             <HelpText />
//           </Paper>
//         </Grid>
//         <Grid item xs={6}>
//           <Paper className={classes.middlePaper}>
//             <Grid container className={classes.container}>
//               <Toolbar className={classes.pageHeader}>
//                 <Typography
//                   className={classes.title}
//                   variant="h5"
//                   color="secondary"
//                   align="left"
//                 >
//                   Sample Data Sets
//                 </Typography>
//               </Toolbar>
//               <Grid item xs={12}>
//                 <SampleDataText />
//               </Grid>
//               <Grid item xs={6} className={classes.innerGrid}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   color="secondary"
//                   onClick={() =>
//                     csvDownload(hfcData, "scenario_sample_data.csv")
//                   }
//                 >
//                   Scenario Data
//                 </Button>
//               </Grid>
//               <Grid item xs={6} className={classes.innerGrid}>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   color="primary"
//                   onClick={() =>
//                     csvDownload(stateData, "state_sample_data.csv")
//                   }
//                 >
//                   State Data
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>
//         <Grid item xs={6}>
//           <Paper className={classes.middlePaper}>
//             <Toolbar className={classes.pageHeader}>
//               <Typography
//                 className={classes.title}
//                 variant="h5"
//                 color="secondary"
//                 align="left"
//               >
//                 Upload .CSV File
//               </Typography>
//             </Toolbar>
//             <Upload
//               setError={setError}
//               error={error}
//               handleOnFileLoad={handleOnFileLoad}
//               handleOnRemoveFile={handleOnRemoveFile}
//             />
//           </Paper>
//         </Grid>
//         {uploadData.length < 1 && checks.errorRows.length < 1 ? (
//           ""
//         ) : (
//           <Grid item xs={12} className={classes.stagePaper}>
//             <MaterialButton
//               onClick={() => handlePrepSubmit()}
//               disabled={isProcessing}
//               text={
//                 isProcessing ? "PROCESSING PRELIM CHECKS..." : "BEGIN UPLOAD"
//               }
//               color="accent"
//               width="100"
//             />
//           </Grid>
//         )}
//         <Grid item xs={12}>
//           {uploadData.length > 0 && (
//             <Paper className={classes.stagePaper}>
//               <link
//                 rel="stylesheet"
//                 href="https://fonts.googleapis.com/icon?family=Material+Icons"
//               />
//               <CustomMaterialTable
//                 title="Preview Data"
//                 columns={uploadData.length > 0 ? columns : []}
//                 data={uploadData.length > 0 ? uploadData : []}
//                 components={{
//                   Container: (props) => props.children,
//                 }}
//                 options={{
//                   headerStyle: {
//                     padding: "10px 4px 10px 4px",
//                     fontSize: ".85rem",
//                   },
//                   cellStyle: {
//                     padding: "14px 4px 14px 4px",
//                     fontSize: ".8rem",
//                   },
//                   pageSize: uploadData.length > 0 ? uploadData.length : 10,
//                   rowStyle: (rowData) => ({
//                     backgroundColor: rowData.errors
//                       ? theme.palette.error.light
//                       : "",
//                   }),
//                 }}
//                 editable={{
//                   onRowAdd: (newData) =>
//                     new Promise((resolve, reject) => {
//                       setTimeout(async () => {
//                         const cleanNewData =
//                           dataSet === "hfc"
//                             ? ShapeHfcData(newData)
//                             : ShapeStateData(newData);
//                         const dataUpdate = [...uploadData, cleanNewData];
//                         const { data, errorRows } = await runChecks(
//                           dataUpdate,
//                           dataSet
//                         );
//                         await setChecks({ ...checks, errorRows: errorRows });
//                         await setUploadData(data);
//                         setUploadData([...data]);

//                         resolve();
//                       }, 1000);
//                     }),
//                   onRowUpdate: (newData, oldData) =>
//                     new Promise((resolve, reject) => {
//                       setTimeout(async () => {
//                         const dataUpdate = [...uploadData];
//                         const index = oldData.tableData.id;
//                         dataUpdate[index] = newData;
//                         const { data, errorRows } = await runChecks(
//                           dataUpdate,
//                           dataSet
//                         );
//                         await setChecks({ ...checks, errorRows: errorRows });
//                         await setUploadData(data);
//                         setUploadData([...data]);

//                         resolve();
//                       }, 1000);
//                     }),
//                   onRowDelete: (oldData) =>
//                     new Promise((resolve, reject) => {
//                       setTimeout(async () => {
//                         const dataDelete = [...uploadData];
//                         const index = oldData.tableData.id;
//                         dataDelete.splice(index, 1);
//                         const { data, errorRows } = await runChecks(
//                           dataDelete,
//                           dataSet
//                         );
//                         await setChecks({ ...checks, errorRows: errorRows });
//                         await setUploadData(data);
//                         setUploadData([...data]);

//                         resolve();
//                       }, 1000);
//                     }),
//                 }}
//               />
//             </Paper>
//           )}
//         </Grid>
//       </Grid>
//       <Footer />
//       <UploadPop
//         openDialog={openDialog}
//         handleDialogClose={handleDialogClose}
//         existData={existData}
//         newData={newData}
//         submitData={submitData}
//         checks={checks}
//         error={error}
//       />
//     </>
//   );
// }
