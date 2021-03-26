import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import States from '../prebuilt/States'

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: '200px'
  }
}))

export default function StateDropDown (props) {
  const classes = useStyles()
  const { handleChange, toggleStateName } = props

  return (
    <>
      <Autocomplete
        id='countriesList'
        className={classes.paper}
        options={States}
        value={toggleStateName}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => { handleChange(newValue) }}
        getOptionSelected={(option, value) => toggleStateName.value === value.value}
        disableClearable
        renderInput={(params) => <TextField
          {...params}
          size='small'
          label='State'
          variant='outlined'
        />}
      />
    </>
  )
}
