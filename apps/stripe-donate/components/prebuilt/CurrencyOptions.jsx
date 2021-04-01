import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import currencies from './currencies.jsx'
import Select from '@material-ui/core/Select'
import translate from '../i18n/translate'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 'auto'
  }
}))

export default function CurrencyOptions (props) {
  const classes = useStyles()
  const { handleChange, currency } = props

  const handleToggle = (e) => {
    currencies.forEach(function (d) {
      if (d.code === e.target.value) {
        handleChange({ currency: e.target.value, symbol: d.symbol_native })
      }
    })
  }

  return (
    <form className={classes.formControl} noValidate autoComplete='off'>
      <Select
        name='currency'
        value={currency || ''}
        onChange={handleToggle}
      >
        {currencies.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {translate(option.code)}
          </MenuItem>
        ))}
      </Select>
    </form>
  )
}
