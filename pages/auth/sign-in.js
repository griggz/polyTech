import SignInForm from '../../components/SignIn'
import { providers, signIn } from 'next-auth/client'
import Button from '../../components/prebuilt/Button';
import {Github} from '@styled-icons/evaicons-solid/Github';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../components/prebuilt/theme'


const useStyles = makeStyles(() => ({
  icon: {
    height: 55,
    color: theme.palette.common.white,
    marginRight: 20
  },
  button: {
    color: theme.palette.common.white
  }
}));


export default function SignIn({providers}) {
  const classes = useStyles()
  return (
    <SignInForm>
      <>
        {Object.values(providers).map(provider => (
          <div key={provider.name}>
            <Button
              onClick={() => signIn(provider.id)}
              color="primary"
              className={classes.button}
              variant="contained"
              size="large"
              >
                <Github className={classes.icon}/>
                Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </>
    </SignInForm>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}