import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Tooltip,
  Stepper,
  Step,
  StepLabel
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { HelpOutline } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';


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
  },
  emailRow: {
    display: "flex",
    alignItems: "center",
  },
  emailBox: {
    flexGrow: 9
  },
  helpIcon: {
    flexGrow: 1,
    paddingBottom: "16px"
  },
  stepper: {
    width: "95%",
    paddingBottom: "0px"
  }
}));

// Should there be a maximum length on username/password?
const validationSchema = yup.object({
  username: yup
    .string()
    .ensure()
    .required("Username is required")
    .matches(/(^[a-zA-Z0-9]+$)/, 'Username may only contain letters and numbers'),
  password: yup
    .string()
    .ensure()
    .required("Password is required")
    .min(8, "Password must be at least 8 Characters")
    .matches(/(^[a-zA-Z0-9!?;:@#$&()\\-`.+,/"]*$)/, 'Password may only contain letters, numbers, and special characters: !?;:@#$&()-`.+,'),
  passwordAgain: yup
    .string()
    .ensure()
    .required("Please confirm your passord")
    .oneOf([yup.ref('password'), null], "Password do not match"),
  email: yup
    .string()
    .ensure()
    .email("Enter a valid email address")
    .required("Email is required")
});

export default function SignUp() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordAgain: '',
      email: ''
    },
    validationSchema: validationSchema,
    // TODO: in the end will need to save a cookie or something for browser to remember the user
    onSubmit: values => {
      console.log("In formik submit");
      console.log(values);
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps: string[] = ["Basic info", "User type", "Payment info (Event Host only)"];

  // TODO: would like to implement a stepper component at the top
  // TODO: Need multiple components with transitions through the stepper
  // TODO: or just conditionally show what i need with transitions in the middle
  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={8}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
              <TextField
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.email && formik.errors.username ? formik.errors.username : "Enter a username"}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password ? formik.errors.password : "Enter a password"}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                value={formik.values.passwordAgain}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                helperText={formik.touched.passwordAgain && formik.errors.passwordAgain ? formik.errors.passwordAgain : "Re-enter password"}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="passwordAgain"
                label="Confirm Password"
                name="passwordAgain"
                type="password"
              />
              <div className={classes.emailRow}>
                <TextField
                  className={classes.emailBox}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email ? formik.errors.email : "Enter an email address"}
                  variant="outlined"
                  margin="normal"
                  required
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  autoComplete="email"
                />
                <Tooltip
                  className={classes.helpIcon}
                  title={
                    <React.Fragment>
                      <Typography>This email is only for weekly event updates. We promise not to spam you!</Typography>
                    </React.Fragment>
                  }
                  arrow
                  disableFocusListener
                  disableTouchListener
                >
                  <HelpOutline/>
                </Tooltip>
              </div>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
                type="submit"
                disabled={!(formik.dirty && formik.isValid)}
              >
                Next
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
    </div>
  );
}