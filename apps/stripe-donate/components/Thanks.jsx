import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import MaterialButton from '../components/prebuilt/MaterialButton'

const ThankYou = (props) => {
  // state
  const [check, setCheck] = useState(false);

  const handleCheck = (event) => {
    setCheck(event.target.checked);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" component="h5">
          Thank you!
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="h4" component="h4">
          Communication Information
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="p" component="p">
          I would like to receive emails from:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <FormControlLabel
          control={<Checkbox checked={check} onChange={handleCheck} />}
          label="Avec Analytics"
        />
      </Grid>
    </Grid>
  );
};

export default ThankYou;
