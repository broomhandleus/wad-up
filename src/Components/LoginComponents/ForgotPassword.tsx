import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Slide from '@material-ui/core/Slide';

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

const validationSchema = yup.object({
  email: yup
    .string()
    .ensure()
    .email("Enter a valid email address")
    .required("Email is required")
});

export default function ForgotPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [email] = useState("");
  const [sendDisabled, setSendDisabled] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: email
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("Submitting email for forgot password: ", values);
      history.push("/Login");
    },
  });

  const handleChange = () => {
    setSendDisabled(!(formik.dirty && formik.isValid));
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="sm">
        <Slide in direction="left" mountOnEnter unmountOnExit>
          <Paper className={classes.paper} elevation={8}>
            <Avatar className={classes.avatar}>
              <ContactSupportIcon fontSize="large"/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Typography component="h1" variant="subtitle1">
              Provide your email and we will send you a recovery link!
            </Typography>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit} onChange={handleChange}>
              <TextField
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email ? formik.errors.email : "Enter an email address"}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={sendDisabled}
              >
                Send email
              </Button>
            </form>
          </Paper>
        </Slide>
      </Container>
    </div>
  );
}