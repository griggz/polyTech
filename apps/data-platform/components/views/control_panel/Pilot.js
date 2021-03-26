import React, { useState } from 'react'
import ListItemText from '@material-ui/core/ListItemText'
import Dialog from '@material-ui/core/Dialog'
import Toolbar from '@material-ui/core/Toolbar'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Slide from '@material-ui/core/Slide'
import AppBar from '@material-ui/core/AppBar'
import Tooltip from '@material-ui/core/Tooltip'
import PilotText from './PilotText.js'
import ReactMarkdown from 'react-markdown'
import CloseIcon from '@material-ui/icons/Close'
import theme from '../ui/MaterialTheme'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles(() => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  gridItem: {
    padding: '25px',
    margin: 0
  },
  list: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light
    }
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function PilotDialog () {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  // opens dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  // closes dialog
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Tooltip id='tip-beta' title='Pilot Details and Instructions'>
        <ListItem button className={classes.list} onClick={handleClickOpen}>
          <ListItemText background='primary' primary='beta' area-label='pilot' />
        </ListItem>
      </Tooltip>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color='secondary' className={classes.appBar}>
          <Toolbar>
            <IconButton edge='start' color='primary' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <ReactMarkdown
            source={PilotText}
            escapeHtml={false}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
