import React from "react";
import CustomMaterialTable from "../../prebuilt/CustomMaterialTable";
import csvDownload from "json-to-csv-export";
import { Typography } from "@material-ui/core";

export default function RegionalTable(props) {
  const columns = [
    { title: "Region", field: "region" },
    { title: "State", field: "state" },
    { title: "Year", field: "year" },
    { title: "MeasurementA", field: "measurementA" },
    { title: "MeasurementB", field: "measurementB" },
    { title: "MeasurementC", field: "measurementC" },
    { title: "MeasurementD", field: "measurementD" },
  ];

  const tableTitle = (
    <>
      <Typography variant="h5" color="primary">
        Region Data
      </Typography>
      <Typography variant="caption" color="primary">
        * This is a calculated table summing all annual totals by scenario and
        by region
      </Typography>
    </>
  );

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <CustomMaterialTable
        title={tableTitle}
        columns={columns}
        data={props.regionData ? props.regionData : props.data}
        options={{
          search: true,
          columnsButton: true,
          exportMenu: [
            {
              label: "Export CSV",
              exportFunc: (columns, data) => {
                csvDownload(data, "region_report.csv");
              },
            },
          ],
          pageSize: 50,
          pageSizeOptions: [50, 100, 150],
        }}
        style={{
          position: "relative",
          width: "100%",
        }}
      />
    </>
  );
}
