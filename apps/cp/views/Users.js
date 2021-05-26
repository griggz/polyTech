import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../components/prebuilt/theme";
import axios from "axios";
import Container from "../../../components/prebuilt/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Pen } from "@styled-icons/boxicons-regular/Pen";
import { CheckCircle } from "@styled-icons/boxicons-regular/CheckCircle";
import { Users } from "@styled-icons/entypo/Users";
import { LightningBolt } from "@styled-icons/heroicons-outline/LightningBolt";
import LeadsList from "../components/LeadsList";
import SubsList from "../components/SubsList";
import PostsList from "../components/PostsList";
import UsersList from "../components/UsersList";

import LineChart from "../components/LineChart";
import KPIChart from "../components/KpiChart";
// import BarChart from "../components/BarChart.js";
// import DoughnutChart from "../components/DoughnutChart.js";

const groupByDate = (data) => {
  const result = data.reduce((r, { createdAt }) => {
    let dateObj = new Date(createdAt);
    let monthyear = dateObj.toLocaleString("en-us", {
      month: "long",
      year: "numeric",
    });
    if (!r[monthyear]) r[monthyear] = { monthyear, entries: 1 };
    else r[monthyear].entries++;
    return r;
  }, {});

  return result;
};

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(4),
  },
  chart: {
    display: "grid",
  },
}));

const UsersView = ({ accounts }) => {
  const classes = useStyles();
  const [doneLoading, setDoneLoading] = useState();
  const [card, setCard] = useState();

  const cleanAccounts = (a) => {
    let createdAtDate = new Date(a.createdAt);
    let emailVerifiedDate = new Date(a.emailVerified);
    let updatedAtDate = new Date(a.updatedAtDate);

    return {
      id: a.id,
      createdAt: createdAtDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      email: a.email,
      emailVerified: emailVerifiedDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      image: a.image,
      name: a.name,
      updatedAt: updatedAtDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      isAdmin: a.groups.map((d) => d.group === "admin").includes(true),
      accountProvider: a.account.length > 0 ? a.account[0].providerId : "email",
    };
  };

  const loadData = async () => {
    let accountsData;
    if (!accounts) {
      const accounts = await axios.get("/api/accounts").then((r) => r.data);
      accountsData = accounts;
    } else {
      accountsData = accounts;
    }
    const shapeAccounts = accountsData
      .map((a) => {
        return cleanAccounts(a);
      })
      .sort((a, b) => a.id - b.id);
    setCard({
      title: "Accounts",
      count: accountsData.length,
      icon: <Users />,
      content: <UsersList users={shapeAccounts} edit={true} />,
    });
  };

  useEffect(() => {
    async function load() {
      await loadData();
      setDoneLoading(true);
    }
    // Load
    load();
  }, [accounts]);

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />{" "}
      </Container>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <KPIChart {...card} />
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersView;
