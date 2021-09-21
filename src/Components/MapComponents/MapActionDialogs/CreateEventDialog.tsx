import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Tooltip,
  Divider
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AccessTime from '@material-ui/icons/AccessTime'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { event } from '../../../types';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '95%', // Fix IE 11 issue.
    marginLeft: '16px'
  },
  content: {
    height: "500px",
    padding: "0px",
    overflowY: "scroll"
  },
  divider: {
    marginRight: "8px",
  },
  textFields: {
    marginTop: "16px",
  },
  pickerParent: {
    display: "flex",
    justifyContent: "space-between"
  },
  picker: {
    width: "47%",
  }
}));

const validationSchema = yup.object({
  name: yup
    .string()
    .ensure()
    .required("Name is required")
    .matches(/(^[a-zA-Z0-9 :;!?#()-/]+$)/, 'Password may only contain letters, numbers, and these special characters: :;!?#()-/'),
  description: yup
    .string()
    .ensure()
    .required("Description is required")
    .matches(/(^[a-zA-Z0-9 :;!?#()-/]+$)/, 'Password may only contain letters, numbers, and these special characters: :;!?#()-/'),
  date: yup
    .string()
    .required("Event Date is required"),
  time: yup
    .string()
    .required("Event Time is required")
});

interface props {
  open: boolean,
  setOpen: Function
}

export default function CreateEventDialog(props: props) {
  const classes = useStyles();
  const [disableCreate, setDisableCreate] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      date: null,
      time: null,
      locationName: '',
      location: [],
      category: '',
      ageLimit: '',
      drinking: false,
      smoking: false
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log("In formik submit with values: " + JSON.stringify(values));
    },
  });

  const handleChange = () => {
    console.log(`Dirty: ${formik.dirty}`);
    console.log(`Valid: ${formik.isValid}`);
    console.log(`Set Disable: ${!(formik.dirty && formik.isValid)}`);
    console.log(formik.errors);
    setDisableCreate(!(formik.dirty && formik.isValid));
  }
  const handlePickerChange = (attr: string, value: MaterialUiPickersDate) => {
    formik.setFieldValue(attr, value);
  }

  // TODO: disable or create some kind of validation for dates/times that are before the current date/time
  // TODO: Figure out how to force formik validation when pickers are changed
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} fullWidth={true} maxWidth="sm" scroll="paper">
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit} onChange={handleChange}>
        <DialogTitle>Create Event</DialogTitle>
        <Divider className={classes.divider}/>
        <DialogContent className={classes.content}>
            <TextField
              className={classes.textFields}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name ? formik.errors.name : "Enter an Event Name"}
              variant="outlined"
              required
              fullWidth
              id="eventName"
              label="Event Name"
              name="name"
            />
            <TextField
              className={classes.textFields}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description ? formik.errors.description : "Enter a detailed description of the event"}
              variant="outlined"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.pickerParent}>
                <KeyboardDatePicker
                  className={classes.picker}
                  margin="normal"
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  label="Event Date"
                  format="MM/dd/yyyy"
                  onBlur={formik.handleBlur}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date ? formik.errors.date : "Pick a Date"}
                  value={formik.values.date}
                  onChange={value => handlePickerChange("date", value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker
                  className={classes.picker}
                  margin="normal"
                  inputVariant="outlined"
                  id="time-picker"
                  label="Event Time"
                  onBlur={formik.handleBlur}
                  error={formik.touched.time && Boolean(formik.errors.time)}
                  helperText={formik.touched.time && formik.errors.time ? formik.errors.time : "Pick a Time"}
                  value={formik.values.time}
                  onChange={value => handlePickerChange("time", value)}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<AccessTime/>}
                />
              </div>
            </MuiPickersUtilsProvider>
        </DialogContent>
        <Divider className={classes.divider}/>
        <DialogActions>
          <Button type="submit" variant="outlined" color="primary" disabled={disableCreate}>
            Create
          </Button>
          <Button variant="outlined" onClick={() => props.setOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}