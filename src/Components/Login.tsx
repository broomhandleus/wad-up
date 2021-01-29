import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';

import { users } from '../mockData/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "16px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  // TODO: in the end will need to save a cookie or something for browser to remember the user
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Doing fake checking here, will be an API call later
    users.forEach((u) => {
      if (username === u.username && password === u.password) {
        history.push("/Main");
        // need to break? or will moving the page be enough to stop this process?
      }
    });
    setIncorrect(true);
  }

  let incorrectText;
  if (incorrect) {
    incorrectText = (
      <Typography component="h1" variant="subtitle1" color="error">
        Username or password incorrect. No, I won't tell you which one.
      </Typography>
    )
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="sm">
        <Slide in direction="left" mountOnEnter unmountOnExit>
          <Paper className={classes.paper} elevation={8}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            {incorrectText}
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <TextField
                value={username}
                onChange={(e) => { setUsername(e.target.value)}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
              <TextField
                value={password}
                onChange={(e) => { setPassword(e.target.value)}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox checked={remember}
                  color="secondary"
                  onChange={(e) => setRemember(!remember)}
                />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to="/Forgot" variant="body2" color="secondary">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/Signup" variant="body2" color="secondary">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Slide>
      </Container>
    </div>
  );
}