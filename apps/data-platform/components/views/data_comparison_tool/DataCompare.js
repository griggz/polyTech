// React
import React, { useState, useEffect } from "react";
// JS Libraries
import * as d3 from "d3";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
// My Componants
import DataCompareInline from "./DataCompareInline.js";
import { FilterData, UpperFirstLetter } from "../../prebuilt/Helper";
import Container from "../../prebuilt/Container";
import States from "../../prebuilt/States";

const CompareTool = () => {
  const [toggleStates, setToggleStates] = useState();
  const [metric, setMetric] = useState("measurementA");
  const [year, setYear] = useState("2020");
  const [doneLoading, setDoneLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [sourceData, setSourceData] = useState();
  const [lineViz, setLineViz] = useState();
  const [tableSettings, setTableSettings] = useState({
    compareData: [],
    compareCount: 1,
    tableDoneLoading: false,
  });

  const modStates = async (value) => {
    setReloading(true);
    const statesSelected = value.map((d) => {
      return d.value;
    });
    const filterState = await FilterData(
      sourceData,
      "state",
      statesSelected,
      "equals"
    );
    const viz = [];
    const table = [];
    await statesSelected.forEach(async (s) => {
      const { lineData, tableData } = await prepLineVizData(
        filterState,
        s,
        metric
      );
      viz.push(lineData[0]);
      tableData.map((t) => table.push(t));
    });
    // Update State
    setToggleStates(value);
    setTableSettings({
      ...tableSettings,
      compareData: table,
    });
    setLineViz({
      ...lineViz,
      lineVizData: viz,
    });
  };

  // Toggle the state data
  const handleStateChange = async (value) => {
    setReloading(true);
    await modStates(value);
    setReloading(false);
  };

  // Grabs credentials with home State details
  useEffect(() => {
    async function load() {
      await loadData("virginia");
      setDoneLoading(true);
    }
    // Load
    load();
  }, []);

  // Loads data
  const loadData = async (stateName) => {
    const { lineDataRaw } = await axios
      .get(`/api/data-platform/fake_data`)
      .then((r) => r.data);
    // Structure LineData
    const { lineData, tableData } = await prepLineVizData(
      lineDataRaw,
      stateName,
      "measurementA"
    );
    // update state
    setSourceData(lineDataRaw);
    setToggleStates([{ value: stateName, name: UpperFirstLetter(stateName) }]);
    setTableSettings({
      ...tableSettings,
      compareData: tableData,
    });
    setLineViz({
      ...lineViz,
      lineVizData: lineData,
    });
    setDoneLoading(true);
  };

  // Data Prep
  const prepLineVizData = async (data, stateName, metric) => {
    const filter = await FilterData(data, "state", stateName, "equals");
    const Alpha = [];
    const Beta = [];
    const Charlie = [];
    const Delta = [];

    const switch_ = {
      measurementA: Alpha,
      measurementB: Beta,
      measurementC: Charlie,
      measurementD: Delta,
    };

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
          id: States.find((s) => {
            return s.value === stateName;
          }).name,
          data: switch_[metric],
        },
      ];
      return {
        lineData: vizData,
        tableData: filter,
      };
    }
  };

  // // Toggles the year of the data
  const handleScenarioChange = async (event) => {
    setReloading(true);
    setMetric(event.target.value);
    // get states
    const statesSelected = toggleStates.map((d) => {
      return d.value;
    });
    // Condense Data to selected states
    const filterState = await FilterData(
      sourceData,
      "state",
      statesSelected,
      "equals"
    );
    // Create new dataset
    const viz = [];
    await statesSelected.forEach(async (s) => {
      const { lineData } = await prepLineVizData(
        filterState,
        s,
        event.target.value
      );
      viz.push(lineData[0]);
    });

    setLineViz({
      ...lineViz,
      lineVizData: viz,
    });
    setReloading(false);
  };

  if (!doneLoading) {
    return (
      <Container>
        <CircularProgress color="secondary" size="2.5rem" thickness={2} />
      </Container>
    );
  }

  return (
    <>
      <DataCompareInline
        lineVizData={lineViz.lineVizData}
        year={year}
        states={lineViz.vizStates}
        vizKeys={lineViz.vizKeys}
        toggleStates={toggleStates}
        tableData={tableSettings.compareData}
        metric={metric}
        compareCount={tableSettings.compareCount}
        handleStateChange={handleStateChange}
        handleScenarioChange={handleScenarioChange}
        sourceData={sourceData}
        doneLoading={doneLoading}
        reloading={reloading}
      />
    </>
  );
};

export default CompareTool;
