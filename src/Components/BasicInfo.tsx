import React from 'react';
import {
  TextField,
  Typography,
  Tooltip,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { HelpOutline } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  stepperButtons: {
    margin: theme.spacing(3, 0, 2),
    width: '45%'
  },
  buttonRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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

interface props {
  children: React.ReactNode,
  setNext: Function,
  setBasicInfo: Function,
  handleNext: Function
}

export default function BasicInfo(props: props) {
  const classes = useStyles();
  const setNext = props.setNext;
  const setBasicInfo = props.setBasicInfo;
  const handleNext = props.handleNext;
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
      setBasicInfo(values);
      handleNext();
    },
  });

  const handleChange = () => {
    setNext(!(formik.dirty && formik.isValid));
  }

  return (
    <div>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit} onChange={handleChange}>
        <TextField
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username ? formik.errors.username : "Enter a username"}
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
        {props.children}
      </form>
    </div>
  );
}