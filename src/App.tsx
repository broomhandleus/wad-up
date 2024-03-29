import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'
import './App.css';
import 'fontsource-roboto';
import Main from './Components/Main';
import Home from './Components/Home';
import Login from './Components/LoginComponents/Login';
import SignUp from './Components/SignUpComponents/SignUp';
import ForgotPassword from './Components/LoginComponents/ForgotPassword';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';

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
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/Main">
          <Main/>
        </Route>
        <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/Signup">
          <SignUp/>
        </Route>
        <Route path="/Forgot">
          <ForgotPassword/>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
