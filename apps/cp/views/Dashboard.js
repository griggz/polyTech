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

const Dashboard = ({ state, setState }) => {
  const classes = useStyles();
  const [doneLoading, setDoneLoading] = useState();
  const [cards, setCards] = useState();
  const [lineVizData, setLineVizData] = useState();

  const loadData = async () => {
    const { leads, subs } = await axios.get(`/api/leads`).then((r) => r.data);
    const posts = await axios.get("/api/posts").then((r) => r.data);
    const accounts = await axios.get("/api/accounts").then((r) => r.data);
    const lineDataLeads = await prepLineVizData({
      data: leads,
      dName: "Leads",
      color: "hsl(337, 70%, 50%)",
    }).then((r) => r.lineData);
    const lineDataSubs = await prepLineVizData({
      data: subs,
      dName: "Subs",
      color: "hsl(215, 70%, 50%)",
    }).then((r) => r.lineData);

    setState({
      ...state,
      leads: leads,
      subs: subs,
      posts: posts,
      accounts: accounts,
    });
    setLineVizData(lineDataLeads.concat(lineDataSubs));
    setCards([
      {
        title: "Leads",
        count: leads.length,
        icon: <LightningBolt />,
        content: <LeadsList leads={leads} />,
      },
      {
        title: "Subs",
        count: subs.length,
        icon: <CheckCircle />,
        content: <SubsList subs={subs} />,
      },
      {
        title: "Posts",
        count: posts.length,
        icon: <Pen />,
        content: <PostsList posts={posts} />,
      },
      {
        title: "Accounts",
        count: accounts.length,
        icon: <Users />,
        content: <UsersList users={accounts} />,
      },
    ]);
  };

  const prepLineVizData = async ({ data, dName, color }) => {
    const group = groupByDate(data);
    const lineData = [];

    Object.keys(group).map(function (key, index) {
      lineData.push({
        x: group[key].monthyear,
        y: group[key].entries,
      });
    });
    const vizData = [
      {
        id: dName,
        color: color,
        data: lineData,
      },
    ];
    return {
      lineData: vizData,
    };
  };

  useEffect(() => {
    async function load() {
      await loadData();
      setDoneLoading(true);
    }
    // Load
    load();
  }, []);

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
        <Grid item xs={12} className={classes.chart}>
          <LineChart lineData={lineVizData} title="Connections" />
        </Grid>
        {cards.map((item, index) => {
          return (
            <Grid key={item.title + index} item lg={3} xl={3} md={6} xs={12}>
              <KPIChart {...item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Dashboard;
