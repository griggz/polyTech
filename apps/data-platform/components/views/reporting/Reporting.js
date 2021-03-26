import React, { useState, useEffect } from 'react'
import FadeIn from 'react-fade-in'
// Material-UI
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
// My Componants
import theme from '../ui/MaterialTheme'
import { FetchData, UpperFirstLetter } from '../prebuilt/Helper.js'
import ReportOptionsDropDown from './ReportOptions.js'
import StateReport from './reports/generic_state_report/GenericStateReport.js'

const useStyles = makeStyles(() => ({
  container: {
    padding: theme.spacing(1),
    position: 'relative'
  },
  container_new: {
    padding: theme.spacing(1),
    position: 'relative',
    marginTop: '25px'
  },
  horizontalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(0)
  },
  verticalPaper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    position: 'absolute',
    width: 'calc(100% - 16px)',
    height: '800px',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1
  },
  cardRoot: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    position: 'relative',
    alignItems: 'center',
    zIndex: 2
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardExpand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  cardExpandOpen: {
    transform: 'rotate(180deg)'
  },
  cardAvatar: {
    // backgroundColor: red[500],
  },
  gridItem: {
    position: 'relative'
  }
}))

function Reporting (props) {
  const classes = useStyles()
  const [creds, setCreds] = useState(null)
  const [stateName, setStateName] = useState(null)
  const [doneLoading, setDoneLoading] = useState(null)
  const credsEndpoint = '/account/fetch/'
  const [report, selectReport] = useState(null)
  const [reportName, setReportName] = useState('')

  // toggles the report name and which report is viewable
  const toggleReport = (event) => {
    if (event.target.value === 'generic_state_report') {
      setReportName(event.target.value)
      selectReport(<StateReport stateName={stateName} />)
    } else {}
  }

  // Grabs credentials with home State details
  useEffect(() => {
    if (creds === null) {
      FetchData(credsEndpoint).then(function (responseData) {
        setCreds(responseData)
        setStateName(UpperFirstLetter(responseData.user_state_name))
        setDoneLoading(true)
      })
    };
  })

  if (doneLoading === null) {
    return <CircularProgress color='secondary' />
  }

  return (
    <FadeIn>
      <Grid container className={classes.container}>
        <Grid container className={classes.pageHeader}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant='h6' color='primary' align='left'>
              {UpperFirstLetter(stateName)} Reports: Select which report you would like to run...
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant='h3' color='primary' align='right'>
              <ReportOptionsDropDown
                handleChange={toggleReport}
                report={reportName}
                stateName={stateName}
              />
            </Typography>
          </Grid>
          {!report &&
            <Grid item xs={12}>
              <Typography variant='h5' color='secondary' align='left'>
              There are currently no reports apart from a sample "Generic State Report". If you have any ideas regarding what kinds of reports would be helpful to you or your team, please submit some feedback using the "Contact Us" button in the nav.
              </Typography>
            </Grid>}
        </Grid>
      </Grid>

      {report === null
        ? ''
        : <Grid container className={classes.container_new}>
          {report}
        </Grid>}
    </FadeIn>

  // <Footer />
  )
}

export default Reporting
