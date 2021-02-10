import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Grid,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Divider,
  Tooltip
} from '@material-ui/core';
import {
  Edit,
  VisibilityOff,
  Visibility,
  Delete
} from '@material-ui/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';

const useStyles = makeStyles((theme) => ({
  content: {
    height: "500px",
    padding: "0px",
    overflowY: "scroll"
  },
  navList: {
    height: "100%"
  },
  usernameGrid: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    minHeight: "52px",
    paddingBottom: theme.spacing(1)
  },
  passwordGrid: {
    paddingLeft: theme.spacing(2),
    minHeight: "52px"
  },
  errorGrid: {
    paddingLeft: theme.spacing(2),
  },
  gridLeft: {
    paddingLeft: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  gridRight: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  padUserInfo: {
    paddingRight: theme.spacing(1)
  },
  helperPadding: {
    paddingBottom: "8px"
  },
  formControl: {
    minWidth: "270px"
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  }
}));

const validationSchema = yup.object({
  password: yup
    .string()
    .ensure()
    .min(8, "Password must be at least 8 Characters")
    .required("Password is required")
    .matches(/(^[a-zA-Z0-9!?;:@#$&()\\-`.+,/"]*$)/, 'Password may only contain letters, numbers, and special characters: !?;:@#$&()-`.+,'),
  passwordAgain: yup
    .string()
    .ensure()
    .required("Please confirm your password")
    .oneOf([yup.ref('password'), null], "Passwords do not match"),
  email: yup
    .string()
    .ensure()
    .required("Email is required")
    .email("Enter a valid email address")
});

interface props {
  menuItem: string | null;
  setMenuItem: Function;
}

export default function MenuDialog(props: props) {
  const classes = useStyles();
  const menuItem = props.menuItem;
  const setMenuItem = props.setMenuItem;
  const openDialog = Boolean(menuItem);
  const [editPassword, setEditPassword] = useState(false);
  const [passwordVis, setPasswordVis] = useState(false);
  const [passwordAgainVis, setPasswordAgainVis] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  // TODO: put in starting user values from redux in the future
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordAgain: "",
      email: ""
    },
    validationSchema: validationSchema,
    // We don't use this submit, but it has to be here to use the useFormik hook
    onSubmit: values => {
      console.log("Edit Profile Formik onSubmit");
    },
  });

  let dirtyPasswords = ((formik.touched.password && formik.touched.passwordAgain) && (Boolean(formik.errors.password) || Boolean(formik.errors.passwordAgain))) || (!formik.touched.password || !formik.touched.passwordAgain);
  let dirtyEmail = (formik.touched.email && Boolean(formik.errors.email)) || !formik.touched.email;
  let disableSave;
  if (editPassword && editEmail) {
    disableSave = dirtyPasswords || dirtyEmail;
  } else if (editEmail) {
    disableSave = dirtyEmail;
  } else if (editPassword) {
    disableSave = dirtyPasswords;
  } else {
    disableSave = true;
  }

  const closeDialog = () => {
    setMenuItem("");
    formik.resetForm();
    setEditPassword(false);
    setPasswordVis(false);
    setPasswordAgainVis(false);
    setEditEmail(false);
    // Also set the values back to whatever the user values are.
  }
  const handleEditPassword = () => {
    setEditPassword(true);
  }
  const handleEditEmail = () => {
    setEditEmail(true);
  }
  const handlePasswordVisiblity = () => {
    setPasswordVis(!passwordVis);
  }
  const handlePasswordAgainVisiblity = () => {
    setPasswordAgainVis(!passwordAgainVis);
  }
  const handleDeleteLocation = () => {
    console.log("Location deleted");
    // TODO: API call to remove the default location from the user
  }
  const saveInfo = () => {
    // TODO: API call to update user info
    // Probably need to check and make sure some things aren't empty. don't want to update with empty values
    // have some loading sign then update this dialog with the new user data
    console.log(formik.values);
  }

  // TODO: when redux is implemented, put User info in the initial values!
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={openDialog}>
      <DialogTitle>User Profile</DialogTitle>
      <Divider className={classes.divider}/>
      <DialogContent className={classes.content}>
        <Grid container className={classes.usernameGrid}>
          <Grid item xs={4} className={classes.gridLeft}>
            <Typography variant="subtitle1" align="left">Username:</Typography>
          </Grid>
          <Grid item xs={8} className={classes.gridRight}>
            <Typography variant="subtitle1" align="left">Username</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.passwordGrid}>
          <Grid item xs={4} className={classes.gridLeft}>
            <Typography variant="subtitle1" align="left">Password:</Typography>
          </Grid>
          <Grid item xs={8} className={classes.gridRight}>
            {/* I know this unicode stuff sucks, just don't worry about it now */}
            { !editPassword &&
              <Typography className={classes.padUserInfo}>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</Typography>
            }
            { editPassword &&
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <OutlinedInput
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    type={passwordVis ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="New Password"
                    margin="dense"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordVisiblity}
                          edge="end"
                        >
                          {passwordVis ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            }
            { !editPassword &&
              <Tooltip title="Edit Password" placement="right">
                <IconButton aria-label="Edit Password" onClick={handleEditPassword}>
                  <Edit/>
                </IconButton>
              </Tooltip>
            }
          </Grid>
        </Grid>
        { editPassword &&
          <Grid container className={classes.passwordGrid}>
            <Grid item xs={4} className={classes.gridLeft}>
              <Typography variant="subtitle1" align="left"></Typography>
            </Grid>
            <Grid item xs={8} className={classes.gridRight}>
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <OutlinedInput
                    value={formik.values.passwordAgain}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.passwordAgain && Boolean(formik.errors.passwordAgain)}
                    type={passwordAgainVis ? "text" : "password"}
                    id="passwordAgain"
                    name="passwordAgain"
                    placeholder="Re-enter Password"
                    margin="dense"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordAgainVisiblity}
                          edge="end"
                        >
                          {passwordAgainVis ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </Grid>
          </Grid>
        }
        { editPassword && formik.touched.password && formik.errors.password &&
          <Grid container className={classes.errorGrid}>
            <Grid item xs={4} className={classes.gridLeft}>
              <Typography variant="subtitle1" align="left"></Typography>
            </Grid>
            <Grid item xs={8} className={classes.gridRight}>
              <Typography variant="caption" align="left" color="error">{ formik.errors.password }</Typography>
            </Grid>
          </Grid>
        }
        { editPassword && formik.touched.passwordAgain && formik.errors.passwordAgain &&
          <Grid container className={classes.errorGrid}>
            <Grid item xs={4} className={classes.gridLeft}>
              <Typography variant="subtitle1" align="left"></Typography>
            </Grid>
            <Grid item xs={8} className={classes.gridRight}>
              <Typography variant="caption" align="left" color="error">{ formik.errors.passwordAgain }</Typography>
            </Grid>
          </Grid>
        }
        <Grid container className={classes.passwordGrid}>
          <Grid item xs={4} className={classes.gridLeft}>
            <Typography variant="subtitle1" align="left">Email:</Typography>
          </Grid>
          <Grid item xs={8} className={classes.gridRight}>
            { !editEmail &&
              <Typography className={classes.padUserInfo}>email@email.com</Typography>
            }
            { editEmail &&
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <OutlinedInput
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    id="email"
                    name="email"
                    placeholder="New Email"
                    margin="dense"
                  />
                </FormControl>
              </div>
            }
            { !editEmail &&
              <Tooltip title="Edit Email" placement="right">
                <IconButton aria-label="Edit Email" onClick={handleEditEmail}>
                  <Edit/>
                </IconButton>
              </Tooltip>
            }
          </Grid>
        </Grid>
        { editEmail && formik.touched.email && formik.errors.email &&
          <Grid container className={classes.errorGrid}>
            <Grid item xs={4} className={classes.gridLeft}>
              <Typography variant="subtitle1" align="left"></Typography>
            </Grid>
            <Grid item xs={8} className={classes.gridRight}>
              <Typography variant="caption" align="left" color="error">{ formik.errors.email }</Typography>
            </Grid>
          </Grid>
        }
        <Grid container className={classes.passwordGrid}>
          <Grid item xs={4} className={classes.gridLeft}>
            <Typography variant="subtitle1" align="left">Default Location:</Typography>
          </Grid>
          <Grid item xs={8} className={classes.gridRight}>
            {/* conditionally show button/coords if there are coords saved, else show "No coords saved" */}
            {
              <Typography className={classes.padUserInfo}>Lat/Long Coords</Typography>
            }
            {
              <Tooltip title="Delete Location" placement="right">
                <IconButton aria-label="Edit Email" onClick={handleDeleteLocation}>
                  <Delete/>
                </IconButton>
              </Tooltip>
            }
          </Grid>
        </Grid>
      </DialogContent>
      <Divider className={classes.divider}/>
      <DialogActions>
        <Button variant="outlined" onClick={saveInfo} color="primary" disabled={disableSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={closeDialog} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}