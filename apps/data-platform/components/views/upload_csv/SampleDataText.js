import React from "react";
import { Typography } from "@material-ui/core";

const SampleDataText = () => (
  <Typography variant="body1" gutterBottom>
    Before uploading your .csv file, please ensure your column headers are exact
    matches to the column headers in the appropriate sample file below. When in
    doubt, use the sample files below as a template for all bulk uploads.
  </Typography>
);

export default SampleDataText;
