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
import translate from "../i18n/translate";
import MaterialButton from "../prebuilt/MaterialButton";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import TwitterButton from "../prebuilt/TwitterButton";
// import { useStripe } from '@stripe/react-stripe-js'
import { fetchCharge } from "../../utils/CheckoutHelpers";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = () => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
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
  button: {
    padding: theme.spacing(1),
  },
  tweet: {
    backgroundColor: theme.palette.primary[500],
    color: "#000",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  print: {
    color: "#fff",
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginTop: theme.spacing(2),
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Tweet = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;

  return (
    <Paper elevation={0} className={classes.tweet} {...other}>
      <Typography id="tweetText" variant="caption" className={classes.caption}>
        {children}
      </Typography>
    </Paper>
  );
});

const PrintReceipt = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <Typography id="printReceipt" variant="body1" className={classes.print}>
      {children}
    </Typography>
  );
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
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
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const chopTweet = ({ tweet, chopText }) => {
  if (!tweet) {
    return "Undefined";
  } else {
    return tweet.split(chopText)[0];
  }
};

export default function SuccessDialog(props) {
  const [open, setOpen] = useState(props.open);
  const [doneLoading, setDoneLoading] = useState(false);
  const [chargeData, setChargeData] = useState();
  const pageUrl = "www.covid19responsefund.org";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Loads the application
  useEffect(() => {
    async function load() {
      if (props.checkoutDetails.object !== "charge") {
        const charge = await fetchCharge(props.checkoutDetails.id);
        await setChargeData(charge);
        await setDoneLoading(true);
      } else {
        await setChargeData(props.checkoutDetails);
        await setDoneLoading(true);
      }
    }
    // Load
    load();
  }, []);

  // builds the twitter intent link
  function makeTweetableUrl(text, pageUrl) {
    const tweetableText =
      "https://twitter.com/intent/tweet?url=" +
      pageUrl +
      "&text=" +
      encodeURIComponent(text);
    return tweetableText;
  }

  // Builds tweet window with tweet
  async function onClickToTweet(e) {
    e.preventDefault();
    const tweetText = await chopTweet({
      tweet: document.querySelector("#tweetText").innerText,
      chopText: pageUrl,
    });
    window.open(
      makeTweetableUrl(tweetText, pageUrl),
      "twitterwindow",
      "height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0"
    );
  }

  if (!doneLoading) {
    return <CircularProgress color="secondary" size=".9rem" />;
  }

  return (
    <>
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: theme.palette.info.main,
            color: "#ffff",
          },
        }}
      >
        <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
          {translate("transaction_complete")}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            {translate("thank_you")} {translate("email_confirmation")}
          </Typography>

          <Typography variant="body1" gutterBottom>
            {translate("twitter_share")}
          </Typography>

          <Tweet>{translate("example_tweet")}</Tweet>

          <Typography align="center">
            <TwitterButton onClick={onClickToTweet} text="Tweet" />
          </Typography>

          <PrintReceipt>{translate("print_confirmation")}</PrintReceipt>
        </DialogContent>
        <DialogActions>
          <MaterialButton
            // href={chargeData.receipt_url}
            onClick={handleClose}
            target="_blank"
            text={translate("receipt")}
            color="blue"
            width="100"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
