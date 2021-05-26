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
  table: {
    borderRadius: "0px 0px 20px 20px",
    padding: 10,
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
    title: "Email Verified",
    field: "emailVerified",
    type: "boolean",
  },
  {
    title: "Name",
    field: "name",
    type: "string",
  },
  {
    title: "Is Admin",
    field: "isAdmin",
    type: "boolean",
  },
  {
    title: "Account Provider",
    field: "accountProvider",
    type: "string",
  },
];

const UserTable = ({ users }) => {
  const classes = useStyles();
  const options = {
    columnsButton: true,
    pageSize: users.length,
    pageSizeOptions: [10, 20, 30],
  };

  return (
    <CustomMaterialTable
      title="Users"
      columns={Cols}
      data={users}
      options={options}
      components={{
        Container: (props) => (
          <Paper {...props} className={classes.table} elevation={0} />
        ),
      }}
    />
  );
};

const UsersList = ({ className, users, edit }) => {
  const classes = useStyles();
  const usersToShow = users.slice(0, 5);

  return (
    <Paper elevation={1} className={classes.paper}>
      {edit ? (
        <UserTable users={users} />
      ) : (
        <List className={clsx(classes.root, className)}>
          {usersToShow.map((user, index) => (
            <>
              <ListItem className={classes.item} disableGutters key={user.id}>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                >
                  <Grid container className={classes.container}>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Account: {user.email}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheader" color="inherit">
                        Registered: {new Date(user.createdAt).toDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </Button>
              </ListItem>
              {index !== usersToShow.length - 1 && (
                <Divider className={classes.divider} />
              )}
            </>
          ))}
        </List>
      )}
    </Paper>
  );
};

UsersList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
};

export default UsersList;
