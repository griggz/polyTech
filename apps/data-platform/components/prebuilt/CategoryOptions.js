import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Categories from '../prebuilt/Category'

export default function CategoryDropDown (props) {
  const { onChange, category, disabled, required } = props

  return (
    <>
      <Autocomplete
        id='countriesList'
        options={Categories}
        value={category || ''}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => { onChange(newValue) }}
        getOptionSelected={(option, value) => !category ? null : category.value === value.value}
        fullWidth
        disabled={disabled}
        renderInput={(params) => <TextField
          {...params}
          margin='dense'
          label='Category'
          required={required}
        />}
      />
    </>
  )
}
