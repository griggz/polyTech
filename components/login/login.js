import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid"
import theme from '../prebuilt/ui/MaterialTheme'

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

export default function Login(props) {
  const classes = useStyles()
  return (
    <form noValidate autoComplete="off" onSubmit={props.handleLogin}>
      <Grid container className={classes.root} spacing={2}>
        {props.messages ?
          <Grid item xs={12}>
            {props.messages}
          </Grid>
          : ''
        }
        <Grid item xs={12}>
          <TextField
            id="email"
            required
            label="Email"
            value={props.login.email}
            onChange={props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            required
            label="Password"
            type="password"
            value={props.login.password}
            onChange={props.handleChange}
            autoComplete="current-password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} className={classes.loginButton}>
          <Button
            type='submit'
            disabled={props.login.email && props.login.password && !props.processing ? false : true}
            variant="contained"
            className={classes.button}
            fullWidth
          >
            {props.processing ? 'Processing...' : 'Login'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}