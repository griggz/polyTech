/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import States from '../prebuilt/States'
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.light
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#57cc99'
    },
    '& .MuiChip-root': {
      color: '#fff',
      backgroundColor: '#57cc99'
    },
    '& .MuiChip-deleteIcon': {
      color: '#fff'
    }
  },
  input: {
    '& .MuiFormLabel-root': {
      color: theme.palette.primary.main
    }
  }
}))

export default function StateDropDownMultiple (props) {
  const classes = useStyles()
  const { handleStateChange, toggleStates } = props
  const [error, setError] = useState()

  const handleChangeMiddle = (value) => {
    if (value.length === 10) {
      setError('Max number of States selected! Please remove a State before adding another.')
    } else {
      setError()
      handleStateChange(value)
    }
  }
  return (
    <>
      <Autocomplete
        multiple
        id='tags-outlined'
        classes={{ inputRoot: classes.inputRoot }}
        options={States}
        value={toggleStates || ''}
        getOptionLabel={(option) => option.name}
        defaultValue={toggleStates[0]}
        getOptionSelected={(option, value) => option.value === value.value}
        disableClearable
        filterSelectedOptions
        onChange={(event, newValue) => { handleChangeMiddle(newValue) }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.input}
            variant='outlined'
            placeholder='Select'
            label='States'
          />
        )}
      />
      {error
        ? <FormHelperText style={{ color: '#fe7f2d' }}>{error}</FormHelperText>
        : ''}
    </>
  )
}
