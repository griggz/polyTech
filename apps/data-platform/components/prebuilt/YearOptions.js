import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import theme from '../ui/MaterialTheme'

const useStyles = makeStyles(() => ({
  margin: {
    margin: theme.spacing(1),
    minWidth: '120px'
  }
}))

export default function YearDropDown (props) {
  const classes = useStyles()
  const { year } = props
  const { handleChange } = props
  return (
    <FormControl variant='outlined' className={classes.margin}>
      <InputLabel id='demo-simple-select-outlined-label'>Year</InputLabel>
      <Select
        // labelId="demo-customized-select-label"
        label='Year'
        id='demo-customized-select'
        value={year}
        name='year'
        fullWidth
        required='required'
        onChange={handleChange}
      >
        <MenuItem value='2030'>2030</MenuItem>
        <MenuItem value='2029'>2029</MenuItem>
        <MenuItem value='2028'>2028</MenuItem>
        <MenuItem value='2027'>2027</MenuItem>
        <MenuItem value='2026'>2026</MenuItem>
        <MenuItem value='2025'>2025</MenuItem>
        <MenuItem value='2024'>2024</MenuItem>
        <MenuItem value='2023'>2023</MenuItem>
        <MenuItem value='2022'>2022</MenuItem>
        <MenuItem value='2021'>2021</MenuItem>
        <MenuItem value='2020'>2020</MenuItem>
        <MenuItem value='2019'>2019</MenuItem>
        <MenuItem value='2018'>2018</MenuItem>
        <MenuItem value='2017'>2017</MenuItem>
        <MenuItem value='2016'>2016</MenuItem>
        <MenuItem value='2015'>2015</MenuItem>
        <MenuItem value='2014'>2014</MenuItem>
        <MenuItem value='2013'>2013</MenuItem>
        <MenuItem value='2012'>2012</MenuItem>
        <MenuItem value='2011'>2011</MenuItem>
        <MenuItem value='2010'>2010</MenuItem>
        <MenuItem value='2009'>2009</MenuItem>
        <MenuItem value='2008'>2008</MenuItem>
        <MenuItem value='2007'>2007</MenuItem>
        <MenuItem value='2006'>2006</MenuItem>
        <MenuItem value='2005'>2005</MenuItem>
      </Select>
    </FormControl>
  )
};
