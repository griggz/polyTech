import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppVersionText from './AppVersionText.js';
import Tooltip from '@material-ui/core/Tooltip';
import ReactMarkdown from 'react-markdown';
import theme from '../ui/MaterialTheme';

export default function ChangeLogDialog () {
  const [open, setOpen] = useState(false)

  // opens dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  // closes dialog
  const handleClose = () => {
    setOpen(false)
  }

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Tooltip id='tip-version' title='Release Notes'>
        <Button color='primary' onClick={handleClickOpen} area-label='Release Notes'>
        1.0.0
        </Button>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContent>
          <ReactMarkdown
            source={AppVersionText}
            escapeHtml={false}
          />
        </DialogContent>
        <Button onClick={handleClose} color='secondary' autoFocus>
            Close
        </Button>
      </Dialog>
    </>
  )
}
