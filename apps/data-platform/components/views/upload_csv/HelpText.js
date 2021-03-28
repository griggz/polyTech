import React from "react";
import { Typography } from "@material-ui/core";
import theme from "../ui/MaterialTheme";
import { makeStyles } from "@material-ui/core/styles";
import Categories from "../../prebuilt/Category";
import EndUse from "../../prebuilt/EndUse";
import csvDownload from "json-to-csv-export";
// import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  bullets: {
    paddingLeft: theme.spacing(3),
  },
}));

const HelpText = () => {
  const classes = useStyles();
  const endUseOptions = EndUse.map((option) => ({ end_use: option.value }));
  const categoryOptions = Categories.map((option) => ({
    category: option.value,
  }));
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Guidance:
      </Typography>
      <Typography variant="body1" gutterBottom>
        This tool should only be used if you have more than a few records you
        would like to update or add at once.
      </Typography>
      <Typography variant="body1" gutterBottom>
        All .csv files must contain all required fields when uploading. If
        fields are missing, or content differs from what the database can
        accept, you will not be able to upload data. When in doubt, please use
        the sample .csv files below.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Data Requirements:
      </Typography>
      <Typography variant="h6" gutterBottom>
        When structuring your .csv files, please consider the following
        requirements:
        <Typography variant="body1" className={classes.bullets}></Typography>
        <Typography variant="body1" className={classes.bullets}></Typography>
        <Typography variant="body1" className={classes.bullets}>
          1. You cannot upload data for a State you are not assigned to in the
          system.
        </Typography>
        <Typography variant="body1" className={classes.bullets}>
          2. All column headers must be exact matches. If you are unsure what to
          use as a column header, please review the sample data sets below.
        </Typography>
      </Typography>
      <Typography variant="h6" color="secondary" gutterBottom>
        Note: Once a new file is added, all data will become available at the
        bottom of the page. Data can then be edited and corrected prior to
        upload.
      </Typography>
    </>
  );
};

export default HelpText;
