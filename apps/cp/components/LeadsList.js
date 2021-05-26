import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Divider, Toolbar } from "@material-ui/core";
import { List, ListItem, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    position: "relative",
  },
  itemSelected: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
    borderLeft: "solid",
  },
  button: {
    color: "#A1A1B5",
    padding: "10px 8px",
    textAlign: "inherit",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontSize: 14,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.secondary.main,
      "& $icon": {
        color: theme.palette.secondary.main,
      },
    },
  },
  paper: {
    borderRadius: "0px 0px 20px 20px",
  },
  container: {
    display: "inline-block",
  },
  containerList: {
    display: "flex",
    padding: 10,
    // justifyContent: "center",
  },
  containerCard: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 15,
  },
  paperCard: {},
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const CardToolbar = ({ title }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        {title}
      </Typography>
    </Toolbar>
  );
};

const LeadCards = ({ lead }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paperCard}>
      <CardToolbar title={lead.email} />
      <Grid container className={classes.containerCard} spacing={1}>
        <Grid item xs={12}>
          Name: {lead.firstName + " " + lead.lastName}
        </Grid>
        <Grid item xs={12}>
          Phone: {lead.workPhone}
        </Grid>
        <Grid item xs={12}>
          JobTitle: {lead.jobTitle}
        </Grid>
        <Grid item xs={12}>
          Solutions: {lead.solutions.join(", ")}
        </Grid>
        <Grid item xs={12}>
          Website: {lead.website}
        </Grid>
        <Grid item xs={12}>
          Created: {lead.createdAt}
        </Grid>
      </Grid>
    </Paper>
  );
};

const LeadsList = ({ className, leads, edit }) => {
  const classes = useStyles();
  const leadsToShow = leads.slice(0, 5);

  return (
    <Paper elevation={1} className={classes.paper}>
      {edit ? (
        <Grid container className={classes.containerList} spacing={1}>
          {leadsToShow.map((lead, index) => (
            <Grid item key={index} xs={3}>
              <LeadCards lead={lead} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <List className={clsx(classes.root, className)}>
          {leadsToShow.map((lead, index) => (
            <>
              <ListItem
                className={
                  lead.select === true ? classes.itemSelected : classes.item
                }
                disableGutters
                key={lead.id}
              >
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                >
                  <Grid container className={classes.container}>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Email: {lead.email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Content: {lead.content.slice(0, 25) + "..."}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Received: {new Date(lead.createdAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </ListItem>
              {index !== leadsToShow.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </>
          ))}
        </List>
      )}
    </Paper>
  );
};

LeadsList.propTypes = {
  className: PropTypes.string,
  leads: PropTypes.array,
};

export default LeadsList;
