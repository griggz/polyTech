import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import translate from "../i18n/translate";

const ConfirmationForm = (props) => {
  const [confirmCheck, setConfirmCheck] = useState(false);

  const handleConfirmCheck = (event) => {
    setConfirmCheck(event.target.checked);
  };

  const Url = (
    <a href="https://avecanalytics.io/non-profit-policy/">{translate("url")}</a>
  );

  const policyStatement = (
    <Typography variant="body2">
      {translate("certify", { path: Url })}
    </Typography>
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={confirmCheck}
                onChange={handleConfirmCheck}
                required
              />
            }
            label={policyStatement}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ConfirmationForm;
