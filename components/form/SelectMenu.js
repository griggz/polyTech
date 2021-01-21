import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '../prebuilt/TextField';

const StyledTextField = (({ classes, ...other }) => (
  <TextField {...other} />
))

export default function SelectMenu ({ onChange, value, sortData, values, type, name, variant, minwidth, margin, ...other }) {

  return (
    <>
      <StyledTextField
        select
        type={type}
        value={value}
        minwidth={minwidth}
        onChange={onChange}
        margin={margin ? margin : 'none'}
        variant={variant}
        label={name}
        id='SelectValue'
        {...other}
      >
        {sortData
          ? values.sort((a, b) => a.label.localeCompare(b.label)).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
          : values.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        }
      </StyledTextField>
    </>
  )
}
