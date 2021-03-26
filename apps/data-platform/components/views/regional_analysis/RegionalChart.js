// import React, { useState, useEffect } from 'react'
// import { Chart } from 'react-google-charts'
// import { FilterData, UpperFirstLetter } from '../prebuilt/Helper.js'
// import theme from '../ui/MaterialTheme'
// import PropTypes from 'prop-types'
// // Material-UI
// import { makeStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import ButtonGroup from '@material-ui/core/ButtonGroup'
// import { Typography } from '@material-ui/core'
// import CircularProgress from '@material-ui/core/CircularProgress'
// import Toolbar from '@material-ui/core/Toolbar'
// // My Comps
// import RegionDropDown from './prebuilt/regionOptions.js.js'
// import YearDropDown from '../prebuilt/YearOptions.js'
// import ScenarioDropDown from '../prebuilt/ScenarioOptions.js'
// // icons

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
//     margin: theme.spacing(1),
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'hidden',
//     flexDirection: 'column',
//     zIndex: 1
//   },
//   chartPaper: {
//     display: 'flex',
//     overflow: 'hidden',
//     flexDirection: 'column',
//     alignItems: 'center',
//     zIndex: 1
//   },
//   gridItem: {
//     position: 'relative'
//   },
//   chartToolbar: {
//     width: '100%'
//   }
// }))

// // chart toolbar styles
// const useToolbarStyles = makeStyles(() => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1)
//   },
//   title: {
//     flex: '1 1 100%'
//   }
// }))

// // converts the standard metric style with a more presentable structure
// const showcaseMetric = (metric) => {
//   const words = metric.split('_')
//   if (words.length > 2) {
//     return words.join(', ').toUpperCase()
//   } else {
//     return words.join(' & ').toUpperCase()
//   }
// }

// // chart toolbar
// const ChartToolbar = props => {
//   const classes = useToolbarStyles()
//   const { measurement, year, region, toggleRegion, toggleYear, toggleMeasurement } = props

//   return (
//     <Toolbar className={classes.root}>
//       <Typography className={classes.title} variant='h5' id='tableTitle'>
//         {showcaseMetric(measurement)} | ({year})
//       </Typography>

//       <ButtonGroup variant='text' color='secondary' aria-label='text primary button group'>
//         <RegionDropDown
//           regionName={region}
//           handleChange={toggleRegion}
//         />

//         <YearDropDown
//           year={year}
//           handleChange={toggleYear}
//         />

//         <ScenarioDropDown
//           scenario={measurement}
//           type='default'
//           minWidth={120}
//           margin='default'
//           onChange={toggleMeasurement}
//           variant='outlined'
//         />
//       </ButtonGroup>
//     </Toolbar>
//   )
// }

// ChartToolbar.propTypes = {
//   measurement: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
//   region: PropTypes.string.isRequired,
//   toggleRegion: PropTypes.object.isRequired
// }

// export default function RegionChart (props) {
//   const [doneLoading, setDoneLoading] = useState(null)
//   const [chartData, setChartData] = useState(null)
//   const [region, setRegion] = useState('')
//   const [measurement, setmeasurement] = useState('bau')
//   const [year, setYear] = useState('2020')
//   const { data, handleRegion } = props
//   const classes = useStyles()

//   // Grabs credentials with home State details
//   useEffect(() => {
//     async function prep () {
//       const filter = FilterData(data, 'year', '2020', 'equals')
//       // structure for chart
//       const display = shapeData(filter)
//       // Update State
//       setChartData(display)
//     }
//     // Load
//     prep()
//     setDoneLoading(true)
//   }, [data])

//   // prep data for geo chart consumption
//   const shapeData = (data, updatemeasurement = null) => {
//     let newmeasurement = null
//     if (updatemeasurement === null) {
//       newmeasurement = measurement
//     } else {
//       newmeasurement = updatemeasurement
//     }

//     const arr = []
//     arr.push(['State', newmeasurement])
//     data.forEach(d => {
//       arr.push([UpperFirstLetter(d.state), d[newmeasurement]])
//     })
//     return arr
//   }

//   // restructure data set via selected region
//   const toggleRegion = (event) => {
//     const regionSelection = event.target.value
//     if (regionSelection === null && regionSelection === '') {
//       const obj = {
//         year: year,
//         region: regionSelection
//       }
//       const newData = filterData(obj)
//       const display = shapeData(newData)
//       setChartData(display)
//       setRegion(regionSelection)
//       handleRegion(regionSelection)
//     } else {
//       const obj = {
//         year: year,
//         region: regionSelection
//       }
//       const newData = filterData(obj)
//       const display = shapeData(newData)
//       setChartData(display)
//       setRegion(regionSelection)
//       handleRegion(regionSelection)
//     }
//   }

//   // restructure data set via selected region
//   const toggleMeasurement = (event) => {
//     const measurementSelection = event.target.value
//     if (measurementSelection === '') {
//       const obj = {
//         year: year,
//         region: region
//       }
//       const newData = filterData(obj)
//       const display = shapeData(newData, 'bau')
//       setChartData(display)
//       setmeasurement('bau')
//     } else {
//       const obj = {
//         year: year,
//         region: region
//       }
//       const newData = filterData(obj)
//       const display = shapeData(newData, measurementSelection)
//       setChartData(display)
//       setmeasurement(measurementSelection)
//     }
//   }

//   const toggleYear = (event) => {
//     const yearSelection = event.target.value
//     if (yearSelection === '') {
//       const obj = {
//         year: '2020',
//         region: region
//       }
//       const newData = filterData(obj)
//       const display = shapeData(newData)
//       setChartData(display)
//       setYear('2020')
//     } else {
//       const obj = {
//         year: yearSelection,
//         region: region
//       }
//       const newData = filterData(obj)
//       const display = shapeData(newData)
//       setChartData(display)
//       setYear(yearSelection)
//     }
//   }

//   const filterData = (obj) => {
//     let rdata = data
//     Object.keys(obj).forEach(function (k) {
//       if (obj[k] !== null && obj[k] !== '') {
//         const filter = FilterData(rdata, k, obj[k], 'equals')
//         rdata = filter
//       } else {}
//     })
//     return rdata
//   }

//   if (!doneLoading) {
//     return <CircularProgress color='secondary' size='2.5rem' thickness={2} />
//   }

//   return (
//     <>
//       <Paper className={classes.verticalPaper}>
//         <ChartToolbar
//           measurement={measurement}
//           year={year}
//           region={region}
//           toggleRegion={toggleRegion}
//           toggleYear={toggleYear}
//           toggleMeasurement={toggleMeasurement}
//         />
//         <Paper className={classes.chartPaper} elevation={0}>
//           <Chart
//             width='950px'
//             height='550px'
//             keepAspectRatio='true'
//             chartType='GeoChart'
//             data={chartData}
//             options={{
//               region: 'US',
//               colorAxis: { colors: ['#fff', '#e76f51'] },
//               backgroundColor: 'white',
//               datalessRegionColor: 'white',
//               defaultColor: '#f5f5f5',
//               displayMode: 'regions',
//               resolution: 'provinces'
//             }}
//             // Note: you will need to get a mapsApiKey for your project.
//             // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
//             mapsApiKey={process.env.GOOGLE_CHARTS_AUTH}
//             rootProps={{ 'data-testid': '2' }}
//           />
//         </Paper>
//       </Paper>
//     </>
//   )
// }
