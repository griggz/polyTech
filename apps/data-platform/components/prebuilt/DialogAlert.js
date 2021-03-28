import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../views/ui/MaterialTheme";

// chart toolbar styles
const dialogStyles = makeStyles(() => ({
  errorButton: {
    color: theme.palette.error.main,
  },
  alertTitle: {
    color: theme.palette.error.main,
  },
}));

export default function DialogAlert(props) {
  const {
    open,
    handleClose,
    handleAction,
    actionText,
    dialogText,
    dialogTitle,
  } = props;
  const classes = dialogStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.alertTitle}>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          {handleAction && (
            <Button
              onClick={handleAction}
              className={classes.errorButton}
              autoFocus
            >
              {actionText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
