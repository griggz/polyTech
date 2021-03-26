import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export default function FormDialog () {
  const [open, setOpen] = React.useState(false)
  const endpoint = '/cp/api/feedback/'

  // submission action
  const handleSubmit = async (e) => {
    e.preventDefault()
    await postData({ comments: e.target.comments.value })
  }

  // opens dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  // closes dialog
  const handleClose = () => {
    setOpen(false)
  }

  // Submits data to api
  const postData = (data) => {
    axios.post(endpoint, data)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error)
      }).then(handleClose)
  }

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        Contact Us
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Contact Us</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
            Use this form to report bugs, issues, or provide some feedback on your experience here.
            </DialogContentText>
            <TextField
              autoFocus
              multiline
              id='comments'
              rowsMax={25}
              rows={25}
              label='Comments'
              name='comments'
              variant='filled'
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='secondary'>
            Cancel
            </Button>
            <Button type='submit' color='secondary'>
            Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
