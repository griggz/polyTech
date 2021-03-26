// import React, { useState, useEffect } from 'react'
// // import * as jsPDF from 'jspdf'
// import 'jspdf-autotable'
// // import * as html2canvas from 'html2canvas'
// // Material-UI
// import { makeStyles } from '@material-ui/core/styles'
// import Divider from '@material-ui/core/Divider'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'
// import { Typography } from '@material-ui/core'
// // My Componants
// import CircularProgress from '@material-ui/core/CircularProgress'
// import LineViz from '../../../viz/LineViz.js'
// import theme from '../../../ui/MaterialTheme'
// import { FetchData, FilterData } from '../../../prebuilt/Helper.js'
// import DataTable from './GenericStateReportTable'

// // DATA FETCH AND STRUCTURING

// const useStyles = makeStyles(() => ({
//   container: {
//     padding: theme.spacing(1),
//     position: 'relative'
//   },
//   container_new: {
//     padding: theme.spacing(1),
//     position: 'relative',
//     marginTop: '25px'
//   },
//   horizontalPaper: {
//     margin: theme.spacing(1),
//     padding: theme.spacing(0)
//   },
//   verticalPaper: {
//     padding: theme.spacing(1),
//     position: 'absolute',
//     width: 'calc(100% - 48px)',
//     height: '400px',
//     display: 'flex',
//     overflow: 'hidden',
//     flexDirection: 'column',
//     alignItems: 'center',
//     zIndex: 1
//   },
//   paperRoot: {
//     margin: theme.spacing(1),
//     padding: theme.spacing(2),
//     // position: 'relative',
//     alignItems: 'center'
//     // zIndex: 1,
//   },
//   hLine: {
//     margin: theme.spacing(1)
//   },
//   gridItem: {
//     position: 'relative'
//   }
// }))

// // Build Report
// function StateReport (props) {
//   const { stateName } = props
//   const [doneLoading, setDoneLoading] = useState(null)
//   const [lineViz, setLineViz] = useState([])
//   const classes = useStyles()

//   // Grabs credentials with home State details
//   useEffect(() => {
//     if (lineViz.length === 0) {
//       loadData()
//     }
//   })

//   // const description =
//   //   'This report is, in a few ways, a recreation of the dashboard landing page. \n' +
//   //   'It also illustrates measurements over a time period provided by the data. The  \n' +
//   //   'data table provides an aggregation of data related to each of the measurement \n' +
//   //   'categories \n'

//   // Execute Report
//   // const exportPDF = () => {
//   //   const input = document.getElementById('LineViz')
//   //   const options = {
//   //     scale: 4
//   //     // x: 188,
//   //     // y: 30,
//   //     // width: 200,
//   //     // height: 137,
//   //   }
//   //   html2canvas(input, options).then(function (canvas) {
//   //     // document.body.appendChild(canvas);
//   //     const imgData = canvas.toDataURL('image/jpeg')
//   //     const pdf = new jsPDF('p', 'mm', 'a4')
//   //     pdf.setFontSize(24)
//   //     pdf.text(`${stateName} Report`, 10, 20)
//   //     pdf.setFontSize(16)
//   //     pdf.text(description, 10, 30)
//   //     pdf.addImage(imgData, 'JPEG', 5, 50, 195, 65)
//   //     pdf.text('Measurements Data Aggregations', 10, 125)
//   //     pdf.autoTable({
//   //       html: '#table',
//   //       margin: { top: 130 }
//   //     })
//   //     pdf.save('downloadedPdf.pdf')
//   //   })
//   // }

//   // Loads data specific to the mode
//   const loadData = async () => {
//     // Endpoints
//     const measurementsEndpoint = `/api/measurements/${stateName.toLowerCase()}/`
//     // Gather measurements data for specific state
//     await FetchData(measurementsEndpoint).then(function (responseData) {
//       // Annual Total Data needed for Line Viz
//       const lineVizData = []
//       const filterLineData = FilterData(responseData.hfc_metrics, 'category', 'annual_total', 'equals')
//       filterLineData.sort((a, b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0))
//       const cleanData = filterLineData.map(d => shapeData(d))
//       cleanData.map(d => lineVizData.push(d))
//       setLineViz(lineVizData)
//     })
//     await setDoneLoading(true)
//   }

//   if (doneLoading === null) {
//     return <CircularProgress color='secondary' />
//   }
//   const tableStyle = {
//     marginTop: '425px'
//   }

//   // Type conversion
//   function shapeData (d) {
//     return {
//       state: d.state,
//       year: d.year,
//       bau_web: +d.bau.toFixed(2),
//       rmp_web: +d.rmp.toFixed(2),
//       kigali_web: +d.kigali.toFixed(2),
//       snap_web: +d.snap.toFixed(2),
//       slcp_web: +d.slcp.toFixed(2),
//       rmp_snap_web: +d.rmp_snap.toFixed(2),
//       snap_kigali_web: +d.snap_kigali.toFixed(2),
//       rmp_snap_slcp_web: +d.rmp_snap_slcp.toFixed(2),
//       rmp_snap_slcp_kigali_web: +d.rmp_snap_slcp_kigali.toFixed(2)
//     }
//   }

//   return (
//     <>
//       <Grid item xs={12} md={12} lg={12} className={classes.gridItem}>
//         <Paper className={classes.paperRoot}>
//           <Typography variant='h4' color='primary' align='left'>
//           Generic State Report
//           </Typography>
//           <Divider className={classes.hLine} />
//           <Typography paragraph variant='h6' color='primary' align='left'>
//           This report consolidates and illustrates some basic metrics and measurements of the state. Use to garner a general, high level overview of the State's metrics.
//           </Typography>
//           {/* <Button onClick={exportPDF}>Export Report</Button> */}
//         </Paper>
//       </Grid>
//       <Grid item xs={12} md={12} lg={12} className={classes.gridItem}>
//         <Paper className={classes.paperRoot}>
//           <Paper className={classes.verticalPaper} id='LineViz' elevation={0}>
//             <LineViz
//               data={lineViz}
//               state={stateName}
//               source='landing'
//               dy='-15.5em'
//             />
//           </Paper>
//           <div style={tableStyle}>
//             <DataTable
//               data={lineViz}
//               doneLoading
//             />
//           </div>
//         </Paper>
//       </Grid>
//     </>
//   )
// }

// export default StateReport
