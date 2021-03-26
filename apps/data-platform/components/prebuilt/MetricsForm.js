import React, { useState, useEffect } from 'react'
import axios from 'axios'
// Material-UI
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import DeleteIcon from '@material-ui/icons/Delete'
import Toolbar from '@material-ui/core/Toolbar'
import CancelIcon from '@material-ui/icons/Cancel'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
// My Components
import YearDropDown from './YearOptionsForm';
import DeleteConfirmationDialog from '../prebuilt/DeleteConfirmation';
import theme from '../views/ui/MaterialTheme';
import DialogAlert from '../prebuilt/DialogAlert';

// chart toolbar styles
const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingRight: theme.spacing(1),
    paddingLeft: '0'
  },
  title: {
    flex: '1 1 100%'
  },
  errorButton: {
    color: theme.palette.error.main
  },
  saveButton: {
    color: theme.palette.accent.main
  }
}))

// chart toolbar
const ChartToolbar = props => {
  const classes = useToolbarStyles()
  const { changeStatus, status, year, stateMember, handleDelete } = props

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant='h4' id='tableTitle'>
        {status === 'create'
          ? 'Create New Record'
          : `${year} Metrics Record`}
      </Typography>
      <ButtonGroup variant='text' aria-label='text primary button group'>
        {stateMember === true && status === '' &&
          <Button
            color='secondary'
            onClick={changeStatus}
            startIcon={<EditIcon />}
          > EDIT
          </Button>}
        {stateMember === true && status !== 'create' &&
          <Button
            onClick={handleDelete}
            className={classes.errorButton}
            startIcon={<DeleteIcon />}
          > DELETE
          </Button>}
      </ButtonGroup>
    </Toolbar>
  )
}

// Converts state values from jsx to database friendly values
const dataPrep = (d) => {
  const newData = {
    year: d.year,
    state: d.stateName,
    state_population: +d.statePopulation,
    population_growth_rate: +d.populationGrowth,
    households: +d.households,
    household_growth_rate: +d.householdsGrowth,
    household_heat_pumps: +d.householdHeatPump,
    heat_pump_growth_rate: +d.heatPumpGrowth,
    household_central_ac: +d.householdCentralAc,
    central_ac_growth_rate: +d.centralAcGrowth,
    household_room_ac: +d.householdRoomAc,
    room_ac_growth_rate: +d.roomAcGrowth,
    light_duty_vehicles: +d.lightDutyVehicles,
    light_duty_vehicles_growth_rate: +d.lightDutyVehicleGrowth
  }
  return newData
}

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

// generic filtering function
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key]
      return acc
    }, {})
  )

// generic filtering function
const reducedFilterId = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key]
      return el
    }, {})
  )

const recordExistsText = 'You are attempting to create a record which already exists! Please close this window and check to ensure you have entered the correct year. Otherwise, close this form and search for the correct record in the data table.'

const MetricsForm = (props) => {
  const classes = useToolbarStyles()
  const [state, setState] = useState({
    year: '',
    stateName: '',
    state_population: '',
    population_growth_rate: '',
    households: '',
    household_growth_rate: '',
    household_heat_pumps: '',
    heat_pump_growth_rate: '',
    household_central_ac: '',
    central_ac_growth_rate: '',
    household_room_ac: '',
    room_ac_growth_rate: '',
    light_duty_vehicles: '',
    light_duty_vehicles_growth_rate: ''
  })
  const [doneLoading, setDoneLoading] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState()
  const [alert, setAlert] = useState()

  // Creates a record via API
  const createRecord = async (data) => {
    const endpoint = `/api/${props.mode}/create`
    await axios.post(endpoint, data).then(window.location.reload())
  }

  // If the object exists, update it via API
  const updateRecord = async (data) => {
    const record = props.data
    const endpoint = `/api/${props.mode}/record/${record.id}/`
    await axios.put(endpoint, data).then(window.location.reload())
  }

  // If the object exists, delete it via API
  const deleteRecord = async (data) => {
    const record = props.data
    const endpoint = `/api/${props.mode}/record/${record.id}/`
    await axios.delete(endpoint, data).then(window.location.reload())
  }

  // data loader
  const loadData = async () => {
    const endpoint = `/api/metrics/${state.stateName}/`
    // Gather measurements data for specific state
    const apiData = await axios(endpoint).then(r => r.data.state_metrics)
    return apiData
  }

  const handleAlertClose = async () => {
    await setAlert(false)
  }

  // Dialog Actions
  const handleDialogClose = async () => {
    await setDeleteDialog(false)
  }

  const handleRecordDelete = async () => {
    await setDeleteDialog(true)
  }

  // Identifies whether this is a new record or an existing record and posts or puts
  const handleSubmit = async (event) => {
    event.preventDefault()

    const localEntry = await dataPrep(state)

    const apiData = await loadData()
    // check which records exist and which don't
    const { exist } = await checkExistence({ apiData, localEntry })

    if (props.status === 'create') {
      if (exist.length > 0) {
        setAlert(true)
      } else {
        createRecord(localEntry)
      }
    }

    if (props.status === 'edit') {
      updateRecord(localEntry)
    }
  }

  // Live data validation checks
  const handleInputChange = (event) => {
    event.preventDefault()
    const key = event.target.name
    const value = event.target.value
    setState({
      ...state,
      [key]: value
    })
  }

  // Triggard by the edit button, this enables you to edit data on the page
  const changeStatus = () => { setState({ ...state, status: 'edit', readOnly: '' }) }

  useEffect(() => {
    async function load () {
      setState({
        year: props.status === 'edit' ? props.data.year : '',
        statePopulation: props.status === 'edit' ? props.data.state_population : '',
        populationGrowth: props.status === 'edit' ? props.data.population_growth_rate : '',
        households: props.status === 'edit' ? props.data.households : '',
        householdsGrowth: props.status === 'edit' ? props.data.household_growth_rate : '',
        householdHeatPump: props.status === 'edit' ? props.data.household_heat_pumps : '',
        heatPumpGrowth: props.status === 'edit' ? props.data.heat_pump_growth_rate : '',
        householdCentralAc: props.status === 'edit' ? props.data.household_central_ac : '',
        centralAcGrowth: props.status === 'edit' ? props.data.central_ac_growth_rate : '',
        householdRoomAc: props.status === 'edit' ? props.data.household_room_ac : '',
        roomAcGrowth: props.status === 'edit' ? props.data.room_ac_growth_rate : '',
        lightDutyVehicles: props.status === 'edit' ? props.data.light_duty_vehicles : '',
        lightDutyVehicleGrowth: props.status === 'edit' ? props.data.light_duty_vehicles_growth_rate : '',
        stateName: props.stateName,
        readOnly: props.readOnly,
        status: props.status,
        stateMember: props.stateMember,
        staff: props.staff,
        mode: props.mode
      })
    }
    // Load
    if (props.data) {
      load()
      setDoneLoading(true)
    }
  }, [props.data, props.mode, props.readOnly, props.staff, props.stateMember, props.stateName, props.status])

  // Check to see which are updates and which are new records
  const checkExistence = ({ apiData, localEntry }) => {
    const exist = []
    const notExist = []
    const header = [[...Object.keys(localEntry), ['id']].flat()][0]

    const localRecord = reducedFilter(apiData, header, item => item.year === localEntry.year)
    const apiRecord = reducedFilterId(apiData, header, item => item.year === localEntry.year)

    if (localRecord.length > 0) {
      localEntry.id = apiRecord[0].id
      exist.push(localEntry)
    } else if (localRecord.length < 1) {
      notExist.push(localEntry)
    }
    return { exist, notExist }
  }

  if (!doneLoading) {
    return ''
  }

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      onClose={props.handleClose}
      open={props.openDialog}
      TransitionComponent={Transition}
      aria-labelledby='uploadDialog'
      id='uploadDialog'
      PaperProps={{
        style: {
          minHeight: '66vh'
        }
      }}
    >
      <DialogContent>
        <ChartToolbar
          changeStatus={changeStatus}
          status={state.status}
          year={state.year}
          stateMember={state.stateMember}
          handleDelete={handleRecordDelete}
        />
        <form
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='state'
                label='State'
                value={state.stateName}
                disabled
                onChange={handleInputChange}
                type='string'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <YearDropDown
                year={state.year}
                disabled={state.status === 'create' ? state.readOnly : true}
                handleChange={handleInputChange}
                margin='dense'
                minWidth='full'
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='statePopulation'
                name='statePopulation'
                label='State Population'
                value={state.statePopulation}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='string'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='populationGrowth'
                label='Population Growth Rate'
                name='populationGrowth'
                value={state.populationGrowth}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='string'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='households'
                name='households'
                label='households'
                value={state.households}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='householdsGrowth'
                name='householdsGrowth'
                label='Household Growth Rate'
                value={state.householdsGrowth}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='householdHeatPump'
                name='householdHeatPump'
                label='Households w/ Heat Pumps'
                value={state.householdHeatPump}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='heatPumpGrowth'
                name='heatPumpGrowth'
                label='Heat Pump Growth Rate'
                value={state.heatPumpGrowth}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='householdCentralAc'
                name='householdCentralAc'
                label='Households w/ Central AC'
                value={state.householdCentralAc}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='centralAcGrowth'
                name='centralAcGrowth'
                label='Central AC Growth Rate'
                value={state.centralAcGrowth}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='householdRoomAc'
                name='householdRoomAc'
                label='Household Room AC'
                value={state.householdRoomAc}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='roomAcGrowth'
                name='roomAcGrowth'
                label='Room AC Growth Rate'
                value={state.roomAcGrowth}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='lightDutyVehicles'
                name='lightDutyVehicles'
                label='Number of Light Duty Vehicles'
                value={state.lightDutyVehicles}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='lightDutyVehicleGrowth'
                name='lightDutyVehicleGrowth'
                label='Light Duty Vehicle Growth Rate'
                value={state.lightDutyVehicleGrowth}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  id='cancel-metrics'
                  variant='outlined'
                  color='primary'
                  onClick={props.handleClose}
                  startIcon={<CancelIcon />}
                  fullWidth
                > Cancel
                </Button>
              </Grid>
              <Grid item xs={9}>
                {props.status !== '' &&
                  <Button
                    type='submit'
                    id='create-submit-metrics'
                    variant='outlined'
                    className={classes.saveButton}
                    startIcon={<SaveIcon />}
                    fullWidth
                  > Save
                  </Button>}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DeleteConfirmationDialog
        open={deleteDialog}
        handleClose={handleDialogClose}
        deleteRecord={deleteRecord}
      />
      <DialogAlert
        open={alert}
        handleClose={handleAlertClose}
        dialogText={recordExistsText}
        dialogTitle='This record already exists!'
      />
    </Dialog>
  )
}

export default MetricsForm
