import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  sidebarSection: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  },
  topics: {
    padding: theme.spacing(3),
  },
  imageSrc: {
    // position: 'absolute',
    width: 90,
    height: 90
    // backgroundSize: 'cover',
    // backgroundPosition: 'center 40%',
  },
}));

export default function Topics () {
  const classes = useStyles();
  const topics = [
    {
      url:
        'https://images.unsplash.com/photo-1584291527908-033f4d6542c8?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=120&q=100',
      title: 'Web Development',
      link: 'web',
    },
    {
      url:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=120&q=100',
      title: 'Consulting',
      link: 'consulting',
    },
    {
      url:
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=120&q=100',
      title: 'Data Management',
      link: 'data',
    },
    {
      url:
        'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixid=MXwxOTA4MTR8MHwxfGFsbHx8fHx8fHx8&ixlib=rb-1.2.1?auto=format&fit=crop&w=120&q=100',
      title: 'Custom Integrations',
      link: 'integrations',
    }
  ];

  return (
    <Paper variant="outlined" square className={classes.topics}>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Other Topics
      </Typography>
      <Grid container direction="row" spacing={2} alignItems="center">
      {topics.map((topic, idx) => (
        <>
        <Grid item xs={4}>
          <div className={classes.imageSrc}
            style={{
              backgroundImage: `url(${topic.url})`,
            }} />
        </Grid>
        <Grid item xs={8}>
          <Link color='secondary' display="block" variant="body1" href={`/what-we-do/${topic.link}/`} key={idx}>
            {topic.title}
          </Link>
        </Grid>
        {topics.indexOf(topic) < topics.length - 1
          ? <Divider style={{width: '100%'}}/>
          : ''
        }
        </>
      ))}
      </Grid>
    </Paper>
  )
}