import React, {useState} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default function CheckBox(props) {
  const [checked, setChecked] = useState(true);
  const {text} = props;

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name='checkBox'
            color="primary"
          />
        }
        label={text}
      />
  );
}