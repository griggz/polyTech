import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as d3 from "d3";
// My Components;
import DashboardInline from "./DashboardInline";
import Numeral from "numeral";
import Container from "../../prebuilt/Container";
import Footer from "../ui/Footer";
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
    sourceData: [],
    stateCode: null,
    allianceMember: null,
    stateMetrics: [],
    hfcMetrics: [],
    staff: null,
  });

  const [doneLoading, setDoneLoading] = useState(false);

  // Loads data specific to the mode
  const loadData = async () => {
    const { lineDataRaw, radarDataRaw } = await axios
      .get(`/api/data-platform/fake_data`)
      .then((r) => r.data);
    // Structure LineViz
    const { lineData } = await prepLineVizData(lineDataRaw);
    // Structure PolarViz
    const { radarData } = await prepRadarVizData(radarDataRaw);
    // // prepping table data => the data that is displayed
    // const HfcTableData = await prepTabsleData(scenarioData)

    // // STATE DATA
    // const stateCall = await axios.get(`/api/hfc/metrics/${stateName}`, {
    //   headers: {
    //     'Authorization': `Bearer ${window.localStorage.getItem('accessToken').replace(/['"]+/g, '')}`
    //   }
    // }).then(r => r.data)
    // const stateData = stateCall.state_metrics
    // // prepping metrics => the data that is displayed
    // const stateTableData = await prepStateMetrics(stateData)

    // // USCA & US DATA
    // const nationalEndpoints = ['us_climate_alliance', 'united_states']
    // const nationalMetrics = []
    // nationalEndpoints.map(async endpoint => {
    //   const natlData = await axios.get(`/api/hfc/measurements/${endpoint}`, {
    //     headers: {
    //       'Authorization': `Bearer ${window.localStorage.getItem('accessToken').replace(/['"]+/g, '')}`
    //     }
    //   }).then(r => r.data)
    //   const filter = filterData(natlData.hfc_metrics, 'category', 'annual_total', 'equals')
    //   filter.map(d => nationalMetrics.push(d))
    // })
    // update state
    setState({
      ...state,
      // hfcMetrics: HfcTableData,
      // toggleStateName: { value: stateName, name: UpperFirstLetter(stateName) },
      // sourceData: sourceData,
      lineVizData: lineData,
      radarVizData: radarData,
      // mixBarData: stateTableData,
      // qState: scenarioCall.state,
      // stateCode: scenarioCall.state_code,
      // stateMember: scenarioCall.state_member,
      // allianceMember: scenarioCall.us_climate_alliance,
      // staff: scenarioCall.staff,
      // nationalData: nationalMetrics,
      // stateMetrics: stateTableData
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
        bau: +d3.sum(v, (d) => d.bau).toFixed(2),
        rmp: +d3.sum(v, (d) => d.rmp).toFixed(2),
        kigali: +d3.sum(v, (d) => d.kigali).toFixed(2),
        snap: +d3.sum(v, (d) => d.snap).toFixed(2),
        slcp: +d3.sum(v, (d) => d.slcp).toFixed(2),
        rmp_snap: +d3.sum(v, (d) => d.rmp_snap).toFixed(2),
        snap_kigali: +d3.sum(v, (d) => d.snap_kigali).toFixed(2),
        rmp_snap_slcp: +d3.sum(v, (d) => d.rmp_snap_slcp).toFixed(2),
        rmp_snap_slcp_kigali: +d3
          .sum(v, (d) => d.rmp_snap_slcp_kigali)
          .toFixed(2),
      }))
      .entries(data);
    return dataRollup;
  };

  const ungroup = (data) => {
    const arr = [];
    data.forEach(function (keys) {
      arr.push({
        year: keys.key,
        bau: keys.value.bau,
        rmp: keys.value.rmp,
        snap: keys.value.snap,
        slcp: keys.value.slcp,
        kigali: keys.value.kigali,
        rmp_snap: keys.value.rmp_snap,
        snap_kigali: keys.value.snap_kigali,
        rmp_snap_slcp: keys.value.rmp_snap_slcp,
        rmp_snap_slcp_kigali: keys.value.rmp_snap_slcp_kigali,
      });
    });
    return arr;
  };

  // Prepare HFC Metrics Data for display
  const prepTableData = (data) => {
    // shape Data => creates web formatted fields as well as actual fields
    const dataPrep = data.map((d) => shapeHfcData(d));
    // sort data
    dataPrep.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    );
    dataPrep.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));

    return dataPrep;
  };

  // Prepare State data for display
  const prepStateMetrics = (data) => {
    const dataPrep = data.map((d) => shapeStateData(d));
    // sort data
    dataPrep.sort((a, b) => (a.year < b.year ? 1 : b.year < a.year ? -1 : 0));

    return dataPrep;
  };

  // Type conversion
  const shapeHfcData = (d) => {
    return {
      state: d.state_name,
      category: d.category,
      end_use: d.end_use,
      year: d.year,
      slug: d.slug,
      bau: +d.bau,
      rmp: +d.rmp,
      kigali: +d.kigali,
      snap: +d.snap,
      slcp: +d.slcp,
      rmp_snap: +d.rmp_snap,
      snap_kigali: +d.snap_kigali,
      rmp_snap_slcp: +d.rmp_snap_slcp,
      rmp_snap_slcp_kigali: +d.rmp_snap_slcp_kigali,
      bau_web: +d.bau.toFixed(2),
      rmp_web: +d.rmp.toFixed(2),
      kigali_web: +d.kigali.toFixed(2),
      snap_web: +d.snap.toFixed(2),
      slcp_web: +d.slcp.toFixed(2),
      rmp_snap_web: +d.rmp_snap.toFixed(2),
      snap_kigali_web: +d.snap_kigali.toFixed(2),
      rmp_snap_slcp_web: +d.rmp_snap_slcp.toFixed(2),
      rmp_snap_slcp_kigali_web: +d.rmp_snap_slcp_kigali.toFixed(2),
      id: d.id,
      modified_date: d.modified_date,
    };
  };

  // Type conversion
  const shapeStateData = (d) => {
    return {
      // web formatted columns
      state_population_web: Numeral(d.state_population).format("0,0"),
      population_growth_rate_web: Numeral(d.population_growth_rate).format(
        "0,0.000"
      ),
      household_growth_rate_web: Numeral(d.household_growth_rate).format(
        "0,0.000"
      ),
      light_duty_vehicles_web: Numeral(d.light_duty_vehicles).format("0,0"),
      light_duty_vehicles_growth_rate_web: Numeral(
        d.light_duty_vehicles_growth_rate
      ).format("0,0.000"),
      heat_pump_growth_rate_web: Numeral(d.heat_pump_growth_rate).format(
        "0,0.000"
      ),
      central_ac_growth_rate_web: Numeral(d.central_ac_growth_rate).format(
        "0,0.000"
      ),
      room_ac_growth_rate_web: Numeral(d.room_ac_growth_rate).format("0,0.000"),
      households_web: Numeral(d.households).format("0,0"),
      // standard columns
      year: d.year,
      state: d.state_name,
      state_population: +d.state_population,
      population_growth_rate: +d.population_growth_rate,
      households: +d.households,
      household_growth_rate: +d.household_growth_rate,
      household_heat_pumps: +d.household_heat_pumps,
      heat_pump_growth_rate: +d.heat_pump_growth_rate,
      household_central_ac: +d.household_central_ac,
      central_ac_growth_rate: +d.central_ac_growth_rate,
      household_room_ac: +d.household_room_ac,
      room_ac_growth_rate: +d.room_ac_growth_rate,
      light_duty_vehicles: +d.light_duty_vehicles,
      light_duty_vehicles_growth_rate: +d.light_duty_vehicles_growth_rate,
      slug: d.slug,
      id: d.id,
      modified_date: d.modified_date,
    };
  };

  // generic filtering function
  const filterData = (data, field, value, operator) => {
    if (operator === "equals") {
      return data.filter((d) => {
        return d[field] === value;
      });
    } else if (operator === "not") {
      return data.filter((d) => {
        return d[field] !== value;
      });
    }
  };

  useEffect(() => {
    async function load() {
      await loadData();
      setDoneLoading(true);
    }
    // Load
    load();
  }, []);

  // // Triggard by the view button, this enables you to edit data on the page
  const handleStateToggle = async (stateName) => {
    await setState({
      ...state,
      stateName: stateName.value,
      toggleStateName: stateName,
      lineVizData: [],
      polarVizData: [],
      mixBarData: [],
      data: [],
    });
    await loadData(stateName.value);
  };

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />{" "}
      </Container>
    );
  }

  return (
    <>
      <DashboardInline
        // Data
        data={state.sourceData}
        doneLoading={state.doneLoading}
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
        mixBarData={state.mixBarData}
      />{" "}
      <Footer />
    </>
  );
};

export default Dashboard;
