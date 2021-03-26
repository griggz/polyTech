import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import EndUse from '../prebuilt/EndUse'

export default function EndUseDropDown (props) {
  const { onChange, endUse, disabled, required } = props

  return (
    <>
      <Autocomplete
        id='en'
        options={EndUse}
        value={endUse || ''}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => { onChange(newValue) }}
        getOptionSelected={(option, value) => !endUse ? null : endUse.value === value.value}
        fullWidth
        disabled={disabled}
        renderInput={(params) => <TextField
          {...params}
          margin='dense'
          label='End Use'
          required={required}
        />}
      />
    </>
  )
}
