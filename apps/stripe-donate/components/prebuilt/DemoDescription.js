import React, { useState, forwardRef, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import theme from "../ui/Theme";
import MaterialButton from "../prebuilt/MaterialButton";
import Slide from "@material-ui/core/Slide";
import Markdown from "../../../../components/prebuilt/Markdown";
import Intro from "../prebuilt/posts/DemoIntroduction.md";
import Image from "next/image";

const styles = () => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: "100%",
    color: "#2b232b",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.secondary,
  },
  caption: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "inline-block",
  },
  content: {
    color: "#2b232b",
  },
  button: {
    padding: theme.spacing(1),
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Image
        src="/images/in-app/nextjs_stripe.png"
        alt="logos"
        width={750}
        height={200}
      />
      <Typography variant="h4">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          color="secondary"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    color: "#2b232b",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DemoDialog(props) {
  const [open, setOpen] = useState(props.open);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        open={open}
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "rgba(255, 253, 250, .9)",
            color: "#",
          },
        }}
      >
        <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
          DEMO
        </DialogTitle>
        <DialogContent dividers>
          <Markdown>{Intro}</Markdown>
        </DialogContent>
        {/* <DialogActions>
          <MaterialButton
            // href={chargeData.receipt_url}
            onClick={handleClose}
            target="_blank"
            text={translate("receipt")}
            color="blue"
            width="100"
          />
        </DialogActions> */}
      </Dialog>
    </>
  );
}
