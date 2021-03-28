import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Typography } from "@material-ui/core";
import MaterialButton from "../../prebuilt/MaterialButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "../../prebuilt/Container";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const StructureChecks = ({ invalidFields, error }) => {
  return (
    <>
      <Typography gutterBottom variant="h4" color="error" align="left">
        You have errors in your data!
      </Typography>
      <Typography gutterBottom variant="h6" color="error" align="left">
        Please close this window and correct all highlighted records in the
        table below.
      </Typography>
      {error && <ErrorContainer error={error} />}
    </>
  );
};

const ErrorContainer = ({ error }) => (
  <Typography gutterBottom variant="h4" color="error" align="left">
    {error}
  </Typography>
);

export default function UploadPop(props) {
  const [isProcessing, setIsProcessing] = useState();
  const {
    openDialog,
    handleDialogClose,
    existData,
    newData,
    submitData,
    checks,
    error,
  } = props;
  const [checkBox, setCheckBox] = useState();
  const invalidFields = [...checks.errorRows];

  const handleSubmit = async () => {
    if (checkBox) {
      await setIsProcessing(true);
      await submitData();
    }
  };

  const handleCheck = (event) => {
    setCheckBox(event.target.checked);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="uploadDialog"
        id="uploadDialog"
      >
        <DialogTitle id="max-width-dialog-title" onClose={handleDialogClose}>
          Upload Confirmation
        </DialogTitle>
        {isProcessing ? (
          <Container>
            <CircularProgress color="secondary" size="2.5rem" thickness={2} />
          </Container>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                {existData.length > 0 && invalidFields.length < 1 ? (
                  <Typography
                    gutterBottom
                    variant="h6"
                    color="secondary"
                    align="left"
                  >
                    {existData.length} existing{" "}
                    {existData.length > 1 ? "records" : "record"} will be
                    updated.
                  </Typography>
                ) : (
                  ""
                )}
                {newData.length > 0 && invalidFields.length < 1 ? (
                  <Typography
                    gutterBottom
                    variant="h6"
                    color="secondary"
                    align="left"
                  >
                    {newData.length} new{" "}
                    {newData.length > 1 ? "records" : "record"} will be created.
                  </Typography>
                ) : (
                  ""
                )}
                {invalidFields.length > 0 ? (
                  <StructureChecks
                    invalidFields={invalidFields}
                    error={error}
                  />
                ) : (
                  ""
                )}
              </DialogContentText>
              {invalidFields.length < 1 ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkBox}
                      onChange={handleCheck}
                      required
                    />
                  }
                  label="Once begun, this process cannot be reversed! Please confirm you would like to proceed with the upload!"
                />
              ) : (
                ""
              )}
            </DialogContent>
            <DialogActions>
              <MaterialButton
                onClick={handleSubmit}
                disabled={!checkBox}
                text="COMPLETE UPLOAD"
                color="accent"
                width="100"
              />
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
