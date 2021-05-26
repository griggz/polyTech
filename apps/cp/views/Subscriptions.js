import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../components/prebuilt/theme";
import axios from "axios";
import Container from "../../../components/prebuilt/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CheckCircle } from "@styled-icons/boxicons-regular/CheckCircle";
import SubsList from "../components/SubsList";

import KPIChart from "../components/KpiChart";

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(4),
  },
  chart: {
    display: "grid",
  },
}));

const SubscriptionsView = ({ subs }) => {
  const classes = useStyles();
  const [doneLoading, setDoneLoading] = useState();
  const [card, setCard] = useState();

  const cleanSubs = (s) => {
    let createdAtDate = new Date(s.createdAt);

    return {
      id: s.id,
      createdAt: createdAtDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      email: s.email,
      userId: s.userId,
      active: s.active,
    };
  };

  const loadData = async () => {
    let subsData;

    if (!subs) {
      const { subs } = await axios.get(`/api/leads`).then((r) => r.data);
      subsData = subs;
    } else {
      subsData = subs;
    }
    const shapeSubs = subsData
      .map((s) => {
        return cleanSubs(s);
      })
      .sort((a, b) => a.id - b.id);
    setCard({
      title: "Subs",
      count: subsData.length,
      icon: <CheckCircle />,
      content: <SubsList subs={shapeSubs} edit={true} />,
    });
  };

  useEffect(() => {
    async function load() {
      await loadData();
      setDoneLoading(true);
    }
    // Load
    load();
  }, [subs]);

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />{" "}
      </Container>
    );
  }

  console.log("SUBS!");

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

export default SubscriptionsView;
