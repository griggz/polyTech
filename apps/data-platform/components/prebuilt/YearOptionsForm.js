import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import theme from '../views/ui/MaterialTheme';

const styledBy = (property, mapping) => (props) => mapping[props[property]];

// We can use inline-style
const styles = {
  root: {
    '& .MuiSvgIcon-root': {
      color: styledBy('type', {
        default: '',
        secondary: '#fff'
      })
    },
    '& .MuiSelect-root': {
      color: styledBy('type', {
        default: '',
        secondary: '#fff'
      })
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: styledBy('type', {
        default: '',
        secondary: '#fff'
      })
    },
    '& .MuiFormLabel-root': {
      color: styledBy('type', {
        default: '',
        secondary: '#fff'
      })
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: styledBy('type', {
        default: '',
        secondary: theme.palette.primary.light
      })
    },
    minWidth: styledBy('minWidth', {
      120: '120px',
      80: '80px',
      0: 0,
      full: '100%'
    }),
    margin: styledBy('margin', {
      default: theme.spacing(1),
      0: 0
    })
  }
}

const StyledTextField = withStyles(styles)(({ classes, ...other }) => (
  <TextField className={classes.root} {...other} />
))

export default function YearDropDown ({ onChange, year, label, variant, disabled, required, handleChange, type, minwidth, margin, ...other }) {
  return (
    <>
      <StyledTextField
        select
        type={type}
        value={year}
        minwidth={minwidth}
        margin={margin}
        disabled={disabled}
        required={required}
        onChange={handleChange}
        variant={variant}
        label={label === 'none' ? '' : 'Year'}
        id='yearChoice'
        name='year'
      >
        {Years.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledTextField>
    </>
  )
}

const Years = [
  { value: '2050', label: '2050' },
  { value: '2049', label: '2049' },
  { value: '2048', label: '2048' },
  { value: '2047', label: '2047' },
  { value: '2046', label: '2046' },
  { value: '2045', label: '2045' },
  { value: '2044', label: '2044' },
  { value: '2043', label: '2043' },
  { value: '2042', label: '2042' },
  { value: '2041', label: '2041' },
  { value: '2040', label: '2040' },
  { value: '2039', label: '2039' },
  { value: '2038', label: '2038' },
  { value: '2037', label: '2037' },
  { value: '2036', label: '2036' },
  { value: '2035', label: '2035' },
  { value: '2034', label: '2034' },
  { value: '2033', label: '2033' },
  { value: '2032', label: '2032' },
  { value: '2031', label: '2031' },
  { value: '2030', label: '2030' },
  { value: '2029', label: '2029' },
  { value: '2028', label: '2028' },
  { value: '2027', label: '2027' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
  { value: '2014', label: '2014' },
  { value: '2013', label: '2013' },
  { value: '2012', label: '2012' },
  { value: '2011', label: '2011' },
  { value: '2010', label: '2010' },
  { value: '2009', label: '2009' },
  { value: '2008', label: '2008' },
  { value: '2007', label: '2007' },
  { value: '2006', label: '2006' },
  { value: '2005', label: '2005' }
]
