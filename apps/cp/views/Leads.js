import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../components/prebuilt/theme";
import axios from "axios";
import Container from "../../../components/prebuilt/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LightningBolt } from "@styled-icons/heroicons-outline/LightningBolt";
import LeadsList from "../components/LeadsList";

import KPIChart from "../components/KpiChart";

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(4),
  },
  chart: {
    display: "grid",
  },
}));

const LeadsView = ({ leads }) => {
  const classes = useStyles();
  const [doneLoading, setDoneLoading] = useState();
  const [card, setCard] = useState();

  const cleanLeads = (l) => {
    let createdAtDate = new Date(l.createdAt);

    return {
      id: l.id,
      createdAt: createdAtDate.toLocaleString("en-us", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      solutions: l.solutionType.map((v) => {
        return v.solution;
      }),
      email: l.email,
      userId: l.userId,
      firstName: l.firstName,
      lastName: l.lastName,
      industry: l.industry,
      jobTitle: l.jobTitle,
      leadSource: l.leadSource,
      orgSize: l.orgSize,
      organization: l.organization,
      webSite: l.webSite,
      workPhone: l.workPhone,
      content: l.content,
    };
  };

  const loadData = async () => {
    let leadsData = null;
    if (!leads) {
      const { leads } = await axios.get(`/api/leads`).then((r) => r.data);
      leadsData = leads;
    } else {
      leadsData = leads;
    }
    const shapeLeads = leadsData
      .map((l) => {
        return cleanLeads(l);
      })
      .sort((a, b) => a.id - b.id);
    setCard({
      title: "Leads",
      count: leadsData.length,
      icon: <LightningBolt />,
      content: <LeadsList leads={shapeLeads} edit={true} />,
    });
  };

  useEffect(() => {
    async function load() {
      await loadData();
      setDoneLoading(true);
    }
    // Load
    load();
  }, [leads]);

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

export default LeadsView;
