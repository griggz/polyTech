// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FilterData } from "../prebuilt/Helper.js";
// // Material-UI
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import { Typography } from "@material-ui/core";
// import CircularProgress from "@material-ui/core/CircularProgress";
// // My Componants
// import theme from "../ui/MaterialTheme";
// import Footer from "../ui/Footer.js";
// import RegionTable from "./RegionalTable.js";
// import RegionChart from "./RegionalChart.js";
// import Container from "../../prebuilt/Container";

// const useStyles = makeStyles(() => ({
//   container: {
//     padding: theme.spacing(1),
//     position: "relative",
//   },
//   pageHeader: {
//     padding: theme.spacing(1),
//     fontWeight: "400",
//     flexGrow: 1,
//   },
//   container_new: {
//     padding: theme.spacing(1),
//     position: "relative",
//     marginTop: "25px",
//   },
//   horizontalPaper: {
//     margin: theme.spacing(1),
//     padding: theme.spacing(0),
//   },
//   verticalPaper: {
//     margin: theme.spacing(1),
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "hidden",
//     flexDirection: "column",
//     alignItems: "center",
//     zIndex: 1,
//   },
//   gridItem: {
//     position: "relative",
//   },
// }));

// function RegionalAnalysis(props) {
//   const classes = useStyles();
//   // state
//   const [doneLoading, setDoneLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [regionData, setRegionData] = useState();

//   // loads initial dataset
//   const loadData = async (page) => {
//     try {
//       await axios
//         .get(`/api/hfc/region/${page}`, {
//           headers: {
//             Authorization: `Bearer ${window.localStorage
//               .getItem("accessToken")
//               .replace(/['"]+/g, "")}`,
//           },
//         })
//         .then((r) => r.data)
//         .then(function (responseData) {
//           responseData.results.map((d) =>
//             setData((oldArray) => [...oldArray, d])
//           );
//           // Check next API url is empty or not, if not empty call the above function
//           if (responseData.next) {
//             const urlPage = responseData.next
//               .split("/")
//               [responseData.next.split("/").length - 1].replace("?", "");
//             loadData(urlPage);
//           } else {
//             setDoneLoading(true);
//           }
//         });
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   const defineRegion = (region) => {
//     if (region) {
//       const filter = FilterData(data, "region", region, "equals");
//       setRegionData(filter);
//     } else {
//       setRegionData(data);
//     }
//   };

//   // Grabs credentials with home State details
//   useEffect(() => {
//     async function load() {
//       if (props.credStatus == true) {
//         await loadData("page=1");
//       }
//     }
//     // Load
//     load();
//   }, []);

//   if (!doneLoading) {
//     return (
//       <Container>
//         <CircularProgress color="secondary" size="2.5rem" thickness={2} />
//       </Container>
//     );
//   }

//   return (
//     <>
//       <Grid container className={classes.container}>
//         <Grid container className={classes.pageHeader}>
//           <Grid item xs={6} md={6} lg={6}>
//             <Typography variant="h5" color="secondary" align="left">
//               Region Analysis
//             </Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid container className={classes.container}>
//         <Grid container className={classes.pageHeader}>
//           <Grid item xs={12} md={12} lg={12}>
//             <RegionChart
//               data={data}
//               handleRegion={(region) => defineRegion(region)}
//             />
//           </Grid>
//           <Grid item xs={12} md={12} lg={12}>
//             <Paper className={classes.verticalPaper}>
//               <RegionTable data={data} regionData={regionData} />
//             </Paper>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Footer />
//     </>
//   );
// }

// export default RegionalAnalysis;
