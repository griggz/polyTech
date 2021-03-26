// // React
// import React, { useState, useEffect } from "react";
// // JS Libraries
// import * as d3 from "d3";
// import axios from "axios";
// import CircularProgress from "@material-ui/core/CircularProgress";
// // My Componants
// import DataCompareInline from "./DataCompareInline.js";
// import { FilterData, UpperFirstLetter } from "../hfc/prebuilt/Helper.js.js";
// import Container from "../../prebuilt/Container";

// const CompareTool = (props) => {
//   const [stateName, setStateName] = useState();
//   const [toggleStates, setToggleStates] = useState();
//   const [metric, setMetric] = useState("bau");
//   const [year, setYear] = useState("2020");
//   const [doneLoading, setDoneLoading] = useState(false);
//   const [sourceData, setSourceData] = useState();
//   const [creds, setCreds] = useState({
//     // Creds
//     staff: null,
//     credSlug: null,
//     credState: null,
//     credStateId: null,
//     credAdminStatus: null,
//   });
//   const [lineViz, setLineViz] = useState({
//     // Line viz
//     vizStates: [],
//     lineVizData: [],
//     vizKeys: null,
//   });
//   const [tableSettings, setTableSettings] = useState({
//     compareData: [],
//     compareCount: 1,
//     tableDoneLoading: false,
//   });

//   const addState = async (value) => {
//     const { hfcData, state, vizKeys } = await loadData([
//       value[value.length - 1].value,
//     ]);
//     const { lineData, compareData } = await prepData(hfcData, [state]);

//     // Clean LineViz Data
//     const flatLineData = [...lineViz.lineVizData, lineData].flat();
//     const newLineData = await mergeReduce(flatLineData, "year");
//     const newSourceData = [...sourceData, hfcData].flat();

//     // Update State
//     setSourceData(newSourceData);
//     setToggleStates(value);
//     setTableSettings({
//       ...tableSettings,
//       compareData:
//         compareData.length === 0
//           ? tableSettings.compareData
//           : [...tableSettings.compareData, compareData[0]],
//       compareCount: value.length,
//     });
//     setLineViz({
//       ...lineViz,
//       vizStates: [...lineViz.vizStates, state],
//       lineVizData: newLineData,
//       vizKeys: [...lineViz.vizKeys, vizKeys],
//     });
//   };

//   const removeState = async (value) => {
//     const newStates = value.map((d) => {
//       return d.value;
//     });
//     const remove = lineViz.vizStates.filter((d) => {
//       return !newStates.includes(d);
//     });
//     // get new source data
//     const newSourceData = sourceData.filter(function (d) {
//       return !remove.includes(d.state);
//     });

//     // clean compareData
//     const compareData =
//       tableSettings.compareData !== undefined
//         ? tableSettings.compareData.filter((item) => item.state !== remove[0])
//         : [];

//     // build new vizkeys
//     const vizKeys = lineViz.vizKeys.filter(
//       (item) => item !== `${remove[0]}_${metric}`
//     );

//     // clean vizData
//     const newLineData = [];
//     lineViz.lineVizData.forEach((d) => {
//       delete d[`${remove[0]}_${metric}`];
//       if (Object.keys(d).length > 1) {
//         newLineData.push(d);
//       }
//     });

//     // Update State
//     setToggleStates(value);
//     setTableSettings({
//       ...tableSettings,
//       compareData: compareData,
//       compareCount: value.length,
//     });
//     setLineViz({
//       ...lineViz,
//       vizStates: newStates,
//       lineVizData: newLineData,
//       vizKeys: vizKeys,
//     });
//     setSourceData(newSourceData);
//   };
//   // Toggle the state data
//   const handleStateChange = async (value) => {
//     // setDoneLoading(false)
//     if (value.length < tableSettings.compareCount) {
//       await removeState(value);
//     } else {
//       await addState(value);
//     }
//   };

//   // Grabs credentials with home State details
//   useEffect(() => {
//     async function load() {
//       if (props.credStatus == true) {
//         const { hfcData, state, vizKeys } = await loadData([
//           window.localStorage.getItem("userState").replace(/['"]+/g, ""),
//         ]);
//         const { lineData, compareData } = await prepData(hfcData, [state]);

//         // Update State
//         setSourceData(hfcData);
//         setToggleStates([{ value: state, name: UpperFirstLetter(state) }]);
//         setTableSettings({
//           ...tableSettings,
//           compareData: compareData,
//         });
//         setLineViz({
//           ...lineViz,
//           vizStates: [state],
//           lineVizData: lineData,
//           vizKeys: [vizKeys],
//         });
//         setDoneLoading(true);
//       }
//     }
//     // Load
//     load();
//   }, []);

//   // Loads data
//   const loadData = async (state) => {
//     // Gather measurements data for specific state
//     const scenarioData = await axios
//       .get(`/api/hfc/measurements/${state}`, {
//         headers: {
//           Authorization: `Bearer ${window.localStorage
//             .getItem("accessToken")
//             .replace(/['"]+/g, "")}`,
//         },
//       })
//       .then((r) => r.data);
//     const filter = await FilterData(
//       scenarioData.hfc_metrics,
//       "category",
//       "annual_total",
//       "not"
//     );
//     const prep = await prepHfcMetrics(filter);

//     return {
//       hfcData: prep,
//       state: scenarioData.name,
//       vizKeys: `${scenarioData.name}_${metric}`,
//     };
//   };

//   // Data Prep
//   const prepData = async (hfcData, states, currMetric) => {
//     if (hfcData) {
//       // Build Line Viz Data
//       const groupedVizData = await groupByVizData(
//         hfcData,
//         "year",
//         states,
//         currMetric || metric
//       );
//       const ungroupVizData = unGroupVizData(
//         groupedVizData,
//         states,
//         currMetric || metric
//       );
//       ungroupVizData.sort((a, b) =>
//         a.year > b.year ? 1 : b.year > a.year ? -1 : 0
//       );
//       // update values in line chart to use 2 decimal places
//       ungroupVizData.map((d) =>
//         Object.keys(d).map((k) => {
//           if (k !== "year") {
//             d[`${k}`] = +d[`${k}`].toFixed(2);
//           }
//         })
//       );
//       // Build Table Data
//       const filter = await FilterData(hfcData, "year", year, "equals");
//       const dataRollup = groupBy(filter, "state", year, currMetric);
//       const tableData = ungroup(dataRollup);

//       return { lineData: ungroupVizData, compareData: tableData };
//     }
//   };

//   // Grouping for the line viz at the top
//   const groupByVizData = async (data, key1, states, metric) => {
//     if (states.length === 1) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 2) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 3) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 4) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 5) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//           [`${states[4]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[4]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 6) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//           [`${states[4]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[4]}_${metric}`]
//           ),
//           [`${states[5]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[5]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 7) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//           [`${states[4]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[4]}_${metric}`]
//           ),
//           [`${states[5]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[5]}_${metric}`]
//           ),
//           [`${states[6]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[6]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 8) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//           [`${states[4]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[4]}_${metric}`]
//           ),
//           [`${states[5]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[5]}_${metric}`]
//           ),
//           [`${states[6]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[6]}_${metric}`]
//           ),
//           [`${states[7]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[7]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 9) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//           [`${states[4]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[4]}_${metric}`]
//           ),
//           [`${states[5]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[5]}_${metric}`]
//           ),
//           [`${states[6]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[6]}_${metric}`]
//           ),
//           [`${states[7]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[7]}_${metric}`]
//           ),
//           [`${states[8]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[8]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     } else if (states.length === 10) {
//       const dataRollup = d3
//         .nest()
//         .key((d) => d[key1])
//         .rollup((v) => ({
//           [`${states[0]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[0]}_${metric}`]
//           ),
//           [`${states[1]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[1]}_${metric}`]
//           ),
//           [`${states[2]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[2]}_${metric}`]
//           ),
//           [`${states[3]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[3]}_${metric}`]
//           ),
//           [`${states[4]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[4]}_${metric}`]
//           ),
//           [`${states[5]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[5]}_${metric}`]
//           ),
//           [`${states[6]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[6]}_${metric}`]
//           ),
//           [`${states[7]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[7]}_${metric}`]
//           ),
//           [`${states[8]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[8]}_${metric}`]
//           ),
//           [`${states[9]}_${metric}`]: d3.sum(
//             v,
//             (d) => d[`${states[9]}_${metric}`]
//           ),
//         }))
//         .entries(data);
//       return dataRollup;
//     }
//   };

//   const unGroupVizData = (groupedData, states, metric) => {
//     const arr = [];
//     groupedData.forEach(function (keys) {
//       if (states.length === 1) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//         });
//       } else if (states.length === 2) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//         });
//       } else if (states.length === 3) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//         });
//       } else if (states.length === 4) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//         });
//       } else if (states.length === 5) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[4]}_${metric}`],
//         });
//       } else if (states.length === 6) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//           [`${states[4]}_${metric}`]: keys.value[`${states[4]}_${metric}`],
//           [`${states[5]}_${metric}`]: keys.value[`${states[5]}_${metric}`],
//         });
//       } else if (states.length === 7) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//           [`${states[4]}_${metric}`]: keys.value[`${states[4]}_${metric}`],
//           [`${states[5]}_${metric}`]: keys.value[`${states[5]}_${metric}`],
//           [`${states[6]}_${metric}`]: keys.value[`${states[6]}_${metric}`],
//         });
//       } else if (states.length === 8) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//           [`${states[4]}_${metric}`]: keys.value[`${states[4]}_${metric}`],
//           [`${states[5]}_${metric}`]: keys.value[`${states[5]}_${metric}`],
//           [`${states[6]}_${metric}`]: keys.value[`${states[6]}_${metric}`],
//           [`${states[7]}_${metric}`]: keys.value[`${states[7]}_${metric}`],
//         });
//       } else if (states.length === 9) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//           [`${states[4]}_${metric}`]: keys.value[`${states[4]}_${metric}`],
//           [`${states[5]}_${metric}`]: keys.value[`${states[5]}_${metric}`],
//           [`${states[6]}_${metric}`]: keys.value[`${states[6]}_${metric}`],
//           [`${states[7]}_${metric}`]: keys.value[`${states[7]}_${metric}`],
//           [`${states[8]}_${metric}`]: keys.value[`${states[8]}_${metric}`],
//         });
//       } else if (states.length === 10) {
//         arr.push({
//           year: keys.key,
//           [`${states[0]}_${metric}`]: keys.value[`${states[0]}_${metric}`],
//           [`${states[1]}_${metric}`]: keys.value[`${states[1]}_${metric}`],
//           [`${states[2]}_${metric}`]: keys.value[`${states[2]}_${metric}`],
//           [`${states[3]}_${metric}`]: keys.value[`${states[3]}_${metric}`],
//           [`${states[4]}_${metric}`]: keys.value[`${states[4]}_${metric}`],
//           [`${states[5]}_${metric}`]: keys.value[`${states[5]}_${metric}`],
//           [`${states[6]}_${metric}`]: keys.value[`${states[6]}_${metric}`],
//           [`${states[7]}_${metric}`]: keys.value[`${states[7]}_${metric}`],
//           [`${states[8]}_${metric}`]: keys.value[`${states[8]}_${metric}`],
//           [`${states[9]}_${metric}`]: keys.value[`${states[9]}_${metric}`],
//         });
//       }
//     });
//     return arr;
//   };

//   const mergeReduce = (array, key) => {
//     let res = array.reduce(
//       (a, c) => ({ ...a, [c[key]]: { ...a[c[key]], ...c } }),
//       {}
//     );
//     res = Object.values(res);
//     return res;
//   };

//   // group data with single key
//   const groupBy = (data, key, year, currMetric) => {
//     const dataRollup = d3
//       .nest()
//       .key((d) => d[key])
//       .rollup((v) => ({
//         year: year,
//         bau: d3.sum(v, (d) => d.bau).toFixed(2),
//         rmp: d3.sum(v, (d) => d.rmp).toFixed(2),
//         kigali: d3.sum(v, (d) => d.kigali).toFixed(2),
//         snap: d3.sum(v, (d) => d.snap).toFixed(2),
//         slcp: d3.sum(v, (d) => d.slcp).toFixed(2),
//         rmp_snap: d3.sum(v, (d) => d.rmp_snap).toFixed(2),
//         snap_kigali: d3.sum(v, (d) => d.snap_kigali).toFixed(2),
//         rmp_snap_slcp: d3.sum(v, (d) => d.rmp_snap_slcp).toFixed(2),
//         rmp_snap_slcp_kigali: d3
//           .sum(v, (d) => d.rmp_snap_slcp_kigali)
//           .toFixed(2),
//       }))
//       .entries(data);
//     return dataRollup;
//   };

//   // Ungroup dataTable data and structure to fit within the Material-ui table
//   const ungroup = (data) => {
//     const arr = [];
//     data.forEach(function (keys) {
//       arr.push({
//         state: keys.key,
//         year: keys.value.year,
//         bau: keys.value.bau,
//         rmp: keys.value.rmp,
//         snap: keys.value.snap,
//         slcp: keys.value.slcp,
//         kigali: keys.value.kigali,
//         rmp_snap: keys.value.rmp_snap,
//         snap_kigali: keys.value.snap_kigali,
//         rmp_snap_slcp: keys.value.rmp_snap_slcp,
//         rmp_snap_slcp_kigali: keys.value.rmp_snap_slcp_kigali,
//       });
//     });
//     return arr;
//   };

//   // Prepare HFC Metrics Data for display
//   const prepHfcMetrics = (data) => {
//     // shape Data => creates web formatted fields as well as actual fields
//     const dataPrep = data.map((d) => shapeVizData(d));
//     // sort data
//     dataPrep.sort((a, b) =>
//       a.category > b.category ? 1 : b.category > a.category ? -1 : 0
//     );
//     dataPrep.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));

//     return dataPrep;
//   };

//   // add fill colors to vizData
//   const shapeVizData = (d) => {
//     return {
//       state: d.state_name,
//       year: d.year,
//       bau: +d.bau,
//       rmp: +d.rmp,
//       kigali: +d.kigali,
//       snap: +d.snap,
//       slcp: +d.slcp,
//       rmp_snap: +d.rmp_snap,
//       snap_kigali: +d.snap_kigali,
//       rmp_snap_slcp: +d.rmp_snap_slcp,
//       rmp_snap_slcp_kigali: +d.rmp_snap_slcp_kigali,
//       [`${d.state_name}_bau`]: +d.bau,
//       [`${d.state_name}_rmp`]: +d.rmp,
//       [`${d.state_name}_snap`]: +d.snap,
//       [`${d.state_name}_kigali`]: +d.kigali,
//       [`${d.state_name}_slcp`]: +d.slcp,
//       [`${d.state_name}_rmp_snap`]: +d.rmp_snap,
//       [`${d.state_name}_snap_kigali`]: +d.snap_kigali,
//       [`${d.state_name}_rmp_snap_slcp`]: +d.rmp_snap_slcp,
//       [`${d.state_name}_rmp_snap_slcp_kigali`]: +d.rmp_snap_slcp_kigali,
//     };
//   };

//   // rebuilds vizKeys
//   const rebuildVizKeys = (vizKeys, metric) => {
//     const newVizKeys = [];
//     const scenarios = ["bau", "rmp", "kigali", "snap", "slcp"];
//     vizKeys.map((d) => {
//       if (d.length > 2) {
//         const word = d.split("_");
//         const indexArray = [];
//         scenarios.map((s) => {
//           return word.indexOf(s) >= 0 ? indexArray.push(+word.indexOf(s)) : 0;
//         });
//         // const scenario = word.slice(Math.min.apply(null, indexArray), word[-1]).join('_')
//         const state = word
//           .slice(word[0], Math.min.apply(null, indexArray))
//           .join("_");
//         newVizKeys.push(`${state}_${metric}`);
//       } else {
//         const words = d.split("_");
//         newVizKeys.push(`${words[0]}_${metric}`);
//       }
//     });
//     return newVizKeys;
//   };

//   // Toggles the year of the data
//   const toggleYear = async (event) => {
//     setDoneLoading(false);
//     setYear(event.target.value);
//     const filter = await FilterData(
//       sourceData,
//       "year",
//       event.target.value,
//       "equals"
//     );
//     const dataRollup = groupBy(filter, "state", event.target.value);
//     const tableData = ungroup(dataRollup);

//     // Update State
//     setTableSettings({
//       ...tableSettings,
//       compareData: tableData,
//     });
//     setDoneLoading(true);
//   };

//   // Toggles the year of the data
//   const handleScenarioChange = async (event) => {
//     setDoneLoading(false);
//     setMetric(event.target.value);

//     const lineDataArr = [];
//     const compareDataArr = [];

//     const newScenario = lineViz.vizStates.map(async (state) => {
//       const data = await FilterData(sourceData, "state", state, "equals");
//       const { lineData, compareData } = await prepData(
//         data,
//         [state],
//         event.target.value
//       );
//       lineDataArr.push(lineData);
//       compareDataArr.push(compareData);
//     });

//     Promise.all(newScenario).then(async () => {
//       // Clean LineViz Data
//       const flatLineData = lineDataArr.flat();
//       const newLineData = await mergeReduce(flatLineData, "year");

//       // rebuild VizKeys
//       const newVizKeys = rebuildVizKeys(lineViz.vizKeys, event.target.value);
//       // Update State
//       setTableSettings({
//         ...tableSettings,
//         compareData:
//           compareDataArr.flat().length === 0
//             ? tableSettings.compareData
//             : compareDataArr.flat(),
//       });
//       setLineViz({
//         ...lineViz,
//         lineVizData: newLineData,
//         vizKeys: newVizKeys,
//       });
//     });
//     setDoneLoading(true);
//   };

//   if (!doneLoading) {
//     return (
//       <Container>
//         <CircularProgress color="secondary" size="2.5rem" thickness={2} />
//       </Container>
//     );
//   }

//   return (
//     <>
//       <DataCompareInline
//         creds={creds}
//         lineVizData={lineViz.lineVizData}
//         year={year}
//         states={lineViz.vizStates}
//         vizKeys={lineViz.vizKeys}
//         stateName={stateName}
//         toggleStates={toggleStates}
//         tableData={tableSettings.compareData}
//         metric={metric}
//         compareCount={tableSettings.compareCount}
//         handleStateChange={handleStateChange}
//         handleYearChange={toggleYear}
//         handleScenarioChange={handleScenarioChange}
//         sourceData={sourceData}
//         doneLoading={doneLoading}
//       />
//     </>
//   );
// };

// export default CompareTool;
