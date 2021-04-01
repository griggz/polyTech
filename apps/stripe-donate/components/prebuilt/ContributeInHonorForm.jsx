import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import translate from "../i18n/translate";

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: "#fff",
  },
}));

const ContributeInHonorForm = (props) => {
  const { handlehonoree, cart } = props;
  const classes = useStyles();

  const inHonorLabel = (
    <Typography variant="body2" component="body2">
      {translate("in_honor")}
    </Typography>
  );

  const inMemoryLabel = (
    <Typography variant="body2" component="body2">
      {translate("in_memory")}
    </Typography>
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <RadioGroup
            row
            aria-label="honoree"
            name="honoree"
            value={cart.honoreeType}
            onChange={(e) => handlehonoree({ radio: e.target.value })}
            required
          >
            <FormControlLabel
              value="in_honor"
              control={<Radio color="primary" />}
              label={inHonorLabel}
              labelPlacement="start"
            />
            <FormControlLabel
              value="in_memory"
              control={<Radio color="primary" />}
              label={inMemoryLabel}
              labelPlacement="start"
            />
          </RadioGroup>
        </Grid>
        {cart.honoreeType && (
          <Grid item xs={6} sm={3}>
            <TextField
              InputProps={{
                className: classes.input,
              }}
              value={cart.honoreeFirstName || ""}
              name="firstName"
              label={translate("first_name")}
              type="text"
              size="small"
              onChange={(e) => handlehonoree({ firstName: e.target.value })}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
        )}
        {cart.honoreeType && (
          <Grid item xs={6} sm={3}>
            <TextField
              InputProps={{
                className: classes.input,
              }}
              value={cart.honoreeLastName || ""}
              name="lastName"
              label={translate("last_name")}
              type="text"
              size="small"
              onChange={(e) => handlehonoree({ lastName: e.target.value })}
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ContributeInHonorForm;
