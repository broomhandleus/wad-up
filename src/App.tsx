import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Main from './Components/Main';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'

function App() {
  const theme = createMuiTheme({
    overrides: {
      MuiStepIcon: {
       root: {
         '&$completed': {
           color: '#aa00ff',
         },
         '&$active': {
           color: '#aa00ff',
         },
       },
       active: {},
       completed: {},
      }
    },
    palette: {
      primary: {
        main: "#00e676"
      },
      secondary: {
        main: "#aa00ff"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Main/>
    </ThemeProvider>
  );
}

export default App;
