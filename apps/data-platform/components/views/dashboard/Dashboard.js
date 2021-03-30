import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as d3 from "d3";
// My Components;
import DashboardInline from "./DashboardInline";
import Container from "../../prebuilt/Container";
import States from "../../prebuilt/States";

// Auth
import { useSession } from "next-auth/client";

const Dashboard = (props) => {
  const [session, loading] = useSession();
  const [state, setState] = useState({
    stateMember: null,
    polarVizData: null,
    mixBarData: null,
    stateName: "virginia",
    year: 2020,
    stateCode: null,
    allianceMember: null,
    staff: null,
  });

  const [doneLoading, setDoneLoading] = useState(false);
  const [reloading, setReloading] = useState(false);

  // Loads data specific to the mode
  const loadData = async (stateName) => {
    const { lineDataRaw, radarDataRaw } = await axios
      .get(`/api/data-platform/fake_data`)
      .then((r) => r.data);
    // Structure LineData
    const { lineData } = await prepLineVizData(lineDataRaw);
    // Structure RadarData
    const { radarData } = await prepRadarVizData(radarDataRaw);
    // Structure BumpData
    const { barData } = await prepBarVizData(lineDataRaw);

    // update state
    setState({
      ...state,
      stateName: stateName,
      toggleStateName: {
        value: stateName,
        name: States.find((s) => {
          return s.value === stateName;
        }).name,
      },
      lineVizData: lineData,
      radarVizData: radarData,
      barVizData: barData,
      tableData: radarDataRaw,
    });
  };

  // Data Prep
  const prepLineVizData = async (data) => {
    const filter = await filterData(data, "state", state.stateName, "equals");
    const Alpha = [];
    const Beta = [];
    const Charlie = [];
    const Delta = [];

    if (filter) {
      filter.map((d) => {
        {
          Alpha.push({
            x: d.year.toString(),
            y: d.measurementA,
          });
          Beta.push({
            x: d.year.toString(),
            y: d.measurementB,
          });
          Charlie.push({
            x: d.year.toString(),
            y: d.measurementC,
          });
          Delta.push({
            x: d.year.toString(),
            y: d.measurementD,
          });
        }
      });
      const vizData = [
        {
          id: "MeasurementA",
          color: "hsl(337, 70%, 50%)",
          data: Alpha,
        },
        {
          id: "MeasurementB",
          color: "hsl(215, 70%, 50%)",
          data: Beta,
        },
        {
          id: "MeasurementC",
          color: "hsl(231, 70%, 50%)",
          data: Charlie,
        },
        {
          id: "MeasurementD",
          color: "hsl(70, 70%, 50%)",
          data: Delta,
        },
      ];
      return {
        lineData: vizData,
      };
    }
  };

  const prepRadarVizData = async (data) => {
    const filterState = await filterData(
      data,
      "state",
      state.stateName,
      "equals"
    );
    const filterYear = await filterData(
      filterState,
      "year",
      state.year,
      "equals"
    );
    const clean = filterYear.map((d) => cleanRadarData(d));
    return {
      radarData: clean,
    };
  };

  const prepBarVizData = async (data) => {
    const data_ = { data: [], keys: null };
    const colors = [
      [
        "hsl(176, 70%, 50%)",
        "hsl(319, 70%, 50%)",
        "hsl(88, 70%, 50%)",
        "hsl(88, 70%, 50%)",
      ],
      [
        "hsl(73, 70%, 50%)",
        "hsl(321, 70%, 50%)",
        "hsl(252, 70%, 50%)",
        "hsl(100, 70%, 50%)",
      ],
      [
        "hsl(73, 70%, 50%)",
        "hsl(321, 70%, 50%)",
        "hsl(252, 70%, 50%)",
        "hsl(100, 70%, 50%)",
      ],

      [
        "hsl(214, 70%, 50%)",
        "hsl(354, 70%, 50%)",
        "hsl(269, 70%, 50%)",
        "hsl(147, 70%, 50%)",
      ],

      [
        "hsl(93, 70%, 50%)",
        "hsl(134, 70%, 50%)",
        "hsl(89, 70%, 50%)",
        "hsl(189, 70%, 50%)",
      ],
    ];
    const startWith = ["virginia", "alabama", "michigan", "vermont", "florida"];
    const filterState = await filterData(data, "state", startWith, "equals");
    const group = groupBy(filterState, "state");
    const clean = ungroup(group);
    data_.keys = [
      "measurementA",
      "measurementB",
      "measurementC",
      "measurementD",
    ];
    startWith.map((d) => {
      clean.map((s) => {
        if (s.state === d) {
          data_.data.push({
            state: s.state,
            measurementA: s.measurementA,
            measurementAColor: colors[startWith.indexOf(d)][0],
            measurementB: s.measurementB,
            measurementBColor: colors[startWith.indexOf(d)][1],
            measurementC: s.measurementC,
            measurementCColor: colors[startWith.indexOf(d)][2],
            measurementD: s.measurementD,
            measurementDColor: colors[startWith.indexOf(d)][3],
          });
        }
      });
    });
    return {
      barData: data_,
    };
  };

  const cleanRadarData = (d) => {
    return {
      category: d.category,
      measurementA: d.measurementA,
      measurementB: d.measurementB,
      measurementC: d.measurementC,
      measurementD: d.measurementD,
    };
  };

  // group data with single key
  const groupBy = (data, key) => {
    const dataRollup = d3
      .nest()
      .key((d) => d[key])
      .rollup((v) => ({
        measurementA: +d3.sum(v, (d) => d.measurementA).toFixed(0),
        measurementB: +d3.sum(v, (d) => d.measurementB).toFixed(0),
        measurementC: +d3.sum(v, (d) => d.measurementC).toFixed(0),
        measurementD: +d3.sum(v, (d) => d.measurementD).toFixed(0),
      }))
      .entries(data);
    return dataRollup;
  };

  const ungroup = (data) => {
    const arr = [];
    data.forEach(function (keys) {
      arr.push({
        state: keys.key,
        measurementA: keys.value.measurementA,
        measurementB: keys.value.measurementB,
        measurementC: keys.value.measurementC,
        measurementD: keys.value.measurementD,
      });
    });
    return arr;
  };

  // // Prepare HFC Metrics Data for display
  // const prepTableData = (data) => {
  //   // shape Data => creates web formatted fields as well as actual fields
  //   const dataPrep = data.map((d) => shapeHfcData(d));
  //   // sort data
  //   dataPrep.sort((a, b) =>
  //     a.category > b.category ? 1 : b.category > a.category ? -1 : 0
  //   );
  //   dataPrep.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));

  //   return dataPrep;
  // };

  // // Prepare State data for display
  // const prepStateMetrics = (data) => {
  //   const dataPrep = data.map((d) => shapeStateData(d));
  //   // sort data
  //   dataPrep.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));

  //   return dataPrep;
  // };

  // generic filtering function
  const filterData = (data, field, value, operator) => {
    if (Array.isArray(value)) {
      if (operator === "equals") {
        return data.filter((d) => {
          return value.includes(d[field]);
        });
      } else if (operator === "not") {
        return data.filter((d) => {
          return !value.includes(d[field]);
        });
      }
    } else {
      if (operator === "equals") {
        return data.filter((d) => {
          return d[field] === value;
        });
      } else if (operator === "not") {
        return data.filter((d) => {
          return d[field] !== value;
        });
      }
    }
  };

  useEffect(() => {
    async function load() {
      await loadData("virginia");
      setDoneLoading(true);
    }
    // Load
    load();
  }, []);

  // // Triggard by the view button, this enables you to edit data on the page
  const handleStateToggle = async (stateName) => {
    setReloading(true);
    setDoneLoading(false);
    await loadData(stateName.value);
    setReloading(false);
    setDoneLoading(true);
  };

  if (!doneLoading && !reloading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />{" "}
      </Container>
    );
  }

  return (
    <DashboardInline
      // Data
      data={state.sourceData}
      doneLoading={doneLoading}
      reloading={reloading}
      // State
      stateName={state.stateName}
      toggleStateName={state.toggleStateName}
      stateCode={state.stateCode}
      allianceMember={state.allianceMember}
      // Functions
      handleStateToggle={handleStateToggle}
      // Viz
      lineVizData={state.lineVizData}
      radarVizData={state.radarVizData}
      barVizData={state.barVizData}
      // Table
      tableData={state.tableData}
    />
  );
};

export default Dashboard;
