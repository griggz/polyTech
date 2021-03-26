import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import theme from './MaterialTheme'

const useStyles = makeStyles(() => ({
  footer: {
    display: 'flex',
    minHeight: '2%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: theme.spacing(0, 2, 3, 2)

  },
  footerText: {
    fontFamily: [
      'Cutive Mono',
      'serif'
    ].join(','),
    fontSize: '.8rem',
    color: theme.palette.secondary
  }
})
)

export default function Footer () {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <Typography className={classes.footerText} color='secondary' align='right'>
        Engineered by United Nations Foundation Technology
      </Typography>
    </div>
  )
}
