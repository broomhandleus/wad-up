import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "16px"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  login: {
    margin: theme.spacing(2, 0, 2),
    minHeight: "48px"
  },
  signup: {
    margin: theme.spacing(0, 0, 2),
    minHeight: "48px"
  },
  background: {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
}));

export default function Home() {
  const classes = useStyles();
  const history = useHistory();

  const onLoginClicked = () => {
    history.push("/Login");
  }

  const onSignUpClicked = () => {
    history.push("/Signup");
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={8}>
          <Typography component="h1" variant="h5">
            Welcome to Wadup!
          </Typography>
          <Typography component="h1" variant="subtitle1">
            The easy way to find out what's up in your area.
          </Typography>
          <Typography component="h1" variant="subtitle1">
            -- Need some fun icon and background pattern here --
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={onLoginClicked}
            className={classes.login}
            >
            Log In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSignUpClicked}
            className={classes.signup}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
