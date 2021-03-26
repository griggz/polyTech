import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import theme from '../hfc/ui/MaterialTheme'

const useStyles = makeStyles(() => ({
  margin: {
    margin: theme.spacing(1),
    minWidth: '120px'
  },
  label: {
    // color: theme.palette.secondary
  }
}))

export default function RegionDropDown (props) {
  const classes = useStyles()
  const { regionName } = props
  const { handleChange } = props

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant='outlined' className={classes.margin}>
        <InputLabel id='demo-simple-select-outlined-label'>Region</InputLabel>
        <Select
        // labelId="demo-simple-select-outlined-label"
        // id="demo-simple-select-outlined"
          value={regionName}
          name='regionName'
          required='required'
          onChange={handleChange}
          label='Region'
        // input={<BootstrapInput />}
        >
          <MenuItem value=''>
            <em>All</em>
          </MenuItem>
          <MenuItem value='northeast'>NorthEast</MenuItem>
          <MenuItem value='midwest'>MidWest</MenuItem>
          <MenuItem value='south'>South</MenuItem>
          <MenuItem value='west'>West</MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  )
};
