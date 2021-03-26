import React from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import theme from '../ui/MaterialTheme'

const styledBy = (property, mapping) => (props) => mapping[props[property]]

// We can use inline-style
const styles = {
  root: {
    background: styledBy('color', {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      accent: theme.palette.accent.main,
      disabled: 'transparent'
    }),
    '&:hover': {
      background: styledBy('color', {
        primary: theme.palette.primary.dark,
        secondary: theme.palette.secondary.dark,
        accent: theme.palette.accent.dark,
        disabled: 'transparent'
      })
    },
    borderRadius: 1,
    border: 0,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12
    },
    fontWeight: 'bold',
    color: styledBy('color', {
      primary: '#fff',
      secondary: '#fff',
      accent: '#fff',
      disabled: '#000'
    }),
    minWidth: styledBy('width', {
      50: '50%',
      40: '40%',
      100: '100%',
      '': '100%'
    }),
    height: 56,
    padding: '0 15px',
    boxShadow: styledBy('color', {
      primary: '0 3px 5px 2px rgba(39, 44, 52, .3)',
      secondary: '0 3px 5px 2px rgba(58, 134, 255, .3)',
      accent: '0 3px 5px 2px rgba( 87, 204, 153, .3)',
      disabled: '0 3px 5px 2px rgba(244, 244, 244, .3)'
    })
  }
}

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => (
  <Button className={classes.root} {...other} />
))

export default function MaterialButton ({ onClick, text, color, disabled, type, width, ...other }) {
  return (disabled !== true
    ? <StyledButton color={color} width={width} onClick={onClick} type={type} {...other}>{text}</StyledButton>
    : <StyledButton color='disabled' width={width} onClick={onClick} disabled={disabled} type={type}>{text}</StyledButton>
  )
}
