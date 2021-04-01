import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import getCurrencyValue from "../../utils/GetCurrencyValue";
import translate from "../i18n/translate";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(0, 0, 0, 2),
    position: "relative",
  },
  listItem: {
    padding: theme.spacing(0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(0),
  },
  input: {
    backgroundColor: "transparent",
  },
  text: {
    padding: theme.spacing(0, 0, 0, 2),
  },
}));

const ReviewOrder = (props) => {
  const { amount, subscription } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>
          {translate("summary")}
        </Typography>
        <List className={classes.container}>
          <ListItem className={classes.listItem} key="covidDonation">
            <ListItemText
              primary={translate("donation")}
              secondary={translate("fund")}
            />
            <Typography variant="body2">{amount}</Typography>
          </ListItem>
          {subscription ? (
            <ListItem
              className={classes.listItem}
              key="covidDonation-subscription"
            >
              <ListItemText primary={translate("monthly_donation")} />
              <Typography variant="body2">x 1</Typography>
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </Grid>
    </Grid>
  );
};

export default ReviewOrder;
