import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      // light: 'rgba(39, 44, 52, 1)',
      main: "rgba(131, 188, 255, 1)",
      // dark: 'rgba(39, 44, 52, 1)',
      // contrastText: 'rgba(255, 255, 255, 1)'
    },
    secondary: {
      // light: 'rgba(58,134,255, 1)',
      main: "rgba(255, 127, 81, 1)",
      // dark: 'rgba(58,134,255, 1)',
      // contrastText: 'rgba(58,134,255, 1)'
    },
    info: {
      // light: 'rgba(58,134,255, 1)',
      main: "rgba(255, 253, 250, 1)",
      // dark: 'rgba(58,134,255, 1)',
      contrastText: "#ffff",
    },
    default: {
      // light: 'rgba(58,134,255, 1)',
      main: "rgba(92, 92, 92, 1)",
      // dark: 'rgba(58,134,255, 1)',
      // contrastText: 'rgba(58,134,255, 1)'
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      info: "rgba(1, 1, 1, 1)",
      default: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
  // typography: {
  //   fontFamily: [
  //     'Raleway',
  //     'Merriweather',
  //     'Cutive Mono',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'serif'
  //   ].join(',')
  // },
  // overrides: {
  //   MuiInputLabel: {
  //     root: {
  //       color: '#272c34',
  //       '&$focused': {
  //         color: '#3a86ff'
  //       }
  //     }
  //   }
  // }
});

export default theme;
