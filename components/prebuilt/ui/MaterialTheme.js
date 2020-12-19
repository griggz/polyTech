import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette:
  {
    common:
    {
      black: '#000',
      white: '#ffffff'
    },
    background:
    {
      paper: '#fff',
      default: '#fafafa'
    },
    primary:
    {
      light: 'rgba(160, 166, 176, 1)',
      main: 'rgba(39, 44, 52, 1)',
      dark: 'rgba(19, 24, 31, 1)',
      contrastText: 'rgba(255, 255, 255, 1)'
    },
    secondary:
    {
      light: 'rgba(97,158,255, 1)',
      main: 'rgba(58,134,255, 1)',
      dark: 'rgba(38,122,255, 1)',
      contrastText: 'rgba(58,134,255, 1)'
    },
    accent:
    {
      light: 'rgba(117,213,171, 1)',
      main: 'rgba(87, 204, 153, 1)',
      dark: 'rgba(72,199,144, 1)',
      contrastText: 'rgba(58,134,255, 1)'
    },
    error:
    {
      light: '#feecec',
      main: '#f94144',
      dark: '#ae2d2f',
      contrastText: '#fff'
    },
    text:
    {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  typography: {
    fontFamily: [
      'Raleway',
      'Merriweather',
      'Cutive Mono',
      '"Helvetica Neue"',
      'Arial',
      'serif'
    ].join(',')
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: '#272c34',
        '&$focused': {
          color: '#3a86ff'
        }
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '1em'
      }
    }
  }
})

export default theme
