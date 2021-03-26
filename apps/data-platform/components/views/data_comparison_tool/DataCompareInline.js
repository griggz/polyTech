import React from 'react'
import csvDownload from 'json-to-csv-export'
// Material-UI
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Toolbar from '@material-ui/core/Toolbar'
// My Componants
import theme from '../hfc/ui/MaterialTheme'
import LineViz from '../viz/LineViz.js'
import CustomMaterialTable from '../hfc/prebuilt/CustomMaterialTable'
import StateDropDownMultiple from '../hfc/prebuilt/StateOptionsMultiple'
import ScenarioDropDown from '../hfc/prebuilt/ScenarioOptions'
import YearDropDown from '../hfc/prebuilt/YearOptionsForm'

const useStyles = makeStyles(() => ({
  container: {
    padding: theme.spacing(1),
    position: 'relative'
  },
  container_new: {
    paddingTop: theme.spacing(1),
    position: 'relative',
    marginTop: '408px'
  },
  pageHeader: {
    padding: theme.spacing(1),
    fontWeight: '400',
    flexGrow: 1
  },
  horizontalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  horizontalPaperColor: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  verticalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    position: 'absolute',
    width: 'calc(100% - 16px)',
    height: '400px',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    zIndex: 1
  },
  gridItem: {
    position: 'relative'
  }
}))

const tableCols = [
  { title: 'State', field: 'state', type: 'string' },
  { title: 'Year', field: 'year', type: 'numeric' },
  { title: 'bau', field: 'bau', type: 'numeric' },
  { title: 'rmp', field: 'rmp', type: 'numeric' },
  { title: 'snap', field: 'snap', type: 'numeric' },
  { title: 'kigali', field: 'kigali', type: 'numeric' },
  { title: 'slcp', field: 'slcp', type: 'numeric' },
  { title: 'rmp & snap', field: 'rmp_snap', type: 'numeric' },
  { title: 'snap & kigali', field: 'snap_kigali', type: 'numeric' },
  { title: 'rmp, snap, slcp', field: 'rmp_snap_slcp', type: 'numeric' },
  { title: 'rmp, snap, slcp, kigali', field: 'rmp_snap_slcp_kigali', type: 'numeric' }
]

// chart toolbar styles
const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  title: {
    flex: '1 1 100%'
  }
}))

// converts the standard metric style with a more presentable structure
const showcaseMetric = (metric) => {
  const words = metric.split('_')
  if (words.length > 2) {
    return words.join(', ').toUpperCase()
  } else {
    return words.join(' & ').toUpperCase()
  }
}

// chart toolbar
const ChartToolbar = props => {
  const classes = useToolbarStyles()
  const { metric, handleScenarioChange, data } = props

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant='h6' id='tableTitle'>
        Emissions & Mitigation Options ({showcaseMetric(metric)})
      </Typography>

      <ButtonGroup variant='text' color='secondary' aria-label='text primary button group'>
        <ScenarioDropDown
          scenario={metric}
          type='default'
          minwidth={120}
          margin='none'
          onChange={handleScenarioChange}
          variant='standard'
        />
      </ButtonGroup>
    </Toolbar>
  )
}

// Prep Data for export
const prepExport = (d) => {
  return {
    state: d.state,
    year: d.year,
    bau: +d.bau,
    rmp: +d.rmp,
    kigali: +d.kigali,
    snap: +d.snap,
    slcp: +d.slcp,
    rmp_snap: +d.rmp_snap,
    snap_kigali: +d.snap_kigali,
    rmp_snap_slcp: +d.rmp_snap_slcp,
    rmp_snap_slcp_kigali: +d.rmp_snap_slcp_kigali
  }
}

const DataCompareInline = (props) => {
  const classes = useStyles()
  const {
    lineVizData,
    stateName,
    toggleStates,
    states,
    vizKeys,
    tableData,
    handleStateChange,
    handleYearChange,
    handleScenarioChange,
    year,
    metric,
    doneLoading
  } = props

  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.container}>
        <Grid container className={classes.pageHeader}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant='h5' color='secondary' align='left'>
              State Comparison Tool
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={12} lg={12} className={classes.gridItem}>
          <Paper className={classes.verticalPaper}>
            <ChartToolbar
              metric={metric}
              handleScenarioChange={handleScenarioChange}
            />
            <LineViz
              data={lineVizData}
              state={stateName}
              source='compareTool'
              states={states}
              vizKeys={vizKeys}
              title={`${metric.toUpperCase()} Emissions & Mitigation Options`}
              aspectRatio={3}
            />
          </Paper>
        </Grid>
        <Grid container className={classes.container_new}>
          <Grid item xs={12} className={classes.gridItem}>
            <Paper className={classes.horizontalPaperColor}>
              <StateDropDownMultiple
                stateName={stateName}
                handleStateChange={handleStateChange}
                toggleStates={toggleStates}
              />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} className={classes.gridItem}>
            <Paper className={classes.horizontalPaper}>
              <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
              <CustomMaterialTable
                title='Data Comparison'
                columns={tableCols}
                data={doneLoading && tableData.length >= 1 && tableData[0] !== undefined ? tableData : ''}
                options={{
                  exportButton: true,
                  search: false,
                  exportCsv: (columns, data) => { csvDownload(data.map(d => { return prepExport(d) }), `${stateName}.csv`) },
                  // pageSize: tableData.length >= 1 && tableData[0] !== undefined ? tableData.length : ''
                }}
                actions={[
                  {
                    icon: 'flip',
                    isFreeAction: true,
                    onClick: (event, rowData) => console.log('select')
                  }
                ]}
                components={{
                  Container: props => props.children,
                  Action: props => {
                    if (props.action.icon === 'flip') {
                      return (
                        <div style={{ margin: '10px 10px 10px 2px', display: 'inline-flex' }}>
                          <YearDropDown
                            year={year}
                            type='default'
                            minWidth={80}
                            handleChange={handleYearChange}
                            variant='standard'
                            label='none'
                            required
                          />
                        </div>
                      )
                    }
                  }
                }}
              />
            </Paper>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DataCompareInline
