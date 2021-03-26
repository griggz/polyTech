import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Material-UI;
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CancelIcon from '@material-ui/icons/Cancel';
import Slide from '@material-ui/core/Slide';
// My Components;
import YearDropDown from './YearOptionsForm';
import CategoryDropDown from './CategoryOptions';
import EndUseDropDown from './EndUseOptions';
import theme from '../views/ui/MaterialTheme';
import DeleteConfirmationDialog from '../prebuilt/DeleteConfirmation';
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
          : `${year} Measurement Record`}
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

const getCategory = (category) => {
  const Categories =
      [
        { value: 'category', name: 'Category' },
        { value: 'annual_total', name: 'Annual Total' },
        { value: 'refrigeration', name: 'Refrigeration' },
        { value: 'air_conditioning', name: 'Air Conditioning' },
        { value: 'mobile_r/ac', name: 'Mobile R/AC' },
        { value: 'foams', name: 'Foams' },
        { value: 'aerosols', name: 'Aerosols' },
        { value: 'other', name: 'Other' }
      ]
  return Categories.find(x => x.value === category)
}

const getEndUse = (endUse) => {
  const EndUse = [
    { value: 'bau', name: 'BAU' },
    { value: 'commericial_refrig.', name: 'Commercial Refrigeration' },
    { value: 'industrial_refrig.', name: 'Industrial Refrigeration' },
    { value: 'domestic_refrig.', name: 'Domestic Refrigeration' },
    { value: 'transport_refrigeration', name: 'Transport Refrigeration' },
    { value: 'stationary_ac_>_50_lbs._commercial', name: 'Stationary AC (>50lbs & Commercial)' },
    { value: 'stationary_ac_<50_lbs._commercial', name: 'Stationary AC (<50lbs & Commercial)' },
    { value: 'stationary_ac_residential_heat_pumps', name: 'Stationary AC Residential Heat Pumps' },
    { value: 'stationary_central_ac_residential', name: 'Stationary Central AC Residential' },
    { value: 'stationary_room_unit_ac_residential', name: 'Stationary Room Unit AC Residential' },
    { value: 'light-duty_mvac', name: 'Light-Duty MVAC' },
    { value: 'heavy-duty_mvac', name: 'Heavy-Duty MVAC' },
    { value: 'foam', name: 'Foam' },
    { value: 'aerosol_propellants', name: 'Aerosol Propellants' },
    { value: 'solvents_and_fire_suppressant', name: 'Solvents and Fire Suppressant' }
  ]
  return EndUse.find(x => x.value === endUse)
}

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

// Converts state values from jsx to database friendly values
const dataPrep = (d) => {
  const newData = {
    year: d.year,
    state: d.stateName,
    end_use: d.endUse.value,
    category: d.category.value,
    bau: +d.bau,
    rmp: +d.rmp,
    snap: +d.snap,
    kigali: +d.kigali,
    rmp_snap: +d.rmpSnap,
    snap_kigali: +d.snapKigali,
    slcp: +d.slcp,
    rmp_snap_slcp: +d.rmpSnapSlcp,
    rmp_snap_slcp_kigali: +d.rmpSnapSlcpKigali
  }
  return newData
}

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

const recordExistsText = 'You are attempting to create a record which already exists! Please close this window and check to ensure you have entered the correct year, category and end use. Otherwise, close this form and search for the correct record in the data table.'

function MeasurementsForm (props) {
  const classes = useToolbarStyles()
  const [state, setState] = useState({
    year: '',
    endUse: '',
    category: '',
    bau: '',
    rmp: '',
    snap: '',
    kigali: '',
    rmpSnap: '',
    snapKigali: '',
    slcp: '',
    rmpSnapSlcp: '',
    rmpSnapSlcpKigali: '',
    status: '',
    readOnly: '',
    stateName: '',
    staff: '',
    stateMember: '',
    mode: ''
  })
  const [doneLoading, setDoneLoading] = useState()
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
    const endpoint = `/api/measurements/${state.stateName}/`
    // Gather measurements data for specific state
    const apiData = await axios(endpoint).then(r => r.data.hfc_metrics)
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

  // Live data validation checks
  const handleDropDownChange = async (value) => {
    await setState({
      ...state,
      [Object.keys(value)[0]]: Object.values(value)[0]
    })
  }

  useEffect(() => {
    async function load () {
      // load credential data
      await setState({
        year: props.status === 'edit' ? props.data.year : '',
        endUse: props.status === 'edit' ? getEndUse(props.data.end_use) : '',
        category: props.status === 'edit' ? getCategory(props.data.category) : '',
        bau: props.status === 'edit' ? props.data.bau : '',
        rmp: props.status === 'edit' ? props.data.rmp : '',
        snap: props.status === 'edit' ? props.data.snap : '',
        kigali: props.status === 'edit' ? props.data.kigali : '',
        rmpSnap: props.status === 'edit' ? props.data.rmp_snap : '',
        snapKigali: props.status === 'edit' ? props.data.snap_kigali : '',
        slcp: props.status === 'edit' ? props.data.slcp : '',
        rmpSnapSlcp: props.status === 'edit' ? props.data.rmp_snap_slcp : '',
        rmpSnapSlcpKigali: props.status === 'edit' ? props.data.rmp_snap_slcp_kigali : '',
        status: props.status,
        readOnly: props.readOnly,
        stateName: props.stateName,
        staff: props.staff,
        stateMember: props.stateMember,
        mode: props.mode
      })
    }
    // Load
    if (props.data) {
      load()
      setDoneLoading(true)
    }
  }, [props.data, props.mode, props.readOnly, props.staff, props.stateMember, props.stateName, props.status])

  if (!doneLoading) {
    return ''
  }

  // Check to see which are updates and which are new records
  const checkExistence = ({ apiData, localEntry }) => {
    const exist = []
    const notExist = []
    const header = [[...Object.keys(localEntry), ['id']].flat()][0]

    const checkYear = reducedFilter(apiData, header, item => item.year === localEntry.year)
    const checkCategory = reducedFilter(checkYear, header, item => item.category === localEntry.category)
    const localRecord = reducedFilter(checkCategory, header, item => item.end_use === localEntry.end_use)
    const apiRecord = reducedFilterId(checkCategory, header, item => item.end_use === localEntry.end_use)

    if (localRecord.length > 0) {
      localEntry.id = apiRecord[0].id
      exist.push(localEntry)
    } else if (localRecord.length < 1) {
      notExist.push(localEntry)
    }
    return { exist, notExist }
  }

  // Triggard by the edit button, this enables you to edit data on the page
  const changeStatus = () => { setState({ ...state, status: 'edit', readOnly: '' }) }

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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='stateName'
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
              <CategoryDropDown
                onChange={(value) => handleDropDownChange({ category: value })}
                category={state.category}
                disabled={state.readOnly}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EndUseDropDown
                onChange={(value) => handleDropDownChange({ endUse: value })}
                endUse={state.endUse}
                disabled={state.readOnly}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='bau'
                name='bau'
                label='BAU'
                value={state.bau}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='rmp'
                name='rmp'
                label='RMP'
                value={state.rmp}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='snap'
                name='snap'
                label='SNAP'
                value={state.snap}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='kigali'
                name='kigali'
                label='KIGALI'
                value={state.kigali}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='slcp'
                name='slcp'
                label='SLCP'
                value={state.slcp}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='snap_kigali'
                name='snapKigali'
                label='SNAP & KIGALI'
                value={state.snapKigali}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='rmp_snap'
                name='rmpSnap'
                label='RMP & SNAP'
                value={state.rmpSnap}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='rmp_snap_slcp'
                name='rmpSnapSlcp'
                label='RMP, SNAP, SLCP'
                value={state.rmpSnapSlcp}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin='dense'
                id='rmp_snap_slcp_kigali'
                name='rmpSnapSlcpKigali'
                label='RMP, SNAP, SLCP, KIGALI'
                value={state.rmpSnapSlcpKigali}
                disabled={state.readOnly}
                onChange={handleInputChange}
                type='float'
                fullWidth
              />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button
                  id='cancel'
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
                    id='create-submit'
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
      </DialogContent>
    </Dialog>
  )
}

export default MeasurementsForm
