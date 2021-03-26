import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import Scenarios from './Scenarios'

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

export default function ScenarioOptionsMultiple ({ onChange, value }) {
  const classes = useStyles()
  return (
    <Autocomplete
      multiple
      classes={{ inputRoot: classes.inputRoot }}
      style={{ width: 500 }}
      value={value || ''}
      limitTags={4}
      size='small'
      onChange={(event, newValue) => { onChange(newValue) }}
      getOptionSelected={(option, value) => value.value === option.value}
      id='multiple-limit-tags'
      options={Scenarios}
      defaultValue={value[0]}
      getOptionLabel={(option) => option.label}
      disableClearable
      renderInput={(params) => (
        <TextField {...params} variant='outlined' label='Scenarios' placeholder='Scenarios' />
      )}
    />
  )
}
