import React from 'react';
import './App.css';
import 'fontsource-roboto';
import Main from './Components/Main';
import Home from './Components/Home';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'

function App() {
  const theme = createMuiTheme({
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
      <Home/>
    </ThemeProvider>
  );
}

export default App;
