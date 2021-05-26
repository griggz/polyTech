/* eslint-disable react/display-name */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Divider } from "@material-ui/core";
import { List, ListItem, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CustomMaterialTable from "../../../components/prebuilt/CustomMaterialTable";

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
}));

const Cols = [
  {
    title: "ID",
    field: "id",
    type: "numeric",
  },
  {
    title: "Created At",
    field: "createdAt",
    type: "string",
  },
  {
    title: "Email",
    field: "email",
    type: "string",
  },
  {
    title: "Active",
    field: "active",
    type: "boolean",
  },
  {
    title: "UserId",
    field: "userId",
    type: "string",
  },
];

const SubTable = ({ subs }) => {
  const classes = useStyles();
  const options = {
    columnsButton: true,
    pageSize: subs.length,
    pageSizeOptions: [10, 20, 30],
  };

  return (
    <CustomMaterialTable
      title="Subscriptions"
      columns={Cols}
      data={subs}
      options={options}
      components={{
        Container: (props) => (
          <Paper {...props} className={classes.table} elevation={0} />
        ),
      }}
    />
  );
};

const SubsList = ({ className, subs, edit }) => {
  const classes = useStyles();
  const subsToShow = subs.slice(0, 5);

  return (
    <Paper elevation={1} className={classes.paper}>
      {edit ? (
        <SubTable subs={subs} />
      ) : (
        <List className={clsx(classes.root, className)}>
          {subsToShow.map((sub, index) => (
            <>
              <ListItem className={classes.item} disableGutters key={sub.id}>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                >
                  <Grid container className={classes.container}>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Email: {sub.email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Subscribed On: {new Date(sub.createdAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </ListItem>
              {index !== subsToShow.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </>
          ))}
        </List>
      )}
    </Paper>
  );
};

SubsList.propTypes = {
  className: PropTypes.string,
  subs: PropTypes.array,
};

export default SubsList;
