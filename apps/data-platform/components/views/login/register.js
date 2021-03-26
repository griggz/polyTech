import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid"
import theme from '../hfc/ui/MaterialTheme'
import StateOptions from '../../components/hfc/prebuilt/StateOptions'
const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(2),
},
  loginButton: {
    paddingTop: theme.spacing(2),
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.accent.dark,
    "&:hover": {
      backgroundColor: theme.palette.accent.light
    }
  }
}));


export default function Register(props) {
  const classes = useStyles()

  return (
    <form noValidate autoComplete="off" onSubmit={props.handleRegistration}>
      <Grid container className={classes.root} spacing={2}>
      {props.messages ?
        <Grid item xs={12}>
          {props.messages}
        </Grid>
        : ''
        }
        <Grid item xs={12} md={6} >
          <TextField
            id="firstName"
            required
            label="First Name"
            value={props.register.firstName}
            onChange={props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="lastName"
            required
            label="Last Name"
            value={props.register.lastName}
            onChange={props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <TextField
          id="email"
          required
          label="Email"
          value={props.register.email}
          onChange={props.handleChange}
          fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="email2"
            required
            label="Confirm Email"
            value={props.register.email2}
            onChange={props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="password"
            required
            type='password'
            label="Password"
            value={props.register.password}
            onChange={props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="password2"
            type='password'
            label="Confirm Password"
            value={props.register.password2}
            onChange={props.handleChange}
            autoComplete="current-password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <StateOptions
            handleChange={props.handleStateChange}
            toggleStateName={props.register.homeState}
            />
        </Grid>
        <Grid item xs={12} className={classes.loginButton}>
          <Button
            type='submit'
            disabled={props.register.email
              && props.register.email2
              && props.register.password
              && props.register.password2
              && props.register.homeState.value !== ''
              &&  !props.processing
              ? false : true}
            variant="contained"
            className={classes.button}
            fullWidth
            >
              {props.processing ? 'Processing...' : 'Sign Up'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}