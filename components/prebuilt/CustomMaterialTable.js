import MaterialTable from "@material-table/core";
import React from "react";

export default function CustomMaterialTable(props) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <MaterialTable {...props} />;
    </>
  );
}
